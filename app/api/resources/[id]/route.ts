import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// PUT /api/resources/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { title, description, file_url, file_name, file_size } = body;

  if (!file_url || !file_name) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("resources")
    .update({
      title: title || null,
      description: description || null,
      file_url,
      file_name,
      file_size: file_size || null,
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ resource: data });
}

// DELETE /api/resources/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}