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
        const newDirPath = `${currentPath}/${dirName}`;

        const directoryExists = files.some((file) => file.path === newDirPath);
        if (directoryExists) {
          setOutput(`mkdir: cannot create directory '${dirName}': File exists`);
          return;
        }

        console.log("Current path", currentPath);

        const parentDir = files.find((file) => file.path === currentPath);

        console.log("Parent dir", parentDir);

        if (parentDir === undefined || parentDir === null) {
          console.log("Parent dir not found");
          setOutput(
            `mkdir: cannot create directory '${dirName}': Parent directory not found`
          );
          return;
        }

        await axios.post("/api/filesystem/mkdir", {
          name: dirName,
          parentId: parentDir.id,
          path: newDirPath,
        });

        setOutput("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return output ? <div className="text-red">{output}</div> : null;
};

export default MkdirCommand;
