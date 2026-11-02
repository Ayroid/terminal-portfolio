import aboutText from "@/data/content/about";
import projects from "@/data/content/projects";
import resumeText from "@/data/content/resume";
import skillsText from "@/data/content/skills";
import { FileSystemType } from "@/types/fileSystemType";

export const fileStructure: FileSystemType[] = [
  {
    id: "home",
    name: "~",
    type: "directory",
    parentId: "",
    path: "~",
  },
  {
    id: "about",
    name: "about",
    type: "directory",
    parentId: "home",
    path: "~/about",
  },
  {
    id: "ayroid.txt",
    name: "ayroid.txt",
    type: "file",
    parentId: "about",
    path: "~/about/ayroid.txt",
    content: aboutText,
  },
  {
    id: "skills.txt",
    name: "skills.txt",
    type: "file",
    parentId: "about",
    path: "~/about/skills.txt",
    content: skillsText,
  },
  {
    id: "resume.txt",
    name: "resume.txt",
    type: "file",
    parentId: "about",
    path: "~/about/resume.txt",
    content: resumeText,
  },
  {
    id: "projects",
    name: "projects",
    type: "directory",
    parentId: "home",
    path: "~/projects",
  },
  ...projects.map((p) => ({
    id: `${p.slug}.txt`,
    name: `${p.slug}.txt`,
    type: "file" as const,
    parentId: "projects",
    path: `~/projects/${p.slug}.txt`,
    content: `<div><br/><strong>${p.name}</strong> [${p.status}]<br/><br/>${p.desc}<br/><br/>🔗 <a href="${p.link}" target="_blank" rel="noopener noreferrer">${p.link}</a><br/></div>`,
  })),
  {
    id: "blogs",
    name: "blogs",
    type: "directory",
    parentId: "home",
    path: "~/blogs",
  },
  {
    id: "devops",
    name: "devops",
    type: "directory",
    parentId: "blogs",
    path: "~/blogs/devops",
  },
  {
    id: "development",
    name: "development",
    type: "directory",
    parentId: "blogs",
    path: "~/blogs/development",
  },
  {
    id: "system-design",
    name: "system-design",
    type: "directory",
    parentId: "blogs",
    path: "~/blogs/system-design",
  },
];
