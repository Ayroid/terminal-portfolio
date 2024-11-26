import { create } from "zustand";

type State = {
  currentPath: string;
};

type Actions = {
  setCurrentPath: (path: string) => void;
};

type CurrentPathStore = State & Actions;

const useCurrentPathStore = create<CurrentPathStore>((set) => ({
  currentPath: "~",
  setCurrentPath: (path) => set({ currentPath: path }),
}));

export { useCurrentPathStore as useCurrentPath };
export type { CurrentPathStore };
