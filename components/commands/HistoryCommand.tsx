import { useCommandLineHistory } from "@/store/commandLineHistoryStore";

const HistoryCommand = () => {
  const { commandLineHistory } = useCommandLineHistory((state) => state);

  // todo: fix the history command
  return (
    <div className="history font-hack text-lg my-2">
      {commandLineHistory.map((command, index) => (
        <div key={index}>
          <span>
            {index + 1}. {command.command}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HistoryCommand;
