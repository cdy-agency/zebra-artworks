import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// PUT /api/partners/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { logo, name, link } = body;

  if (!logo) {
    return NextResponse.json({ error: "Logo is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("partners")
    .update({ logo, name: name || null, link: link || null })
    .eq("id", id)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partner: data });
}

// DELETE /api/partners/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
