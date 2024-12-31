import { useCurrentPath } from "@/store/currentPathStore";
import { FileSystemType } from "@/types/fileSystemType";
import { useState, useEffect } from "react";

const CatCommand = ({ targetFile }: { targetFile?: string }) => {
  const { currentPath } = useCurrentPath((state) => state);
  const [fileSystem, setFileSystem] = useState<FileSystemType[]>([]);

  useEffect(() => {
    const fetchFileSystem = async () => {
      try {
        const response = await fetch("/api/filesystem/init");
        if (!response.ok) throw new Error("Failed to fetch filesystem");
        const data = await response.json();
        setFileSystem(data);
      } catch (error) {
        console.error("Error fetching filesystem:", error);
      }
    };

    fetchFileSystem();
  }, []);

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
    if (fileSystem.length === 0) return { output: "", result: "loading" };

    // Get current directory path
    const basePath = currentPath === "~" ? "/~" : `/~/${currentPath}`;
    const currentDirectory = fileSystem.find((file) => file.path === basePath);

    if (!currentDirectory) {
      return {
        output: `cat: Failed to locate current directory`,
        result: "error",
      };
    }

    // Check if target file exists in current directory
    const targetFilePath = `${basePath}/${targetFile}`;
    const targetFileNode = fileSystem.find(
      (file) => file.path === targetFilePath
    );

    if (!targetFileNode) {
      return {
        output: `cat: ${targetFile}: No such file or directory`,
        result: "error",
      };
    }

    if (targetFileNode.type === "directory") {
      return {
        output: `cat: ${targetFile}: Is a directory`,
        result: "error",
      };
    }

    return { output: targetFileNode.content, result: "success" };
  };

  const { output, result } = executeCatCommand(targetFile);

  if (result === "loading") return null;
  if (result === "error") {
    return <div className="text-red">{output}</div>;
  }

  return output ? renderContent(output) : null;
};

export default CatCommand;
