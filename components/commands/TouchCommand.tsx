import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

interface TouchCommandProps {
  fileName?: string;
}

const TouchCommand: React.FC<TouchCommandProps> = ({ fileName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const { files, addFile } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeTouchCommand = async (fileName?: string) => {
      if (!fileName) {
        setOutput("touch: missing file operand");
        return;
      }

      try {
        const filePath = `${currentPath}/${fileName}`;
        const fileExists = files.some((file) => file.path === filePath);

        if (fileExists) {
          setOutput("");
          return;
        }

        const parentDir = files.find((file) => file.path === currentPath);
        if (!parentDir) {
          setOutput(
            `touch: cannot create file '${fileName}': Parent directory not found`
          );
          return;
        }

        const response = await axios.post("/api/filesystem/touch", {
          name: fileName,
          parentId: parentDir.id,
          path: filePath,
          content: "",
        });

        addFile(response.data);
        setOutput("");
      } catch (error) {
        const errorMsg =
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Error occurred";
        setOutput(`touch: cannot create file '${fileName}': ${errorMsg}`);
      }
    };

    executeTouchCommand(fileName);
  }, [fileName, currentPath, files, addFile]);

  return output ? <div className="text-red-500">{output}</div> : null;
};

export default TouchCommand;
