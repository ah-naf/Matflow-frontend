import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

const treeData = [
  {
    key: "0",
    label: "Root",
    children: [
      {
        key: "0-0",
        label: "Level 1 - Node 1",
        children: [
          {
            key: "0-0-0",
            label: "Level 2 - Node 1",
            children: [
              {
                key: "0-0-0-0",
                label: "Level 3 - Node 1",
              },
              {
                key: "0-0-0-1",
                label: "Level 3 - Node 2",
              },
            ],
          },
          {
            key: "0-0-1",
            label: "Level 2 - Node 2",
          },
        ],
      },
      {
        key: "0-1",
        label: "Level 1 - Node 2",
        children: [
          {
            key: "0-1-0",
            label: "Level 2 - Node 3",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    label: "Root 2",
    children: [
      {
        key: "1-0",
        label: "Level 1 - Node 4",
      },
    ],
  },
];

function TreeView({ treeData, setActiveLeaf }) {
  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode node={node} key={node.key} setActiveLeaf={setActiveLeaf} />
      ))}
    </ul>
  );
}

function TreeNode({ node, setActiveLeaf }) {
  const { children, label } = node;

  const [showChildren, setShowChildren] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    if (children && children.length > 0) {
      setShowChildren(!showChildren);
    } else {
      console.log("first");
      setActiveLeaf(label);
      window.location.reload();
    }
  };

  useEffect(() => {
    const isOpen = localStorage.getItem(`menu-${label}`);
    const isActiveMenu = localStorage.getItem(`active-menu`);
    const isActiveLeaf = localStorage.getItem(`active-leaf`);

    setShowChildren(isOpen === "true");
    setIsActive(label === isActiveMenu || label === isActiveLeaf);
  }, [label]);

  useEffect(() => {
    localStorage.setItem(`menu-${label}`, showChildren);
    if (isActive) {
      localStorage.setItem(`active-menu`, label);
      localStorage.setItem(`active-leaf`, label);
    }
  }, [label, showChildren, isActive]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`text-black hover:text-black cursor-pointer flex mb-4 items-center ${
          isActive ? "font-bold" : ""
        }`}
      >
        {children && children.length > 0 && (
          <span className="mr-1">
            <AiOutlineRight
              size={13}
              className={`${showChildren ? "rotate-90" : ""}`}
            />
          </span>
        )}
        <span>{label}</span>
      </div>
      <ul className="border-l">
        {showChildren && (
          <TreeView treeData={children} setActiveLeaf={setActiveLeaf} />
        )}
      </ul>
    </>
  );
}

function CSVRenderer() {
  const [activeLeaf, setActiveLeaf] = useState(null);

  useEffect(() => {
    const storedActiveLeaf = localStorage.getItem(`active-leaf`);
    setActiveLeaf(storedActiveLeaf);
  }, []);

  return (
    <div>
      <TreeView treeData={treeData} setActiveLeaf={setActiveLeaf} />
      <p>Active Leaf: {activeLeaf}</p>
    </div>
  );
}

export default CSVRenderer;
