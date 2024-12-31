import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

interface MkdirCommandProps {
  dirName?: string;
}

const MkdirCommand: React.FC<MkdirCommandProps> = ({ dirName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const { files, addFile } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeMkdirCommand = async (dirName?: string) => {
      if (!dirName) {
        setOutput("mkdir: missing operand");
        return;
      }

      const newDirPath = `${currentPath}/${dirName}`;

      if (files.some((file) => file.path === newDirPath)) {
        setOutput(`mkdir: cannot create directory '${dirName}': File exists`);
        return;
      }

      const parentDir = files.find((file) => file.path === currentPath);
      if (!parentDir) {
        setOutput(
          `mkdir: cannot create directory '${dirName}': Parent directory not found`
        );
        return;
      }

      try {
        const response = await axios.post("/api/filesystem/mkdir", {
          name: dirName,
          parentId: parentDir.id,
          path: newDirPath,
        });

        addFile({
          ...response.data,
          children: [],
        });
        setOutput("");
      } catch (error) {
        setOutput(
          `mkdir: cannot create directory '${dirName}': ${
            axios.isAxiosError(error) && error.response
              ? error.response.data?.error || "Error occurred"
              : "Error occurred"
          }`
        );
      }
    };

    executeMkdirCommand(dirName);
  }, [dirName, currentPath, files, addFile]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default MkdirCommand;
