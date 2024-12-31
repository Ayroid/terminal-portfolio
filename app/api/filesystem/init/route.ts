// app/api/filesystem/init/route.ts
import FileSystem from "@/app/models/FileSystem";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { fileStructure } from "@/data/fileStructure";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Check if user already has a file structure
    let userFiles = await FileSystem.find({ owner: session.user.id });

    // If user doesn't have any files, initialize with default structure
    if (userFiles.length === 0) {
      const filesWithOwner = fileStructure.map((file) => ({
        ...file,
        owner: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      userFiles = await FileSystem.insertMany(filesWithOwner);
    }

    return NextResponse.json(userFiles, { status: 200 });
  } catch (error) {
    console.error("Error initializing filesystem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// API route to fetch file structure
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userFiles = await FileSystem.find({ owner: session.user.id });
    return NextResponse.json(userFiles, { status: 200 });
  } catch (error) {
    console.error("Error fetching filesystem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
