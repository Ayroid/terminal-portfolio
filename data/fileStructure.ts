import aboutText from "@/data/content/about";
import resumeText from "@/data/content/resume";
import skillsText from "@/data/content/skills";
import { fileStructureType } from "@/types/fileStructureType";



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
        id: "resume.txt",
        type: "file",
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
    id: "resume.txt",
    name: "resume.txt",
    type: "file",
    parentId: "about",
    childrenId: [],
    content: resumeText,
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
