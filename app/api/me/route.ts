import { NextRequest, NextResponse } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.fullName,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "User lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
