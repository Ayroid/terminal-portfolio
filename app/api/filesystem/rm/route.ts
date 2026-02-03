import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import FileSystem from "@/app/models/FileSystem";
import { connectDB } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();
    const { id } = data;
    const recursive = request.nextUrl.searchParams.get("recursive") === "true";

    const item = await FileSystem.findOne({
      id,
      owner: session.user.id,
    });

    if (!item) {
      return NextResponse.json(
        { error: "File/Directory not found" },
        { status: 404 }
      );
    }

    if (item.type === "directory" && !recursive) {
      return NextResponse.json(
        { error: "Is a directory, use -r flag" },
        { status: 400 }
      );
    }

    if (item.path === "~" || item.path === "~/about") {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    if (recursive) {
      await deleteRecursive(item.id, session.user.id);
    }

    if (item.parentId) {
      await FileSystem.updateOne(
        { id: item.parentId },
        { $pull: { childrenId: item.id } }
      );
    }

    await FileSystem.deleteOne({ id: item.id });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function deleteRecursive(parentId: string, ownerId: string) {
  const children = await FileSystem.find({
    parentId,
    owner: ownerId,
  });

  for (const child of children) {
    if (child.type === "directory") {
      await deleteRecursive(child.id, ownerId);
    }
    await FileSystem.deleteOne({ id: child.id });
  }
}
