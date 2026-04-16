import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_CLOUD_NAME;

    const apiKey = process.env.NEXT_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_CLOUDINARY_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary env missing" },
        { status: 500 }
      );
    }

    // convert file
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const timestamp = Math.floor(Date.now() / 1000);

    const crypto = await import("crypto");

    const signature = crypto
      .createHash("sha1")
      .update(`folder=projects&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const form = new FormData();
    form.append("file", dataUri);
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);
    form.append("folder", "projects");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: result?.error?.message || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}