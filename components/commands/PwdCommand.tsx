import React from "react";

interface PwdCommandProps {
  commandPath: string;
}

const PwdCommand: React.FC<PwdCommandProps> = ({ commandPath }) => {
  const getAbsolutePath = (path: string) => {
    if (path === "~") return "~";
    if (path.startsWith("~")) return path;
    return `~/${path}`;
  };

  return <div className="text-white">{getAbsolutePath(commandPath)}</div>;
};

export default PwdCommand;
