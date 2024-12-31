import aboutText from "@/data/content/about";
import resumeText from "@/data/content/resume";
import skillsText from "@/data/content/skills";
import { FileSystemType } from "@/types/fileSystemType";

export const fileStructure: FileSystemType[] = [
  {
    id: "home",
    name: "~",
    type: "directory",
    parentId: "",
    path: "/~",
  },
  {
    id: "about",
    name: "about",
    type: "directory",
    parentId: "home",
    path: "/~/about",
  },
  {
    id: "ayroid.txt",
    name: "ayroid.txt",
    type: "file",
    parentId: "about",
    path: "/~/about/ayroid.txt",
    content: aboutText,
  },
  {
    id: "skills.txt",
    name: "skills.txt",
    type: "file",
    parentId: "about",
    path: "/~/about/skills.txt",
    content: skillsText,
  },
  {
    id: "resume.txt",
    name: "resume.txt",
    type: "file",
    parentId: "about",
    path: "/~/about/resume.txt",
    content: resumeText,
  },
  {
    id: "projects",
    name: "projects",
    type: "directory",
    parentId: "home",
    path: "/~/projects",
  },
  {
    id: "ideos",
    name: "ideos",
    type: "directory",
    parentId: "projects",
    path: "/~/projects/ideos",
  },
  {
    id: "visual-rift",
    name: "visual-rift",
    type: "directory",
    parentId: "projects",
    path: "/~/projects/visual-rift",
  },
  {
    id: "blogs",
    name: "blogs",
    type: "directory",
    parentId: "home",
    path: "/~/blogs",
  },
  {
    id: "devops",
    name: "devops",
    type: "directory",
    parentId: "blogs",
    path: "/~/blogs/devops",
  },
  {
    id: "development",
    name: "development",
    type: "directory",
    parentId: "blogs",
    path: "/~/blogs/development",
  },
  {
    id: "system-design",
    name: "system-design",
    type: "directory",
    parentId: "blogs",
    path: "/~/blogs/system-design",
  },
];
