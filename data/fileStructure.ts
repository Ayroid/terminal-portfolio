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
        id: "app",
        type: "file",
      },
    ],
  },
  {
    id: "pages",
    name: "pages",
    type: "directory",
    parentId: "home",
    childrenId: [
      {
        id: "about",
        type: "file",
      },
      {
        id: "projects",
        type: "file",
      },
    ],
  },
  {
    id: "about",
    name: "about",
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
    id: "projects",
    name: "projects",
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
        id: "CommandInput",
        type: "file",
      },
    ],
  },
  {
    id: "CommandInput",
    name: "CommandInput",
    type: "file",
    parentId: "terminal",
    childrenId: [],
    content: `import { Input } from "@/components/ui/input";`,
  },
  {
    id: "app",
    name: "app",
    type: "file",
    parentId: "home",
    childrenId: [],
    content: `import { App } from "@/App";`,
  },
];
