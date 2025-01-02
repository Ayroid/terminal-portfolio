import {
  CommandOutput,
  useCommandLineHistory,
} from "@/store/commandLineHistoryStore";
import { useFileSystem } from "@/store/fileSystemStore";
import type { FileSystemType } from "@/types/fileSystemType";
import React from "react";

interface LSCommandProps {
  commandPath: string;
  commandId: string;
  commandOutput?: CommandOutput;
}

const LSCommand: React.FC<LSCommandProps> = ({
  commandPath,
  commandId,
  commandOutput,
}) => {
  const { files } = useFileSystem();

  const { updateCommandOutput } = useCommandLineHistory((state) => state);

  const executeLsCommand = (): FileSystemType[] => {
    const result = files.filter((file) => {
      const parentPath = file.path.substring(0, file.path.lastIndexOf("/"));
      return parentPath === commandPath;
    });

    updateCommandOutput(commandId, result);
    return result;
  };

  const commandResult: FileSystemType[] = commandOutput
    ? (commandOutput as FileSystemType[])
    : executeLsCommand();

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
