import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET all messages
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to load messages";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH — mark a message as read by id
export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    const { error } = await supabaseAdmin
      .from("messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to update message";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
