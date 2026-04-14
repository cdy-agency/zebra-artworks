import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ unreadCount: count ?? 0 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}