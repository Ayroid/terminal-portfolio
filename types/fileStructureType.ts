export type fileStructureType = {
  id: string;
  name: string;
  type: string;
  parentId: string;
  childrenId: {
    id: string;
    type: string;
  }[];
  content?: string;
};