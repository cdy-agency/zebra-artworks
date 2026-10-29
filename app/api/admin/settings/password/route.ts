import { NextRequest, NextResponse } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth/session";
import {
  getSupabaseServerClient,
  getSupabaseServiceRoleClient,
} from "@/lib/supabase-server";

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
      !("currentPassword" in body) ||
      typeof body.currentPassword !== "string" ||
      !("newPassword" in body) ||
      typeof body.newPassword !== "string"
    ) {
      return NextResponse.json(
        { error: "Your current password and a new password are required." },
        { status: 400 },
      );
    }

    if (body.newPassword.length < 8 || body.newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must be between 8 and 128 characters." },
        { status: 400 },
      );
    }

    const { error: verificationError } = await getSupabaseServerClient().auth.signInWithPassword({
      email: user.email,
      password: body.currentPassword,
    });

    if (verificationError) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 },
      );
    }

    const { error: updateError } = await getSupabaseServiceRoleClient().auth.admin.updateUserById(
      user.id,
      { password: body.newPassword },
    );

    if (updateError) {
      console.error("POST /api/admin/settings/password failed", updateError);
      return NextResponse.json(
        { error: "Unable to change your password." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("POST /api/admin/settings/password failed", error);
    return NextResponse.json(
      { error: "Unable to change your password." },
      { status: 500 },
    );
  }
}
