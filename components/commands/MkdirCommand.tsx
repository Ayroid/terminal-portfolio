import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import axios from "axios";

interface MkdirCommandProps {
  dirName?: string;
}

const MkdirCommand: React.FC<MkdirCommandProps> = ({ dirName }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeMkdirCommand = async (dirName?: string) => {
      if (!dirName) {
        setOutput("mkdir: missing operand");
        return;
      }

      try {
        const parentId =
          currentPath === "~" ? "home" : currentPath.split("/").pop();
        await axios.post("/api/filesystem/mkdir", {
          name: dirName,
          parentId,
        });
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
  }, [dirName, currentPath]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default MkdirCommand;
