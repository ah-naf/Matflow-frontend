import React from "react";
import { AiOutlineFile } from "react-icons/ai";
import { Handle, Position } from "reactflow";

function FileNode({ id, data }) {
  console.log(data);

  return (
    <div
      className={`flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)] `}
    >
      <Handle type="source" position={Position.Right}></Handle>
      <Handle type="target" position={Position.Left}></Handle>
      {!data || !data.file_name ? (
        <div className="grid place-items-center p-2">
          <AiOutlineFile className="text-black" size={30} />
          <p className="text-xs mt-1 text-center">
            Connect a node that <br /> returns a file
          </p>
        </div>
      ) : (
        <div className="grid place-items-center p-2 py-3 min-w-[100px]">
          <AiOutlineFile className="text-black" size={30} />
          <p className="text-light tracking-wide text-sm mt-1">
            {data.file_name}
          </p>
        </div>
      )}
    </div>
  );
}

export default FileNode;
