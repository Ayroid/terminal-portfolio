import mongoose from "mongoose";
import FileSystem from "@/app/models/FileSystem";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { fileStructure } from "@/data/fileStructure";
import { FileSystemType } from "@/types/fileSystemType";

async function createFileSystemNode(
  file: FileSystemType,
  ownerId: string,
  parentPath: string = ""
): Promise<mongoose.Document> {
  const path =
    file.name === "~"
      ? file.name
      : parentPath
      ? `${parentPath}/${file.name}`
      : `/${file.name}`;

  const nodeData = {
    ...file,
    path,
    owner: ownerId,
  };

  try {
    return await FileSystem.create(nodeData);
  } catch (error) {
    console.error(`Error creating file system node ${file.id}:`, error);
    throw error;
  }
}

async function initializeFileSystem(
  files: FileSystemType[],
  ownerId: string
): Promise<mongoose.Document[]> {
  const createdNodes: mongoose.Document[] = [];
  const nodeMap = new Map<string, string>(); // Map of id to path

  // First pass: Create all directories
  for (const file of files) {
    if (file.type === "directory") {
      const parentPath = file.parentId ? nodeMap.get(file.parentId) || "" : "";
      const node = await createFileSystemNode(file, ownerId, parentPath);
      nodeMap.set(file.id, node.get("path"));
      createdNodes.push(node);
    }
  }

  // Second pass: Create all files
  for (const file of files) {
    if (file.type === "file") {
      const parentPath = nodeMap.get(file.parentId) || "";
      const node = await createFileSystemNode(file, ownerId, parentPath);
      createdNodes.push(node);
    }
  }

  return createdNodes;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let userFiles = await FileSystem.find({ owner: session.user.id })
      .populate("children")
      .sort("path");

    if (userFiles.length === 0) {
      try {
        userFiles = await initializeFileSystem(fileStructure, session.user.id);
      } catch (error) {
        await FileSystem.deleteMany({ owner: session.user.id });
        throw error;
      }
    }

    return NextResponse.json(userFiles, { status: 200 });
  } catch (error) {
    console.error("Error initializing filesystem:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userFiles = await FileSystem.find({ owner: session.user.id })
      .populate("children")
      .sort("path");

    return NextResponse.json(userFiles, { status: 200 });
  } catch (error) {
    console.error("Error fetching filesystem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
