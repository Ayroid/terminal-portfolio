import aboutText from "@/data/content/about";
import skillsText from "@/data/content/skills";

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

export const fileStructure: fileStructureType[] = [
  {
    id: "home",
    name: "~",
    type: "directory",
    parentId: "",
    childrenId: [
      {
        id: "about",
        type: "directory",
      },
      {
        id: "pages",
        type: "directory",
      },
      {
        id: "app.txt",
        type: "file",
      },
    ],
  },
  {
    id: "about",
    name: "about",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "ayroid.txt",
        type: "file",
      },
      {
        id: "skills.txt",
        type: "file",
      },
      {
        id: "resume",
        type: "directory",
      },
    ],
  },
  {
    id: "ayroid.txt",
    name: "ayroid.txt",
    type: "file",
    parentId: "about",
    childrenId: [],
    content: aboutText,
  },
  {
    id: "skills.txt",
    name: "skills.txt",
    type: "file",
    parentId: "about",
    childrenId: [],
    content: skillsText,
  },
  {
    id: "resume",
    name: "resume",
    type: "directory",
    parentId: "about",
    childrenId: [
      {
        id: "resume.pdf",
        type: "file",
      },
    ],
  },
  {
    id: "resume.pdf",
    name: "resume.pdf",
    type: "file",
    parentId: "resume",
    childrenId: [],
    content: "https://drive.google.com/file/d/1",
  },
  {
    id: "projects",
    name: "projects",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "ideos",
        type: "directory",
      },
      {
        id: "visual-rift",
        type: "directory",
      },
    ],
  },
  {
    id: "blogs",
    name: "blogs",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "devops",
        type: "directory",
      },
      {
        id: "development",
        type: "directory",
      },
      {
        id: "system-design",
        type: "directory",
      },
    ],
  },
];
