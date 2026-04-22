// 📁 src/app/api/gallery/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void req;
  void params;
  return NextResponse.json(
    { error: "Gallery images are managed from project uploads only." },
    { status: 405 }
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void req;
  void params;
  return NextResponse.json(
    { error: "Gallery images are managed from project uploads only." },
    { status: 405 }
  );
}
