import { useEffect } from "react";
import type { fileStructureType } from "@/data/fileStructure";
import { fileStructure } from "@/data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";

interface CdCommandProps {
  args?: string;
}

const CdCommand: React.FC<CdCommandProps> = ({ args }) => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);

  useEffect(() => {
    const executeCdCommand = (targetPath?: string) => {
      if (!targetPath) return "~";
      if (targetPath === ".." || targetPath === "../") {
        if (currentPath === "~") return "~";
        const pathParts = currentPath.split("/");
        pathParts.pop();
        return pathParts.join("/");
      }

      if (targetPath === "~" || targetPath === "/") {
        return "~";
      }

      const currentDirectory: fileStructureType =
        currentPath === "~"
          ? fileStructure.find((file) => file.id === "home")!
          : fileStructure.find(
              (file) => file.id === currentPath.split("/").pop()
            )!;

      const targetExists = currentDirectory?.childrenId?.find(
        (child) => child.id === targetPath
      );

      if (targetExists) {
        return `${currentPath}/${targetPath}`;
      }

      return currentPath;
    };

    const nextPath = executeCdCommand(args);
    if (nextPath !== currentPath) {
      setCurrentPath(nextPath);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default CdCommand;
