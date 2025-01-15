import React from "react";

import AliasCommand from "@/components/commands/AliasCommand";
import CatCommand from "@/components/commands/CatCommand";
import CdCommand from "@/components/commands/CdCommand";
import ClearCommand from "@/components/commands/ClearCommand";
import CpCommand from "@/components/commands/CpCommand";
import DateCommand from "@/components/commands/DateCommand";
import EchoCommand from "@/components/commands/EchoCommand";
import ExitCommand from "@/components/commands/ExitCommand";
import FindCommand from "@/components/commands/FindCommand";
import GitCommand from "@/components/commands/GitCommand";
import GitHubCommand from "@/components/commands/GitHubCommand";
import HashnodeCommand from "@/components/commands/HashnodeCommand";
import HeadCommand from "@/components/commands/HeadCommand";
import HelpCommand from "@/components/commands/HelpCommand";
import HistoryCommand from "@/components/commands/HistoryCommand";
import HostnameCommand from "@/components/commands/HostnameCommand";
import LinkedInCommand from "@/components/commands/LinkedInCommand";
import LsCommand from "@/components/commands/LsCommand";
import MkdirCommand from "@/components/commands/MkdirCommand";
import MvCommand from "@/components/commands/MvCommand";
import NeofetchCommand from "@/components/commands/NeofetchCommand";
import PwdCommand from "@/components/commands/PwdCommand";
import RmCommand from "@/components/commands/RmCommand";
import SudoCommand from "@/components/commands/SudoCommand";
import TailCommand from "@/components/commands/TailCommand";
import TouchCommand from "@/components/commands/TouchCommand";
import TreeCommand from "@/components/commands/TreeCommand";
import UnameCommand from "@/components/commands/UnameCommand";
import UptimeCommand from "@/components/commands/UptimeCommand";
import WcCommand from "@/components/commands/WcCommand";
import WhoamiCommand from "@/components/commands/WhoamiCommand";
import XCommand from "@/components/commands/XCommand";

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
    case "alias":
      return <AliasCommand />;

    case "cat":
      return <CatCommand targetFile={args[0]} />;

    case "cd":
      return <CdCommand targetPath={args[0]} />;

    case "clear":
      return <ClearCommand />;

    case "cp":
      return <CpCommand source={args[0]} destination={args[1]} />;

    case "date":
      return <DateCommand />;

    case "echo":
      return <EchoCommand text={args.join(" ")} />;

    case "exit":
      return <ExitCommand />;

    case "find":
      return <FindCommand pattern={args[0]} />;

    case "git":
      return <GitCommand />;

    case "github":
      return <GitHubCommand />;

    case "hashnode":
      return <HashnodeCommand />;

    case "head":
      return <HeadCommand args={args} />;

    case "help":
      return <HelpCommand />;

    case "history":
      return <HistoryCommand commandId={command.commandId} commandOutput={command.commandOutput} />;

    case "hostname":
      return <HostnameCommand />;

    case "linkedin":
      return <LinkedInCommand />;

    case "ls":
      return <LsCommand commandPath={commandPath} commandId={command.commandId} commandOutput={command.commandOutput} />;

    case "mkdir":
      return <MkdirCommand dirName={args[0]} />;

    case "mv":
      return <MvCommand source={args[0]} destination={args[1]} />;

    case "neofetch":
      return <NeofetchCommand />;

    case "pwd":
      return <PwdCommand commandPath={commandPath} />;

    case "rm":
      const isRecursive = args[0] === "-r" || args[0] === "-rf";
      const target = isRecursive ? args[1] : args[0];
      return <RmCommand target={target} recursive={isRecursive} />;

    case "sudo":
      return <SudoCommand />;

    case "tail":
      return <TailCommand args={args} />;

    case "touch":
      return <TouchCommand fileName={args[0]} />;

    case "tree":
      return <TreeCommand />;

    case "uname":
      return <UnameCommand args={args} />;

    case "uptime":
      return <UptimeCommand />;

    case "wc":
      return <WcCommand args={args} />;

    case "whoami":
      return <WhoamiCommand />;

    case "x":
      return <XCommand />;

    default:
      return null;
  }
};

export default CommandExecuter;
