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
        id: "components",
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
    id: "components",
    name: "components",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "terminal",
        type: "directory",
      },
    ],
  },
  {
    id: "terminal",
    name: "terminal",
    type: "directory",
    parentId: "components",
    childrenId: [
      {
        id: "command.txt",
        type: "file",
      },
    ],
  },
  {
    id: "command.txt",
    name: "command.txt",
    type: "file",
    parentId: "terminal",
    childrenId: [],
    content: `import { Input } from "@/components/ui/input";`,
  },
  {
    id: "pages",
    name: "pages",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "about.txt",
        type: "file",
      },
      {
        id: "projects.txt",
        type: "file",
      },
    ],
  },
  {
    id: "about.txt",
    name: "about.txt",
    type: "file",
    parentId: "pages",
    childrenId: [],
    content: `export default function About() {
                      return (
                        <div>
                          <h1>About</h1>
                        </div>
                      );
                    }`,
  },
  {
    id: "projects.txt",
    name: "projects.txt",
    type: "file",
    parentId: "pages",
    childrenId: [],
    content: `export default function Projects() {
                      return (
                        <div>
                          <h1>Projects</h1>
                        </div>
                      );
                    }`,
  },
  {
    id: "app.txt",
    name: "app.txt",
    type: "file",
    parentId: "home",
    childrenId: [],
    content: `import { App } from "@/App";`,
  },
];
