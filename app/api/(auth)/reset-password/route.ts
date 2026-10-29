import { NextResponse } from "next/server";

import {
  getSupabaseServerClient,
  getSupabaseServiceRoleClient,
} from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      typeof body.email !== "string" ||
      !("otp" in body) ||
      typeof body.otp !== "string" ||
      !("newPassword" in body) ||
      typeof body.newPassword !== "string"
    ) {
      return NextResponse.json(
        { error: "Email, verification code, and new password are required." },
        { status: 400 },
      );
    }

    const email = body.email.trim();
    const otp = body.otp.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!/^\d{6,8}$/.test(otp)) {
      return NextResponse.json({ error: "Enter the valid code from your email." }, { status: 400 });
    }
    if (body.newPassword.length < 8 || body.newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must be between 8 and 128 characters." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServerClient();
    const { data, error: verificationError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "recovery",
    });

    if (verificationError || !data.user) {
      return NextResponse.json(
        { error: "That code is invalid or expired. Request a new code and try again." },
        { status: 400 },
      );
    }

    const { error: updateError } = await getSupabaseServiceRoleClient().auth.admin.updateUserById(
      data.user.id,
      { password: body.newPassword },
    );

    if (updateError) {
      console.error("POST /api/reset-password failed", updateError);
      return NextResponse.json(
        { error: "Unable to reset your password. Please request a new code." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("POST /api/reset-password failed", error);
    return NextResponse.json(
      { error: "Unable to reset your password right now. Please try again later." },
      { status: 500 },
    );
  }
}
