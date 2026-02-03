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

    const { name, parentId, path } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "Directory name is required" },
        { status: 400 }
      );
    }

    if (parentId) {
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
    }

    const id = `${name}-${Date.now()}`;

    const newDirectory = await FileSystem.create({
      id,
      name,
      type: "directory",
      path: path,
      parentId: parentId || "",
      childrenId: [],
      owner: session.user.id,
    });

    if (parentId) {
      await FileSystem.updateOne(
        { id: parentId },
        { $push: { childrenId: { id, type: "directory" } } }
      );
    }

    return NextResponse.json(newDirectory, { status: 201 });
  } catch (error) {
    console.error("Error creating directory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
