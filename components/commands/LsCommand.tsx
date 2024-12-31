import { useFileSystem } from "@/store/fileSystemStore";
import type { FileSystemType } from "@/types/fileSystemType";
import React from "react";

interface LSCommandProps {
  commandPath: string;
}

const LSCommand: React.FC<LSCommandProps> = ({ commandPath }) => {
  const { files } = useFileSystem();

  const executeLsCommand = (): FileSystemType[] => {
    return files.filter((file) => {
      const parentPath = file.path.substring(0, file.path.lastIndexOf("/"));
      return parentPath === commandPath;
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
