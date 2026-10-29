import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      typeof body.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
    ) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const { error } = await getSupabaseServerClient().auth.resetPasswordForEmail(
      body.email.trim(),
    );

    if (error) {
      console.error("POST /api/forgot-password failed", error);
      return NextResponse.json(
        { error: "Unable to send a reset code right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists for that email, a password reset code has been sent.",
    });
  } catch (error: unknown) {
    console.error("POST /api/forgot-password failed", error);
    return NextResponse.json(
      { error: "Unable to send a reset code right now. Please try again later." },
      { status: 500 },
    );
  }
}
