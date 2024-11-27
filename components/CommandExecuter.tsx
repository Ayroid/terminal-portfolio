import React from "react";
import LsCommand from "./commands/LsCommand";
import CdCommand from "./commands/CdCommand";
import ClearCommand from "./commands/ClearCommand";
import { validCommands } from "../data/validCommands";
import { Command } from "@/store/commandLineHistoryStore";
import PwdCommand from "./commands/PwdCommand";

interface CommandExecuterProps {
  command: Command;
}

const CommandExecuter: React.FC<CommandExecuterProps> = ({ command }) => {
  const [baseCommand, ...args] = command.command.trim().split(/\s+/);
  const commandPath = command.commandPath.currentPath;

  if (!validCommands.includes(baseCommand)) {
    return <div className="text-red-500">Invalid command!</div>;
  }

  switch (baseCommand) {
    case "ls":
      return <LsCommand commandPath={commandPath} />;

    case "cd":
      return <CdCommand targetPath={args[0]} />;

    case "clear":
      return <ClearCommand />;

    case "pwd":
      return <PwdCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
