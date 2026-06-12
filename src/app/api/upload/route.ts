import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "image" or "file"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine target directory inside public/uploads/
    const subFolder = type === "image" ? "images" : "files";
    const uploadDir = path.join(process.cwd(), "public", "uploads", subFolder);

    // Create directories if they do not exist
    await mkdir(uploadDir, { recursive: true });

    // Clean file name to prevent traversal issues and naming conflicts
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, filename);

    // Write file to filesystem
    await writeFile(filePath, buffer);

    // Generate public URL path
    const fileUrl = `/uploads/${subFolder}/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
