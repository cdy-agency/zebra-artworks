import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { TESTIMONIAL_CATEGORIES } from "@/types/testimonial";
import type { TestimonialCategory } from "@/types/testimonial";

function isValidCategory(c: string): c is TestimonialCategory {
  return (TESTIMONIAL_CATEGORIES as readonly string[]).includes(c);
}

/** Clear other featured flags in the same category (at most one featured per category). */
async function clearOtherFeaturedInCategory(
  category: TestimonialCategory,
  exceptId: string | null,
) {
  let q = supabaseAdmin
    .from("testimonials")
    .update({ featured: false })
    .eq("category", category);
  if (exceptId) {
    q = q.neq("id", exceptId);
  }
  await q;
}

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category");

    let query = supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (category) {
      if (!isValidCategory(category)) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 },
        );
      }
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to load testimonials";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
      await clearOtherFeaturedInCategory(category, null);
    }

    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .insert({
        quote,
        name,
        role,
        location,
        category,
        featured: Boolean(featured),
        initials: String(initials).slice(0, 8),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
