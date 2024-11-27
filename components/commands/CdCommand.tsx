import { useEffect, useState } from "react";
import type { fileStructureType } from "@/data/fileStructure";
import { fileStructure } from "@/data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";

interface CdCommandProps {
  targetPath?: string;
}

const CdCommand: React.FC<CdCommandProps> = ({ targetPath }) => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeCdCommand = (targetPath?: string) => {
      if (!targetPath) return { path: "~", error: "" };
      if (targetPath === ".." || targetPath === "../") {
        if (currentPath === "~") return { path: "~", error: "" };
        const pathParts = currentPath.split("/");
        pathParts.pop();
        return { path: pathParts.join("/"), error: "" };
      }

      if (targetPath === "~" || targetPath === "/") {
        return { path: "~", error: "" };
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
        if (targetExists.type === "directory") {
          return { path: `${currentPath}/${targetPath}`, error: "" };
        } else {
          return { path: currentPath, error: `cd: not a directory: ${targetPath}` };
        }
      } else {
        return { path: currentPath, error: "" };
      }
    };

    const { path, error } = executeCdCommand(targetPath);
    if (path !== currentPath) {
      setCurrentPath(path);
    }
    if (error) {
      setOutput(error);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return output ? <div className="text-red">{output}</div> : null;
};

export default CdCommand;