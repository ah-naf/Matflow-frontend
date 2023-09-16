import React from "react";
import { Handle, Position } from "reactflow";

function ModelNode({ id, data }) {
  console.log(data);
  return (
    <>
      <div
        className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]"
        // onDoubleClick={() => {
        //   setVisible(!visible);
        // }}
      >
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>

        <div className="grid place-items-center gap-1 p-2 py-3 min-w-[80px]">
          {/* <RiFileEditLine size={"25"} /> */}
          {data && data.model ? (
            <span>{data.model.name}</span>
          ) : (
            <span>Model</span>
          )}
        </div>
      </div>
    </>
  );
}

export default ModelNode;
