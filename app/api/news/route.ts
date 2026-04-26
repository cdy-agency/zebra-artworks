import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status");
    const tag = req.nextUrl.searchParams.get("tag");

    let query = supabaseAdmin
      .from("news")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (tag) {
      query = query.eq("tag", tag);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to load news";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, tag, excerpt, body: content, date, status, images } = body;

    if (!title || !tag || !excerpt || !content || !date || !status) {
      return NextResponse.json(
        { error: "Title, tag, excerpt, body, date and status are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("news")
      .insert({
        title,
        tag,
        excerpt,
        body: content,
        date,
        status,
        images: Array.isArray(images) ? images : [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
