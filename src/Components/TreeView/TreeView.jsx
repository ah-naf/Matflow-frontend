import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setActiveFunction } from "../../Slices/SideBarSlice";

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
  const { children, label, icon } = node;
  const dispatch = useDispatch();

  const [showChildren, setShowChildren] = useState(false);
  const [isActive, setIsActive] = useState({
    active: false,
    leaf: false,
  });

  const handleClick = () => {
    if (children && children.length > 0) {
      setShowChildren(!showChildren);
      setIsActive({ active: true, leaf: false });
    } else {
      setActiveLeaf(label);
      //   window.location.reload()
      setIsActive({ active: true, leaf: true });
      dispatch(setActiveFunction(label));
    }
  };

  useEffect(() => {
    const isOpen = localStorage.getItem(`menu-${label}`);
    const isActiveMenu = localStorage.getItem(`active-menu`);
    const isActiveLeaf = localStorage.getItem(`activeFunction`);
    dispatch(setActiveFunction(label));

    setShowChildren(isOpen === "true");
    setIsActive(label === isActiveMenu || label === isActiveLeaf);
  }, [label, dispatch]);

  useEffect(() => {
    localStorage.setItem(`menu-${label}`, showChildren);
    if (isActive) {
      localStorage.setItem(`active-menu`, label);
      if (isActive.leaf) localStorage.setItem(`activeFunction`, label);
      dispatch(setActiveFunction(label));
    }
  }, [label, showChildren, isActive, dispatch]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`text-gray-200 hover:text-white cursor-pointer flex mb-4 items-center ${
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
        {icon && <span className="mr-2">{icon}</span>}
        <span className="tracking-wider capitalize">{label}</span>
      </div>
      <ul className="border-l border-slate-400">
        {showChildren && (
          <TreeView treeData={children} setActiveLeaf={setActiveLeaf} />
        )}
      </ul>
    </>
  );
}

export default TreeView;
