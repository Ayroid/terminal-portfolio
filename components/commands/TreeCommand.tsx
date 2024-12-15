import React, { useState, useEffect } from "react";
import { fileStructure } from "@/data/fileStructure";

const EchoCommand = () => {
  const [treeStructure, setTreeStructure] = useState<
    { name: string; depth: number; type: string }[]
  >([]);

  useEffect(() => {
    const buildTree = () => {
      const result: { name: string; depth: number; type: string }[] = [];

      const traverse = (
        nodeId: string,
        depth: number,
        isLast: boolean[] = []
      ) => {
        const node = fileStructure.find((file) => file.id === nodeId);
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
        });

        const children = fileStructure.filter(
          (file) => file.parentId === node.id
        );
        children.forEach((child, index) => {
          const newIsLast = [...isLast, index === children.length - 1];
          traverse(child.id, depth + 1, newIsLast);
        });
      };

      traverse("home", 0);
      return result;
    };

    setTreeStructure(buildTree());
  }, []);

  return (
    <div className="text-white font-mono whitespace-pre">
      {treeStructure.map((item, index) => (
        <div
          key={index}
          className={item.type === "directory" ? "text-blue-400" : ""}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default EchoCommand;
