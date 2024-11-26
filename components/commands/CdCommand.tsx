import { useEffect } from "react";
import type { fileStructureType } from "@/data/fileStructure";
import { fileStructure } from "@/data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";

const CdCommand = () => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);

  useEffect(() => {
    const executeCdCommand = () => {
      const currentDirectory: fileStructureType =
        currentPath === "~"
          ? fileStructure.find((file) => file.id === "home")!
          : fileStructure.find(
              (file) => file.id === currentPath.split("/").pop()
            )!;

      const children = currentDirectory?.childrenId || [];
      return children.length > 0 ? children[0] : null;
    };

    const nextPath =
      executeCdCommand() === null
        ? currentPath
        : currentPath + "/" + executeCdCommand()?.id;

    if (nextPath !== currentPath) {
      setCurrentPath(nextPath);
    }
  }, []);

  return null;
};

export default CdCommand;
