import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FileSystem from "@/app/models/FileSystem";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { name, parentId, content = "" } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }

    // Check if parent directory exists
    const parentDir = await FileSystem.findOne({
      id: parentId,
      type: "directory",
    });
    if (!parentDir) {
      return NextResponse.json(
        { error: "Parent directory not found" },
        { status: 404 }
      );
    }

    // Generate unique ID
    const id = `${name}-${Date.now()}`;

    // Create new file
    const newFile = await FileSystem.create({
      id,
      name,
      type: "file",
      parentId,
      childrenId: [],
      content,
      owner: session.user.id,
    });

    // Update parent's childrenId array
    await FileSystem.updateOne(
      { id: parentId },
      { $push: { childrenId: { id, type: "file" } } }
    );

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
