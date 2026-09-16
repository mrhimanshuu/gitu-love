import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/adminSupabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const surpriseId = formData.get("surpriseId");

    if (!(file instanceof File) || typeof surpriseId !== "string") {
      return NextResponse.json(
        { error: "Invalid upload request." },
        { status: 400 }
      );
    }

    if (!surpriseId || surpriseId.length > 100) {
      return NextResponse.json(
        { error: "Invalid surprise ID." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WEBP images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be smaller than 5 MB." },
        { status: 400 }
      );
    }

    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 100);

    const filePath = `${surpriseId}/${crypto.randomUUID()}-${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await adminSupabase.storage
      .from("photos")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Photo upload error:", uploadError);

      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      path: filePath,
    });
  } catch (error) {
    console.error("Upload API error:", error);

    return NextResponse.json(
      { error: "Upload server error. Check the terminal." },
      { status: 500 }
    );
  }
}