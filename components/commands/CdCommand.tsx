import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import { useEffect, useState } from "react";

interface CdCommandProps {
  targetPath?: string;
}

const CdCommand: React.FC<CdCommandProps> = ({ targetPath }) => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeCdCommand = (targetPath?: string) => {
      if (!targetPath) return { path: "/~", error: "" };

      // Handle special cases
      if (targetPath === ".." || targetPath === "../") {
        if (currentPath === "/~") return { path: "/~", error: "" };
        const pathParts = currentPath.split("/");
        pathParts.pop();
        return { path: pathParts.join("/") || "/~", error: "" };
      }

      if (targetPath === "~" || targetPath === "/") {
        return { path: "/~", error: "" };
      }

      // Construct the target path
      const basePath = currentPath === "/~" ? "/~" : currentPath;
      const newPath = `${basePath}/${targetPath}`;

      // Find the target directory in the file system
      const targetDir = files.find(file => file.path === newPath);

      if (!targetDir) {
        return {
          path: currentPath,
          error: `cd: no such file or directory: ${targetPath}`,
        };
      }

      if (targetDir.type === "directory") {
        return { path: newPath, error: "" };
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
    } else {
      setOutput("");
    }
  }, [targetPath, currentPath, setCurrentPath, files]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default CdCommand;