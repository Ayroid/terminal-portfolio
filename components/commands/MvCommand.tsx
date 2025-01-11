"use client";

import { useFileSystem } from "@/store/fileSystemStore";
import { useCurrentPath } from "@/store/currentPathStore";

interface MvCommandProps {
  source?: string;
  destination?: string;
}

const MvCommand = ({ source, destination }: MvCommandProps) => {
  const { files, removeFile, addFile } = useFileSystem();
  const { currentPath } = useCurrentPath((state) => state);

  const executeMvCommand = () => {
    if (!source) {
      return { output: "mv: missing file operand", result: "error" };
    }

    if (!destination) {
      return {
        output: `mv: missing destination file operand after '${source}'`,
        result: "error",
      };
    }

    const basePath = currentPath === "~" ? "~" : currentPath;
    const sourcePath = `${basePath}/${source}`;
    const sourceFile = files.find((file) => file.path === sourcePath);

    if (!sourceFile) {
      return {
        output: `mv: cannot stat '${source}': No such file or directory`,
        result: "error",
      };
    }

    // Check if destination already exists
    const destPath = `${basePath}/${destination}`;
    const existingDest = files.find((file) => file.path === destPath);

    if (existingDest) {
      return {
        output: `mv: '${destination}' already exists`,
        result: "error",
      };
    }

    // Remove old file and add with new name/path
    removeFile(sourceFile.id);
    addFile({
      ...sourceFile,
      id: Date.now().toString(),
      name: destination,
      path: destPath,
    });

    return { output: "", result: "success" };
  };

  const { output, result } = executeMvCommand();

  if (result === "error") {
    return <div className="text-red font-hack">{output}</div>;
  }

  return null;
};

export default MvCommand;
