import type { fileStructureType } from "@/data/fileStructure";
import { fileStructure } from "@/data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";

const CatCommand = ({ targetFile }: { targetFile?: string }) => {
  const { currentPath } = useCurrentPath((state) => state);

  const executeCatCommand = (targetFile?: string) => {
    if (!targetFile) return { output: "cat: missing operand" };

    const currentDirectory: fileStructureType =
      currentPath === "~"
        ? fileStructure.find((file) => file.id === "home")!
        : fileStructure.find(
            (file) => file.id === currentPath.split("/").pop()
          )!;

    const targetExists = currentDirectory?.childrenId?.find(
      (child) => child.id === targetFile
    );

    if (targetExists) {
      if (targetExists.type === "file") {
        const file = fileStructure.find((file) => file.id === targetFile)!;
        return { output: file.content, result: "sucess" };
      } else {
        return {
          output: `cat: ${targetFile}: Is a directory`,
          result: "error",
        };
      }
    } else {
      return {
        output: `cat: ${targetFile}: No such file or directory`,
        result: "error",
      };
    }
  };

  const { output, result } = executeCatCommand(targetFile);

  if (result === "error") {
    return <div className="text-red">{output}</div>;
  }

  return <div>{output}</div>;
};

export default CatCommand;