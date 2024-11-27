import React from "react";
import LsCommand from "./LsCommand";
import CdCommand from "./CdCommand";
import ClearCommand from "./ClearCommand";
import { validCommands } from "../../data/validCommands";
import { Command } from "@/store/commandLineHistoryStore";

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
      return <CdCommand args={args[0]} />;

    case "clear":
      return <ClearCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
