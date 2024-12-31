// store/fileSystemStore.ts
import { create } from "zustand";
import type { fileStructureType } from "@/types/fileStructureType";

interface FileSystemState {
  files: fileStructureType[];
  setFiles: (files: fileStructureType[]) => void;
  addFile: (file: fileStructureType) => void;
  removeFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<fileStructureType>) => void;
}

export const useFileSystem = create<FileSystemState>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  updateFile: (id, updates) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, ...updates } : file
      ),
    })),
}));
