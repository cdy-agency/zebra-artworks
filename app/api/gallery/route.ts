import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET ALL IMAGES
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

// SAVE IMAGE TO DATABASE
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { src, title, description } = body;

  if (!src || !title || !description) {
    return NextResponse.json(
      { error: "src, title, description required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("gallery")
    .insert([{ src, title, description }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}