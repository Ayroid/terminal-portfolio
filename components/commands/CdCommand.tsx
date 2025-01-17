import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import { useEffect, useMemo, useState } from "react";

interface CdCommandProps {
  targetPath?: string;
}

const CdCommand: React.FC<CdCommandProps> = ({ targetPath }) => {
  const { currentPath, setCurrentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  const executeCdCommand = useMemo(
    () => (targetPath?: string) => {
      if (!targetPath) return { path: "~", error: "" };

      if (targetPath === ".." || targetPath === "../") {
        if (currentPath === "~") return { path: "~", error: "" };
        const pathParts = currentPath.split("/");
        pathParts.pop();
        return { path: pathParts.join("/") || "~", error: "" };
      }

      if (targetPath === "~" || targetPath === "/")
        return { path: "~", error: "" };
      if (targetPath === ".") return { path: currentPath, error: "" };

      const newPath = `${currentPath}/${targetPath}`;
      const targetDir = files.find((file) => file.path === newPath);

      if (!targetDir) {
        return {
          path: currentPath,
          error: `cd: no such file or directory: ${targetPath}`,
        };
      }

      return targetDir.type === "directory" && targetDir.name === targetPath
        ? { path: newPath, error: "" }
        : { path: currentPath, error: `cd: not a directory: ${targetPath}` };
    },
    [currentPath, files]
  );

  useEffect(() => {
    if (!targetPath) return;
    const { path, error } = executeCdCommand(targetPath);
    if (path !== currentPath) setCurrentPath(path);
    setOutput(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return output ? <div className="text-red">{output}</div> : null;
};

export default CdCommand;
