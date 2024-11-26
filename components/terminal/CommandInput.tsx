"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCommandLineHistory } from "@/store/commandLineHistoryStore";
import CommandExecuter from "@/components/commands/CommandExecuter";
import { useCurrentPath } from "@/store/currentPathStore";

const username = "ayroid@portfolio:";

const CommandPath = () => {
  const { currentPath } = useCurrentPath((state) => state);
  return (
    <div className="currentpath font-hack font-semibold text-lg flex gap-1">
      <span className="text-pink">{username}</span>
      <span className="text-green">
        {currentPath}
        {currentPath === "~" && "/" }
      </span>
    </div>
  );
};

const CommandInput = () => {
  const { commandLineHistory, addCommand, clearHistory } =
    useCommandLineHistory((state) => state);
  const { currentPath } = useCurrentPath((state) => state);

  const [command, setCommand] = useState("");

  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (command === "clear") {
      clearHistory();
      setCommand("");
      return;
    }

    addCommand({
      commandPath: {
        username: username,
        currentPath: currentPath,
      },
      command: command,
    });
    setCommand("");
  };

  return (
    <div className="w-full">
      <div className="history font-hack font-semibold text-lg">
        {commandLineHistory.map((command, index) => (
          <div key={index} className="mb-2">
            <CommandPath />
            <span className="text-foreground">{command.command}</span>
            <CommandExecuter command={command.command} />
          </div>
        ))}
      </div>
      <CommandPath />
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
