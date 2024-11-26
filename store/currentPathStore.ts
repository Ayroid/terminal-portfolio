import { create } from "zustand";

type State = {
  currentPath: string;
  command: string;
};

type Actions = {
  setCurrentPath: (path: string) => void;
  setCommand: (command: string) => void;
  clearCommand: () => void;
};

type CurrentPathStore = State & Actions;

const useCurrentPathStore = create<CurrentPathStore>((set) => ({
  currentPath: "~",
  command: "",
  setCurrentPath: (path) => set({ currentPath: path }),
  setCommand: (command) => set({ command }),
  clearCommand: () => set({ command: "" }),
}));

export { useCurrentPathStore as useCurrentPath };
export type { CurrentPathStore };
