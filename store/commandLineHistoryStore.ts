import { create } from "zustand";

export type Command = {
  commandPath: {
    username: string;
    currentPath: string;
  };
  command: string;
};

type State = {
  commandLineHistory: Command[];
};

type Actions = {
  addCommand: (command: Command) => void;
  clearHistory: () => void;
};

type CommandLineHistoryStore = State & Actions;

const useCommandLineHistoryStore = create<CommandLineHistoryStore>((set) => ({
  commandLineHistory: [],
  addCommand: (command) =>
    set((state) => ({
      commandLineHistory: [...state.commandLineHistory, command],
    })),

  clearHistory: () => set({ commandLineHistory: [] }),
}));

export { useCommandLineHistoryStore as useCommandLineHistory };
export type { CommandLineHistoryStore };
