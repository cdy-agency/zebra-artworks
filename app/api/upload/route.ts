// FILE: src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Support both env var names
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_CLOUD_NAME;
    const apiKey = process.env.NEXT_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_CLOUDINARY_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary env vars:", {
        cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret,
      });
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Signed upload — no preset needed
    const timestamp = Math.round(Date.now() / 1000);

    const crypto = await import("crypto");
    const signatureString = `folder=projects&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", dataUri);
    cloudinaryForm.append("timestamp", String(timestamp));
    cloudinaryForm.append("api_key", apiKey);
    cloudinaryForm.append("signature", signature);
    cloudinaryForm.append("folder", "projects");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    const result = await uploadRes.json();

    if (!uploadRes.ok) {
      console.error("Cloudinary error:", result);
      return NextResponse.json(
        { error: result?.error?.message ?? "Cloudinary upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error("Upload exception:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}