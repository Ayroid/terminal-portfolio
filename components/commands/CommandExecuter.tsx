import React from "react";

import LsCommand from "./LsCommand";
import CdCommand from "./CdCommand";
import ClearCommand from "./ClearCommand";

import { validCommands } from "../../data/validCommands";

const CommandExecuter = ({ command }: { command: string }) => {
  if (!validCommands.includes(command)) {
    return "Invalid command!";
  }

  if (command === "ls") {
    return <LsCommand />;
  }

  if (command === "cd") {
    return <CdCommand />;
  }

  if (command === "clear") {
    return <ClearCommand />;
  }

  return null;
};

export default CommandExecuter;
