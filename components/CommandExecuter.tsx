import React from "react";

import LsCommand from "@/components/commands/LsCommand";
import CdCommand from "@/components/commands/CdCommand";
import ClearCommand from "@/components/commands/ClearCommand";
import PwdCommand from "@/components/commands/PwdCommand";
import WhoamiCommand from "@/components/commands/WhoamiCommand";

import { Command } from "@/store/commandLineHistoryStore";
import { validCommands } from "@/data/constants";
import { HelpCommand } from "./commands/HelpCommand";

interface CommandExecuterProps {
  command: Command;
}

const CommandExecuter: React.FC<CommandExecuterProps> = ({ command }) => {
  const [baseCommand, ...args] = command.command.trim().split(/\s+/);
  const commandPath = command.commandPath.currentPath;

  if (!validCommands.some((cmd) => cmd.command === baseCommand)) {
    return <div className="text-red">command not found: {baseCommand}</div>;
  }

  switch (baseCommand) {
    case "ls":
      return <LsCommand commandPath={commandPath} />;

    case "cd":
      return <CdCommand targetPath={args[0]} />;

    case "clear":
      return <ClearCommand />;

    case "pwd":
      return <PwdCommand commandPath={commandPath} />;

    case "whoami":
      return <WhoamiCommand />;

    case "help":
      return <HelpCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
