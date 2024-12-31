import { useCurrentPath } from "@/store/currentPathStore";
import { useFileSystem } from "@/store/fileSystemStore";
import { useEffect, useState } from "react";

const TreeCommand = () => {
  const [treeStructure, setTreeStructure] = useState<{
    name: string;
    depth: number;
    type: string;
    path: string;
  }[]>([]);
  const { currentPath } = useCurrentPath((state) => state);
  const { files } = useFileSystem();

  useEffect(() => {
    const buildTree = () => {
      const result: { name: string; depth: number; type: string; path: string }[] = [];

      const traverse = (
        path: string,
        depth: number = 0,
        isLast: boolean[] = []
      ) => {
        const node = files.find((file) => file.path === path);
        if (!node) return;

        let prefix = "";
        for (let i = 0; i < depth - 1; i++) {
          prefix += isLast[i] ? "    " : "│   ";
        }
        if (depth > 0) {
          prefix += isLast[isLast.length - 1] ? "└── " : "├── ";
        }

        result.push({
          name: prefix + node.name,
          depth,
          type: node.type,
          path: node.path,
        });

        const children = files
          .filter((file) => {
            const parentPath = file.path.substring(0, file.path.lastIndexOf('/'));
            return parentPath === path;
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        children.forEach((child, index) => {
          traverse(child.path, depth + 1, [...isLast, index === children.length - 1]);
        });
      };

      traverse("/~");
      return result;
    };

    if (files.length > 0) {
      setTreeStructure(buildTree());
    }
  }, [files]);

  return (
    <div className="text-white font-mono whitespace-pre">
      {treeStructure.map((item, index) => (
        <div
          key={index}
          className={
            item.path === currentPath
              ? "text-orange-400"
              : item.type === "directory"
              ? "text-blue-400"
              : ""
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default TreeCommand;