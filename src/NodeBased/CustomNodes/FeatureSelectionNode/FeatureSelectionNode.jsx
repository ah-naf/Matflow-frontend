import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Position, useReactFlow } from "reactflow";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";
import { handleFeatureSelection } from "../../../util/NodeFunctions";
import UpdateFeatureSelectionNode from "../../UpdateNodes/UpdateFeatureSelectionNode/UpdateFeatureSelectionNode";

function FeatureSelectionNode({ id, data }) {
  const [visible, setVisible] = useState(false);
  const rflow = useReactFlow();
  const type = rflow.getNode(id).type;
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const temp = rflow
        .getEdges()
        .filter(
          (edge) =>
            edge.source === id &&
            (rflow.getNode(edge.target).type === "Table" ||
              rflow.getNode(edge.target).type === "Graph")
        );
      temp.forEach(async (val) => {
        await handleFeatureSelection(rflow, val);
      });
    })();
  }, [data]);

  return (
    <>
      <div
        className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]"
        onDoubleClick={() => {
          setVisible(!visible);
        }}
        onClick={() => {
          dispatch(setRightSidebarData(data));
          dispatch(setNodeType(type));
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
