import { NextResponse } from "next/server";
import { getProfileByUserId } from "@/lib/profiles";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_TTL_SECONDS,
} from "@/lib/auth/token";
import { createAuthToken } from "@/lib/auth/token.server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const profile = await getProfileByUserId(data.user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const token = await createAuthToken({
      sub: profile.id,
      email: profile.email,
      role: profile.role,
    });

    const response = NextResponse.json({
      success: true,
      role: profile.role,
      redirect: profile.role === "admin" ? "/admin" : "/",
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTH_TOKEN_TTL_SECONDS,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("POST /api/login failed", error);

    return NextResponse.json(
      { error: "Unable to complete login" },
      { status: 500 }
    );
  }
}
