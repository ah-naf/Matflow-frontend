import React, { useEffect, useState } from "react";
import { AiOutlineGroup } from "react-icons/ai";
import { Handle, Position, useReactFlow } from "reactflow";
import { handleDatasetGroup } from "../../../util/NodeFunctions";
import UpdateGroupNode from "../../UpdateNodes/UpdateGroupNode/UpdateGroupNode";
import { useDispatch } from "react-redux";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";

function GroupNode({ id, data }) {
  // console.log(data);
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
            rflow.getNode(edge.target).type === "Table"
        );
      temp.forEach(async (val) => {
        await handleDatasetGroup(rflow, val);
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
          <AiOutlineGroup size={25} />
          <span>Group</span>
        </div>
      </div>
      {data && data.table && (
        <UpdateGroupNode
          visible={visible}
          setVisible={setVisible}
          csvData={data.table}
          nodeId={id}
        />
      )}
    </>
  );
}

export default GroupNode;
