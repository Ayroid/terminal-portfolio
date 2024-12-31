import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

interface MkdirCommandProps {
  dirName?: string;
}

const MkdirCommand: React.FC<MkdirCommandProps> = ({ dirName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeMkdirCommand = async (dirName?: string) => {
      if (!dirName) {
        setOutput("mkdir: missing operand");
        return;
      }

      try {
        // Convert current path to absolute path
        const basePath = currentPath === "~" ? "/~" : currentPath;
        const newDirPath = `${basePath}/${dirName}`;

        // Check if directory already exists
        const directoryExists = files.some(file => file.path === newDirPath);
        if (directoryExists) {
          setOutput(`mkdir: cannot create directory '${dirName}': File exists`);
          return;
        }

        // Get parent path and ID
        const parentPath = basePath;
        const parentDir = files.find(file => file.path === parentPath);

        if (!parentDir) {
          setOutput(`mkdir: cannot create directory '${dirName}': Parent directory not found`);
          return;
        }

        await axios.post("/api/filesystem/mkdir", {
          name: dirName,
          parentId: parentDir.id,
          path: newDirPath
        });

        setOutput(""); // Clear any previous error messages on success

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setOutput(
            `mkdir: cannot create directory '${dirName}': ${
              error.response?.data?.error || "Error occurred"
            }`
          );
        } else {
          setOutput(
            `mkdir: cannot create directory '${dirName}': Error occurred`
          );
        }
      }
    };

    executeMkdirCommand(dirName);
  }, [dirName, currentPath, files]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default MkdirCommand;