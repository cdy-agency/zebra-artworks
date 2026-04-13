// FILE: src/app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/projects — fetch all projects
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/projects — create new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, subcategory, client, description, images, status, date } = body;

    if (!title || !category || !subcategory) {
      return NextResponse.json(
        { error: "Title, category and subcategory are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({ title, category, subcategory, client, description, images, status, date })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}