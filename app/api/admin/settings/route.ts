import { NextRequest, NextResponse } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(request);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("fullName" in body) ||
      typeof body.fullName !== "string"
    ) {
      return NextResponse.json({ error: "A valid full name is required." }, { status: 400 });
    }

    const fullName = body.fullName.trim();
    if (fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json(
        { error: "Full name must be between 2 and 100 characters." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id)
      .select("full_name")
      .single();

    if (error) {
      console.error("PATCH /api/admin/settings failed", error);
      return NextResponse.json(
        { error: "Unable to update your profile." },
        { status: 500 },
      );
    }

    return NextResponse.json({ fullName: data.full_name });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/settings failed", error);
    return NextResponse.json(
      { error: "Unable to update your profile." },
      { status: 500 },
    );
  }
}
