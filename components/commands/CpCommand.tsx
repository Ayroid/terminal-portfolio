"use client";

import { useFileSystem } from "@/store/fileSystemStore";
import { useCurrentPath } from "@/store/currentPathStore";
import { FileSystemType } from "@/types/fileSystemType";

interface CpCommandProps {
  source?: string;
  destination?: string;
}

const CpCommand = ({ source, destination }: CpCommandProps) => {
  const { files, addFile } = useFileSystem();
  const { currentPath } = useCurrentPath((state) => state);

  const executeCpCommand = () => {
    if (!source) {
      return { output: "cp: missing file operand", result: "error" };
    }

    if (!destination) {
      return {
        output: `cp: missing destination file operand after '${source}'`,
        result: "error",
      };
    }

    const basePath = currentPath === "~" ? "~" : currentPath;
    const sourcePath = `${basePath}/${source}`;
    const sourceFile = files.find((file) => file.path === sourcePath);

    if (!sourceFile) {
      return {
        output: `cp: cannot stat '${source}': No such file or directory`,
        result: "error",
      };
    }

    if (sourceFile.type === "directory") {
      return {
        output: `cp: -r not specified; omitting directory '${source}'`,
        result: "error",
      };
    }

    // Check if destination already exists
    const destPath = `${basePath}/${destination}`;
    const existingDest = files.find((file) => file.path === destPath);

    if (existingDest) {
      return {
        output: `cp: '${destination}' already exists`,
        result: "error",
      };
    }

    // Create the copy
    const newFile: FileSystemType = {
      id: Date.now().toString(),
      name: destination,
      type: "file",
      path: destPath,
      parentId: sourceFile.parentId,
      content: sourceFile.content,
    };

    addFile(newFile);
    return { output: "", result: "success" };
  };

  const { output, result } = executeCpCommand();

  if (result === "error") {
    return <div className="text-red font-hack">{output}</div>;
  }

  return null;
};

export default CpCommand;
