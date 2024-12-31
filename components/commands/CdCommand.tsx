import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import type { fileStructureType } from "@/types/fileStructureType";

interface CdCommandProps {
  targetPath?: string;
}

const CdCommand: React.FC<CdCommandProps> = ({ targetPath }) => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();

  console.log("files", files);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeCdCommand = (targetPath?: string) => {
      if (!targetPath) return { path: "~", error: "" };

      // Handle special cases
      if (targetPath === ".." || targetPath === "../") {
        if (currentPath === "~") return { path: "~", error: "" };
        const pathParts = currentPath.split("/");
        pathParts.pop();
        return { path: pathParts.join("/"), error: "" };
      }

      if (targetPath === "~" || targetPath === "/") {
        return { path: "~", error: "" };
      }

      // Find current directory in the file system
      const currentDirectory: fileStructureType | undefined =
        currentPath === "~"
          ? files.find((file) => file.id === "home")
          : files.find((file) => file.id === currentPath.split("/").pop());

      if (!currentDirectory) {
        return { path: currentPath, error: "cd: current directory not found" };
      }

      // Check if target exists in current directory
      const targetExists = currentDirectory.childrenId?.find(
        (child) => child.id === targetPath
      );

      if (!targetExists) {
        return {
          path: currentPath,
          error: `cd: no such file or directory: ${targetPath}`,
        };
      }

      // Find target in file system to check its type
      const targetDir = files.find((file) => file.id === targetPath);
      if (!targetDir) {
        return {
          path: currentPath,
          error: `cd: no such file or directory: ${targetPath}`,
        };
      }

      if (targetDir.type === "directory") {
        return { path: `${currentPath}/${targetPath}`, error: "" };
      } else {
        return {
          path: currentPath,
          error: `cd: not a directory: ${targetPath}`,
        };
      }
    };

    const { path, error } = executeCdCommand(targetPath);
    if (path !== currentPath) {
      setCurrentPath(path);
    }
    if (error) {
      setOutput(error);
    }
  }, [targetPath, currentPath, setCurrentPath, files]); // Added proper dependencies

  return output ? <div className="text-red">{output}</div> : null;
};

export default CdCommand;
