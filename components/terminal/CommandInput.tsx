"use client";
import CommandExecuter from "@/components/CommandExecuter";
import { Input } from "@/components/ui/input";
import { username } from "@/data/constants";
import { useCommandLineHistory } from "@/store/commandLineHistoryStore";
import { useCurrentPath } from "@/store/currentPathStore";
import React from "react";

const CommandPath = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="currentpath font-hack font-semibold text-lg flex gap-1">
      <span className="text-primary">{username}</span>
      <span className="text-green">
        {currentPath}
        {currentPath === "~" && "/"}
      </span>
    </div>
  );
};
const CommandInput = () => {
  const { commandLineHistory, addCommand } = useCommandLineHistory(
    (state) => state
  );
  const { currentPath, command, setCommand, clearCommand } = useCurrentPath(
    (state) => state
  );

  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommand({
      commandId: Date.now().toString() + Math.random().toString(),
      commandPath: {
        username: username,
        currentPath: currentPath,
      },
      command: command.trim().toLowerCase(),
    });
    clearCommand();
  };

  return (
    <div className="w-full">
      <div className="history font-hack text-lg">
        {commandLineHistory.map((command, index) => (
          <div key={index} className="mb-2">
            <CommandPath currentPath={command.commandPath.currentPath} />
            <span className="font-semibold">{command.command}</span>
            <CommandExecuter command={command} />
          </div>
        ))}
      </div>
      <CommandPath currentPath={currentPath} />
      <form onSubmit={handleCommand}>
        <Input
          className="w-full mt-2  border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none appearance-none bg-background hover:bg-background focus:bg-background active:bg-background selection:bg-transparent focus:ring-offset-0 text-foreground font-hack placeholder:text-comment [&:not(:focus-visible)]:focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none m-0 p-0 !text-lg font-medium caret-pink"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          style={{
            WebkitAppearance: "none",
            outline: "none",
          }}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CommandInput;
