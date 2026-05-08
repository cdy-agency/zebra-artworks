import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/resources
export async function GET() {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ resources: data });
}

// POST /api/resources
export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, file_url, file_name, file_size } = body;

  if (!file_url || !file_name) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("resources")
    .insert([{
      title: title || null,
      description: description || null,
      file_url,
      file_name,
      file_size: file_size || null,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ resource: data }, { status: 201 });
}