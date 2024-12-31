import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import axios from "axios";

interface TouchCommandProps {
  fileName?: string;
}

const TouchCommand: React.FC<TouchCommandProps> = ({ fileName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeTouchCommand = async (fileName?: string) => {
      if (!fileName) {
        setOutput("touch: missing file operand");
        return;
      }

      try {
        const parentId =
          currentPath === "~" ? "home" : currentPath.split("/").pop();
        await axios.post("/api/filesystem/touch", {
          name: fileName,
          parentId,
          content: "", // Empty content for new file
        });
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
  }, [fileName, currentPath]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default TouchCommand;
