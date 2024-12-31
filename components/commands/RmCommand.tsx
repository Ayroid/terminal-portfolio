import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

interface RmCommandProps {
  target?: string;
  recursive?: boolean;
}

const RmCommand: React.FC<RmCommandProps> = ({ target, recursive = false }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const { files, removeFile } = useFileSystem();
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeRmCommand = async (target?: string) => {
      if (!target) {
        setOutput("rm: missing operand");
        return;
      }

      try {
        const targetPath = `${currentPath}/${target}`;
        const targetFile = files.find(f => f.path === targetPath);

        if (!targetFile) {
          setOutput(`rm: cannot remove '${target}': No such file or directory`);
          return;
        }

        if (targetFile.type === "directory" && !recursive) {
          setOutput(`rm: cannot remove '${target}': Is a directory, use -r flag`);
          return;
        }

        if (targetPath === "~" || targetPath === "~/about") {
          setOutput(`rm: cannot remove '${target}': Permission denied`);
          return;
        }

        const response = await axios.delete('/api/filesystem/rm', {
          data: { id: targetFile.id },
          params: { recursive }
        });

        console.log(response.data);

        removeFile(targetFile.id);
        setOutput("");
      } catch (error) {
        const errorMsg = axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Error occurred";
        setOutput(`rm: cannot remove '${target}': ${errorMsg}`);
      }
    };

    executeRmCommand(target);
  }, [target, recursive, currentPath, files, removeFile]);

  return output ? <div className="text-red-500">{output}</div> : null;
};

export default RmCommand;
