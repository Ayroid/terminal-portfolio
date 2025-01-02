import React from "react";

import CatCommand from "@/components/commands/CatCommand";
import CdCommand from "@/components/commands/CdCommand";
import ClearCommand from "@/components/commands/ClearCommand";
import DateCommand from "@/components/commands/DateCommand";
import EchoCommand from "@/components/commands/EchoCommand";
import GitCommand from "@/components/commands/GitCommand";
import GitHubCommand from "@/components/commands/GitHubCommand";
import HashnodeCommand from "@/components/commands/HashnodeCommand";
import HelpCommand from "@/components/commands/HelpCommand";
import HistoryCommand from "@/components/commands/HistoryCommand";
import LinkedInCommand from "@/components/commands/LinkedInCommand";
import LsCommand from "@/components/commands/LsCommand";
import MkdirCommand from "@/components/commands/MkdirCommand";
import PwdCommand from "@/components/commands/PwdCommand";
import RmCommand from "@/components/commands/RmCommand";
import SudoCommand from "@/components/commands/SudoCommand";
import TouchCommand from "@/components/commands/TouchCommand";
import TreeCommand from "@/components/commands/TreeCommand";
import XCommand from "@/components/commands/XCommand";
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

    case "date":
      return <DateCommand />;

    case "echo":
      return <EchoCommand text={args.join(" ")} />;

    case "git":
      return <GitCommand />;

    case "github":
      return <GitHubCommand />;

    case "hashnode":
      return <HashnodeCommand />;

    case "help":
      return <HelpCommand />;

    case "history":
      return <HistoryCommand commandId={command.commandId} commandOutput={command.commandOutput} />;

    case "linkedin":
      return <LinkedInCommand />;

    case "ls":
      return <LsCommand commandPath={commandPath} commandId={command.commandId} commandOutput={command.commandOutput} />;

    case "mkdir":
      return <MkdirCommand dirName={args[0]}  />;

    case "pwd":
      return <PwdCommand commandPath={commandPath} />;

    case "rm":
      const isRecursive = args[0] === "-r" || args[0] === "-rf";
      const target = isRecursive ? args[1] : args[0];
      return <RmCommand target={target} recursive={isRecursive} />;

    case "sudo":
      return <SudoCommand />;

    case "touch":
      return <TouchCommand fileName={args[0]} />;

    case "tree":
      return <TreeCommand />;

    case "x":
      return <XCommand />;

    case "whoami":
      return <WhoamiCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
