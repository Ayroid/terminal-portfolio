"use client";
import CommandExecuter from "@/components/CommandExecuter";
import { Input } from "@/components/ui/input";
import { user } from "@/data/constants";
import { useCommandLineHistory } from "@/store/commandLineHistoryStore";
import { useCurrentPath } from "@/store/currentPathStore";
import React from "react";

const CommandPrompt = ({
  currentPath,
  showInput = false,
}: {
  currentPath: string;
  showInput?: boolean;
}) => {
  const displayPath = currentPath === "~" ? "~" : currentPath;

  return (
    <div className="font-hack font-semibold text-base">
      {/* Top line: ┌──(user@portfolio)-[~/path] */}
      <div className="flex items-center">
        <span className="text-cyan">┌──(</span>
        <span className="text-green">{user}</span>
        <span className="text-cyan">@</span>
        <span className="text-green">portfolio</span>
        <span className="text-cyan">)-[</span>
        <span className="text-purple font-bold">{displayPath}</span>
        <span className="text-cyan">]</span>
      </div>
      {/* Bottom line: └─$ */}
      {showInput && (
        <div className="flex items-center">
          <span className="text-cyan">└─</span>
          <span className="text-pink font-bold">$</span>
          <span className="ml-1"></span>
        </div>
      )}
    </div>
  );
};

const HistoryPrompt = ({ currentPath }: { currentPath: string }) => {
  const displayPath = currentPath === "~" ? "~" : currentPath;

  return (
    <div className="font-hack font-semibold text-base flex items-center gap-1">
      <span className="text-cyan">┌──(</span>
      <span className="text-green">{user}</span>
      <span className="text-cyan">@</span>
      <span className="text-green">portfolio</span>
      <span className="text-cyan">)-[</span>
      <span className="text-purple font-bold">{displayPath}</span>
      <span className="text-cyan">]</span>
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
        username: `${user}@portfolio`,
        currentPath: currentPath,
      },
      command: command.trim().toLowerCase(),
    });
    clearCommand();
  };

  return (
    <div className="w-full">
      <div className="history font-hack text-lg">
        {commandLineHistory.map((cmd, index) => (
          <div key={index} className="mb-3">
            <HistoryPrompt currentPath={cmd.commandPath.currentPath} />
            <div className="flex items-center">
              <span className="text-cyan">└─</span>
              <span className="text-pink font-bold">$</span>
              <span className="ml-2 font-semibold text-foreground">
                {cmd.command}
              </span>
            </div>
            <CommandExecuter command={cmd} />
          </div>
        ))}
      </div>
      <CommandPrompt currentPath={currentPath} showInput={true} />
      <form onSubmit={handleCommand} className="flex items-center -mt-6 ml-8">
        <Input
          className="w-full border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none appearance-none bg-background hover:bg-background focus:bg-background active:bg-background selection:bg-transparent focus:ring-offset-0 text-foreground font-hack placeholder:text-comment [&:not(:focus-visible)]:focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none m-0 p-0 !text-lg font-medium caret-pink"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoFocus
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
