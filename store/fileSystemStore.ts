// store/fileSystemStore.ts
import { create } from "zustand";
import type { FileSystemType } from "@/types/fileSystemType";

interface FileSystemState {
  files: FileSystemType[];
  setFiles: (files: FileSystemType[]) => void;
  addFile: (file: FileSystemType) => void;
  removeFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<FileSystemType>) => void;
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
