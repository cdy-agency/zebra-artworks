import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/partners
export async function GET() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partners: data });
}

// POST /api/partners
export async function POST(req: Request) {
  const body = await req.json();
  const { logo, name, link } = body;

  if (!logo) {
    return NextResponse.json({ error: "Logo is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("partners")
    .insert([{ logo, name: name || null, link: link || null }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partner: data }, { status: 201 });
}