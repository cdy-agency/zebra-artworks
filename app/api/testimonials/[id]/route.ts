import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { TESTIMONIAL_CATEGORIES } from "@/types/testimonial";
import type { TestimonialCategory } from "@/types/testimonial";

function isValidCategory(c: string): c is TestimonialCategory {
  return (TESTIMONIAL_CATEGORIES as readonly string[]).includes(c);
}

async function clearOtherFeaturedInCategory(
  category: TestimonialCategory,
  exceptId: string,
) {
  await supabaseAdmin
    .from("testimonials")
    .update({ featured: false })
    .eq("category", category)
    .neq("id", exceptId);
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const {
      quote,
      name,
      role = "",
      location = "",
      category,
      featured = false,
      initials = "",
    } = body;

    if (!quote || !name || !category) {
      return NextResponse.json(
        { error: "Quote, name, and category are required" },
        { status: 400 },
      );
    }

    if (!isValidCategory(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    if (featured) {
      await clearOtherFeaturedInCategory(category, id);
    }

    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .update({
        quote,
        name,
        role,
        location,
        category,
        featured: Boolean(featured),
        initials: String(initials).slice(0, 8),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
