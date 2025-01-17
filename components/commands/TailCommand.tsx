"use client";

import { useCurrentPath } from "@/store/currentPathStore";
import { FileSystemType } from "@/types/fileSystemType";
import { useState, useEffect } from "react";

interface TailCommandProps {
  args: string[];
}

const TailCommand = ({ args }: TailCommandProps) => {
  const { currentPath } = useCurrentPath((state) => state);
  const [fileSystem, setFileSystem] = useState<FileSystemType[]>([]);

  useEffect(() => {
    const fetchFileSystem = async () => {
      try {
        const response = await fetch("/api/filesystem/init");
        if (!response.ok) throw new Error("Failed to fetch filesystem");
        const data = await response.json();
        setFileSystem(data);
      } catch (error) {
        console.error("Error fetching filesystem:", error);
      }
    };

    fetchFileSystem();
  }, []);

  const executeTailCommand = () => {
    let lineCount = 10;
    let targetFile = "";

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-n" && args[i + 1]) {
        lineCount = parseInt(args[i + 1], 10);
        i++;
      } else if (!args[i].startsWith("-")) {
        targetFile = args[i];
      }
    }

    if (!targetFile) {
      return { output: "tail: missing file operand", result: "error" };
    }

    if (fileSystem.length === 0) {
      return { output: "", result: "loading" };
    }

    const basePath = currentPath === "~" ? "~" : currentPath;
    const targetFilePath = `${basePath}/${targetFile}`;
    const targetFileNode = fileSystem.find(
      (file) => file.path === targetFilePath
    );

    if (!targetFileNode) {
      return {
        output: `tail: ${targetFile}: No such file or directory`,
        result: "error",
      };
    }

    if (targetFileNode.type === "directory") {
      return {
        output: `tail: ${targetFile}: Is a directory`,
        result: "error",
      };
    }

    const content = targetFileNode.content || "";
    const allLines = content.split("\n");
    const lines = allLines.slice(-lineCount).join("\n");
    return { output: lines, result: "success" };
  };

  const { output, result } = executeTailCommand();

  if (result === "loading") return null;
  if (result === "error") {
    return <div className="text-red font-hack">{output}</div>;
  }

  return <div className="text-foreground font-hack whitespace-pre-wrap">{output}</div>;
};

export default TailCommand;
