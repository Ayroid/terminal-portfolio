import {
  CommandOutput,
  useCommandLineHistory,
  type Command,
} from "@/store/commandLineHistoryStore";
import React, { useEffect } from "react";

interface HistoryCommandProps {
  commandId: string;
  commandOutput?: CommandOutput;
}

const HistoryCommand: React.FC<HistoryCommandProps> = ({
  commandId,
  commandOutput,
}) => {
  const { commandLineHistory, updateCommandOutput } = useCommandLineHistory(
    (state) => state
  );

  useEffect(() => {
    if (!commandOutput) {
      updateCommandOutput(commandId, commandLineHistory);
    }
  }, [commandId, commandOutput, commandLineHistory, updateCommandOutput]);

  const renderHistory = (history: Command[]) => {
    return history.map((command, index) => (
      <div key={`${command.commandId}-${index}`} className="flex">
        <span className="mr-2 text-gray-500 w-4 text-right">{index + 1}</span>
        <span className="text-white">{command.command}</span>
      </div>
    ));
  };

  const displayHistory =
    commandOutput && Array.isArray(commandOutput)
      ? commandOutput
      : commandLineHistory;

  return (
    <div className="font-mono text-lg my-2 space-y-1">
      {renderHistory(displayHistory as Command[])}
    </div>
  );
};

export default HistoryCommand;
