import { validCommands } from "@/data/constants";

const HelpCommand = () => {
  return (
    <div>
      <p className="my-2 text-cyan font-semibold">
        List of available commands:
      </p>
      {validCommands.map((command) => (
        <div key={command.command} className="flex gap-16 text-gray-300">
          <span className="w-16 font-semibold text-orange">
            {command.command}
          </span>
          <span>- {command.description}</span>
        </div>
      ))}
    </div>
  );
};

export default HelpCommand;