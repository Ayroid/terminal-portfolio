
import { fileStructure } from "@/data/fileStructure";
import { useCurrentPath } from "@/store/currentPathStore";
import { fileStructureType } from "@/types/fileStructureType";

const CatCommand = ({ targetFile }: { targetFile?: string }) => {
  const { currentPath } = useCurrentPath((state) => state);

  const containsHTML = (text: string): boolean => {
    return /<[a-z][\s\S]*>/i.test(text);
  };

  const renderContent = (content: string) => {
    if (containsHTML(content)) {
      return (
        <div
          className="formatted-html"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    return <div className="plain-text">{content}</div>;
  };

  const executeCatCommand = (targetFile?: string) => {
    if (!targetFile) return { output: "cat: missing operand", result: "error" };

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
        return { output: file.content, result: "success" };
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

  return output ? renderContent(output) : null;
};

export default CatCommand;
