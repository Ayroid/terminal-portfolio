import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import FileSystem from "@/app/models/FileSystem";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { name, parentId, path, content = "" } = await request.json();

    if (!name || !path) {
      return NextResponse.json(
        { error: "File name and path are required" },
        { status: 400 }
      );
    }

    const parentDir = await FileSystem.findOne({
      id: parentId,
      type: "directory",
      owner: session.user.id,
    });

    if (!parentDir) {
      return NextResponse.json(
        { error: "Parent directory not found" },
        { status: 404 }
      );
    }

    const id = `${name}-${Date.now()}`;

    const newFile = await FileSystem.create({
      id,
      name,
      path,
      type: "file",
      parentId,
      childrenId: [],
      content,
      owner: session.user.id,
    });

    await FileSystem.updateOne({ id: parentId }, { $push: { childrenId: id } });

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
