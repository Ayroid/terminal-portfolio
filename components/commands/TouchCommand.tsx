import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

interface TouchCommandProps {
  fileName?: string;
}

const TouchCommand: React.FC<TouchCommandProps> = ({ fileName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeTouchCommand = async (fileName?: string) => {
      if (!fileName) {
        setOutput("touch: missing file operand");
        return;
      }

      try {
        // Convert to absolute path
        const basePath = currentPath === "~" ? "/~" : currentPath;
        const filePath = `${basePath}/${fileName}`;

        // Check if file already exists
        const fileExists = files.some((file) => file.path === filePath);
        if (fileExists) {
          // If file exists, just update its timestamp (not implemented yet)
          setOutput("");
          return;
        }

        // Get parent directory
        const parentPath = basePath;
        const parentDir = files.find((file) => file.path === parentPath);

        if (!parentDir) {
          setOutput(
            `touch: cannot create file '${fileName}': Parent directory not found`
          );
          return;
        }

        await axios.post("/api/filesystem/touch", {
          name: fileName,
          parentId: parentDir.id,
          path: filePath,
          content: "", // Empty content for new file
        });

        setOutput(""); // Clear any previous error messages on success
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setOutput(
            `touch: cannot create file '${fileName}': ${
              error.response.data.error || "Error occurred"
            }`
          );
        } else {
          setOutput(`touch: cannot create file '${fileName}': Error occurred`);
        }
      }
    };

    executeTouchCommand(fileName);
  }, [fileName, currentPath, files]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default TouchCommand;
