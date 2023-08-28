import React, { useState } from "react";
import { AiOutlineMergeCells } from "react-icons/ai";
import { Handle, Position } from "reactflow";

function AddModify({id, data}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]"
        onDoubleClick={() => {
          setVisible(!visible);
        }}
      >
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>

        <div className="grid place-items-center gap-1 p-2 py-3 min-w-[80px]">
          <AiOutlineMergeCells className="text-[rgba(0,0,0,1)]" size={"25"} />
          <span>Add/Modify</span>
        </div>
      </div>
      
    </>
  );
}

export default AddModify;
