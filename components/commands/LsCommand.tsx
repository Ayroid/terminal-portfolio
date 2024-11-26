import React from "react";
import type { fileStructureType } from "../../data/fileStructure";
import { fileStructure } from "../../data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";

const LSCommand = () => {
  const { currentPath } = useCurrentPath((state) => state);

  const executeLsCommand = (
    currentPath: string
  ): { id: string; type: string }[] => {
    const currentDirectory: fileStructureType =
      currentPath === "~"
        ? fileStructure.filter((file) => file.id === "home")[0]
        : fileStructure.filter(
            (file) => file.id === currentPath.split("/").pop()
          )[0];

          const children = currentDirectory?.childrenId || [];
    return children;
  };

  const commandResult = executeLsCommand(currentPath);

  return (
    <div className="flex flex-row gap-4">
      {commandResult.map((result: { id: string; type: string }) => (
        <p
          key={result.id}
          className={
            result.type === "directory" ? "text-blue-500" : "text-white"
          }
        >
          {result.id}
        </p>
      ))}
    </div>
  );
};

export default LSCommand;
