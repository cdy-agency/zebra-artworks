// FILE: src/app/api/dashboard/route.ts

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from("projects")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching project count:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projectCount: count ?? 0 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Dashboard API error";
    console.error("Dashboard API exception:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
