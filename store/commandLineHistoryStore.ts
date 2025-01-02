import { create } from "zustand";

export type Command = {
  commandId: string;
  commandPath: {
    username: string;
    currentPath: string;
  };
  command: string;
  commandOutput?: React.ReactNode | Command[];
};

type State = {
  commandLineHistory: Command[];
};

type Actions = {
  addCommand: (command: Command) => void;
  updateCommandOutput: (commandId: string, output: React.ReactNode | Command[]) => void;
  clearHistory: () => void;
};

type CommandLineHistoryStore = State & Actions;

const useCommandLineHistoryStore = create<CommandLineHistoryStore>((set) => ({
  commandLineHistory: [],
  addCommand: (command) =>
    set((state) => ({
      commandLineHistory: [...state.commandLineHistory, command],
    })),
  updateCommandOutput: (commandId, commandOutput) =>
    set((state) => ({
      commandLineHistory: state.commandLineHistory.map((command) =>
        command.commandId === commandId
          ? { ...command, commandOutput }
          : command
      ),
    })),

  clearHistory: () => set({ commandLineHistory: [] }),
}));

export { useCommandLineHistoryStore as useCommandLineHistory };
export type { CommandLineHistoryStore };
