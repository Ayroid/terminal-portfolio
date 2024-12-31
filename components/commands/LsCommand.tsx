import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import type { FileSystemType } from "@/types/fileSystemType";
import React from "react";

const LSCommand: React.FC = () => {
  const { files } = useFileSystem();
  const { currentPath } = useCurrentPath((state) => state);

  const executeLsCommand = (): FileSystemType[] => {
    return files.filter((file) => {
      const parentPath = file.path.substring(0, file.path.lastIndexOf("/"));
      return parentPath === currentPath;
    });
  };

  const commandResult = executeLsCommand();

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {commandResult.map((result) => (
        <p
          key={result.id}
          className={
            result.type === "directory" ? "text-blue-500" : "text-white"
          }
        >
          {result.name}
        </p>
      ))}
    </div>
  );
};

export default LSCommand;
