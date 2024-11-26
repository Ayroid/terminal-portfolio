import React from "react";
import LsCommand from "./LsCommand";
import CdCommand from "./CdCommand";
import ClearCommand from "./ClearCommand";
import { validCommands } from "../../data/validCommands";

interface CommandExecuterProps {
  command: string;
  frozen?: boolean;
}

const CommandExecuter: React.FC<CommandExecuterProps> = ({ command }) => {
  const [baseCommand, ...args] = command.trim().split(/\s+/);

  if (!validCommands.includes(baseCommand)) {
    return <div className="text-red-500">Invalid command!</div>;
  }

  switch (baseCommand) {
    case "ls":
      return <LsCommand />;

    case "cd":
      return <CdCommand args={args[0]} />;

    case "clear":
      return <ClearCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
