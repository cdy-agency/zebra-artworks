// 📁 src/app/api/gallery/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// DELETE - remove a gallery item + its storage object
export async function DELETE(req: NextRequest, context: any) {
  const { id } = await context.params; // 👈 FIXED: await params

  // 1. Get image URL first
  const { data: row, error: fetchErr } = await supabaseAdmin
    .from("gallery")
    .select("src")
    .eq("id", id)
    .single();

  if (fetchErr) {
    return NextResponse.json(
      { error: fetchErr.message },
      { status: 500 }
    );
  }

  // 2. Delete file from Supabase storage (best effort)
  if (row?.src) {
    try {
      const url = new URL(row.src);
      const pathParts = url.pathname.split("/gallery/");

      if (pathParts.length === 2) {
        await supabaseAdmin.storage
          .from("gallery")
          .remove([pathParts[1]]);
      }
    } catch (err) {
      console.log("Storage delete error:", err);
    }
  }

  // 3. Delete DB row
  const { error } = await supabaseAdmin
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// PATCH - update title and description
export async function PATCH(req: NextRequest, context: any) {
  const { id } = await context.params; // 👈 FIXED: await params

  const body = await req.json();
  const { title, description } = body;

  const { data, error } = await supabaseAdmin
    .from("gallery")
    .update({
      title,
      description,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ...data,
    desc: data.description,
  });
}