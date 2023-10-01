import React, { useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import UpdateFeatureSelectionNode from "../../UpdateNodes/UpdateFeatureSelectionNode/UpdateFeatureSelectionNode";

function FeatureSelectionNode({ id, data }) {
  console.log(data);
  const [visible, setVisible] = useState(false);
  const rflow = useReactFlow();

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
          {/* <HiOutlinePuzzle size={"25"} /> */}
          <span>Feature Selection</span>
        </div>
      </div>
      {data && data.table && (
        <UpdateFeatureSelectionNode
          visible={visible}
          setVisible={setVisible}
          csvData={data.table}
          nodeId={id}
        />
      )}
    </>
  );
}

export default FeatureSelectionNode;
