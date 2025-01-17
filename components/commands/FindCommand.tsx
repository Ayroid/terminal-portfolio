"use client";

import { useFileSystem } from "@/store/fileSystemStore";

interface FindCommandProps {
  pattern?: string;
}

const FindCommand = ({ pattern }: FindCommandProps) => {
  const { files } = useFileSystem();

  const executeFindCommand = () => {
    if (!pattern) {
      // If no pattern, list all files
      return {
        output: files.map((f) => f.path).join("\n"),
        result: "success",
      };
    }

    // Simple pattern matching (supports * as wildcard)
    const regex = new RegExp(
      "^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$",
      "i"
    );

    const matches = files.filter(
      (file) => regex.test(file.name) || regex.test(file.path)
    );

    if (matches.length === 0) {
      return { output: "", result: "success" };
    }

    return {
      output: matches.map((f) => f.path).join("\n"),
      result: "success",
    };
  };

  const { output } = executeFindCommand();

  if (!output) return null;

  return (
    <div className="text-foreground font-hack whitespace-pre-wrap">
      {output.split("\n").map((line, i) => (
        <div key={i} className={files.find((f) => f.path === line)?.type === "directory" ? "text-cyan" : "text-foreground"}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default FindCommand;
