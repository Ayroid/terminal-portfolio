import React from "react";

import CatCommand from "@/components/commands/CatCommand";
import CdCommand from "@/components/commands/CdCommand";
import ClearCommand from "@/components/commands/ClearCommand";
import HistoryCommand from "@/components/commands/HistoryCommand";
import HelpCommand from "@/components/commands/HelpCommand";
import LsCommand from "@/components/commands/LsCommand";
import PwdCommand from "@/components/commands/PwdCommand";
import SudoCommand from "@/components/commands/SudoCommand";
import WhoamiCommand from "@/components/commands/WhoamiCommand";

import { validCommands } from "@/data/constants";
import { Command } from "@/store/commandLineHistoryStore";

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
    case "cat":
      return <CatCommand targetFile={args[0]} />;

    case "cd":
      return <CdCommand targetPath={args[0]} />;

    case "clear":
      return <ClearCommand />;

    case "history":
      return <HistoryCommand />;

    case "help":
      return <HelpCommand />;

    case "ls":
      return <LsCommand commandPath={commandPath} />;

    case "pwd":
      return <PwdCommand commandPath={commandPath} />;

    case "sudo":
      return <SudoCommand />;

    case "whoami":
      return <WhoamiCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
