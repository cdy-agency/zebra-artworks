import { NextRequest, NextResponse } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(request);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      typeof body.email !== "string" ||
      !("currentPassword" in body) ||
      typeof body.currentPassword !== "string"
    ) {
      return NextResponse.json(
        { error: "A new email and your current password are required." },
        { status: 400 },
      );
    }

    const email = body.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (email === user.email.toLowerCase()) {
      return NextResponse.json(
        { error: "That is already your current email address." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServerClient();
    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: body.currentPassword,
    });
    if (passwordError) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      email,
      email_confirm: true,
    });
    if (updateError) {
      console.error("POST /api/admin/settings/email failed", updateError);
      return NextResponse.json(
        { error: "Unable to update your email address. Please try again." },
        { status: 400 },
      );
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ email })
      .eq("id", user.id);
    if (profileError) {
      console.error("POST /api/admin/settings/email profile sync failed", profileError);
      return NextResponse.json(
        { error: "Your sign-in email changed, but your profile could not be synced. Contact support." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      email,
      message: "Your sign-in email has been updated.",
    });
  } catch (error: unknown) {
    console.error("POST /api/admin/settings/email failed", error);
    return NextResponse.json(
      { error: "Unable to update your email address." },
      { status: 500 },
    );
  }
}
