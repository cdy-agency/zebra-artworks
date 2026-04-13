// FILE: src/lib/cloudinary.ts

// Client-side: used in frontend to upload via our own API route
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Upload failed");
  }

  const data = await res.json();
  return data.url as string;
}