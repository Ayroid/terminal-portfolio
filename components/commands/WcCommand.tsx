"use client";

import { useCurrentPath } from "@/store/currentPathStore";
import { FileSystemType } from "@/types/fileSystemType";
import { useState, useEffect } from "react";

interface WcCommandProps {
  args: string[];
}

const WcCommand = ({ args }: WcCommandProps) => {
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

  const executeWcCommand = () => {
    const showLines = args.includes("-l");
    const showWords = args.includes("-w");
    const showChars = args.includes("-c") || args.includes("-m");
    const showAll = !showLines && !showWords && !showChars;

    const targetFile = args.find((arg) => !arg.startsWith("-"));

    if (!targetFile) {
      return { output: "wc: missing file operand", result: "error" };
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
        output: `wc: ${targetFile}: No such file or directory`,
        result: "error",
      };
    }

    if (targetFileNode.type === "directory") {
      return {
        output: `wc: ${targetFile}: Is a directory`,
        result: "error",
      };
    }

    const content = targetFileNode.content || "";
    const lines = content.split("\n").length;
    const words = content.split(/\s+/).filter((w) => w.length > 0).length;
    const chars = content.length;

    let output = "";
    if (showAll) {
      output = `  ${lines}  ${words} ${chars} ${targetFile}`;
    } else {
      const parts = [];
      if (showLines) parts.push(lines);
      if (showWords) parts.push(words);
      if (showChars) parts.push(chars);
      output = `  ${parts.join("  ")} ${targetFile}`;
    }

    return { output, result: "success" };
  };

  const { output, result } = executeWcCommand();

  if (result === "loading") return null;
  if (result === "error") {
    return <div className="text-red font-hack">{output}</div>;
  }

  return <div className="text-foreground font-hack">{output}</div>;
};

export default WcCommand;
