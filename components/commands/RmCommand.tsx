import { useEffect, useState } from "react";
import { useCurrentPath } from "@/store/currentPathStore";
import axios from "axios";

import { fileStructure } from "@/data/fileStructure";
import { fileStructureType } from "@/types/fileStructureType";

interface RmCommandProps {
  target?: string;
  recursive?: boolean; // For rm -r or rm -rf
}

const RmCommand: React.FC<RmCommandProps> = ({ target, recursive = false }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const executeRmCommand = async (target?: string) => {
      if (!target) {
        setOutput("rm: missing operand");
        return;
      }

      try {
        // Get current directory
        const parentId =
          currentPath === "~" ? "home" : currentPath.split("/").pop();
        const currentDirectory: fileStructureType | undefined =
          fileStructure.find((file) => file.id === parentId);

        // Check if target exists in current directory
        const targetExists = currentDirectory?.childrenId?.find(
          (child) => child.id === target
        );

        if (!targetExists) {
          setOutput(`rm: cannot remove '${target}': No such file or directory`);
          return;
        }

        // If target is a directory and recursive flag is not set
        if (targetExists.type === "directory" && !recursive) {
          setOutput(
            `rm: cannot remove '${target}': Is a directory, use -r flag`
          );
          return;
        }

        // Proceed with deletion
        await axios.delete(`/api/filesystem/rm`, {
          params: {
            id: target,
            parentId, // Send parentId to API for additional validation
          },
        });
      } catch (error: unknown) {
        const errorMsg =
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Error occurred";
        setOutput(`rm: cannot remove '${target}': ${errorMsg}`);
      }
    };

    executeRmCommand(target);
  }, [target, recursive, currentPath]);

  return output ? <div className="text-red">{output}</div> : null;
};

export default RmCommand;
