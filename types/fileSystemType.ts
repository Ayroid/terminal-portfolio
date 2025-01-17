export type FileSystemType = {
  id: string;
  name: string;
  type: "directory" | "file";
  path: string;
  parentId: string;
  content?: string;
  owner?: string;
  createdAt?: Date;
  updatedAt?: Date;
  children?: FileSystemType[];
};