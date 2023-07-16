import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Handle, Position } from "reactflow";
import UpdateReverseMLNode from "../../UpdateNodes/UpdateReverseMLNode/UpdateReverseMLNode";

function ReverseMLNode({ id, data }) {
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
          <HiOutlinePuzzle className="text-[rgba(0,0,0,0.54)]" size={"25"} />
          <span>ReverseML</span>
        </div>
      </div>
      {data && data.table && <UpdateReverseMLNode visible={visible} setVisible={setVisible} csvData={data.table}  />}
    </>
  );
}

export default ReverseMLNode;
