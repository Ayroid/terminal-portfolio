import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FileSystem from "@/app/models/FileSystem";
import { connectDB } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get id from searchParams instead of query
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "File/Directory ID is required" },
        { status: 400 }
      );
    }

    // Find the item to delete
    const item = await FileSystem.findOne({ id, owner: session.user.id });
    if (!item) {
      return NextResponse.json(
        { error: "File/Directory not found" },
        { status: 404 }
      );
    }

    // If it's a directory, recursively delete all children
    if (item.type === "directory") {
      await deleteRecursive(item.id, session.user.id);
    }

    // Remove item from parent's childrenId array
    if (item.parentId) {
      await FileSystem.updateOne(
        { id: item.parentId },
        { $pull: { childrenId: { id: item.id } } }
      );
    }

    // Delete the item itself
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

// Helper function to recursively delete directories
async function deleteRecursive(parentId: string, ownerId: string) {
  const children = await FileSystem.find({ parentId, owner: ownerId });

  for (const child of children) {
    if (child.type === "directory") {
      await deleteRecursive(child.id, ownerId);
    }
    await FileSystem.deleteOne({ id: child.id });
  }
}
