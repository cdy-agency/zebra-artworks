import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id, title, description, images")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data ?? [])
    .flatMap((project) => {
      const images = Array.isArray(project.images) ? project.images : [];

      return images
        .filter((src): src is string => typeof src === "string" && src.trim().length > 0)
        .map((src, index) => ({
          id: `${project.id}-${index}`,
          projectId: project.id,
          src,
          title: project.title,
          description: project.description ?? "",
        }));
    })
    .slice(0, 4);

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  void req;
  return NextResponse.json(
    { error: "Gallery images are managed from project uploads only." },
    { status: 405 }
  );
}
