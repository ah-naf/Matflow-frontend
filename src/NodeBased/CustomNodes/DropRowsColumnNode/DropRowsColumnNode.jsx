import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Position, useReactFlow } from "reactflow";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";
import { handleDropRowColumn } from "../../../util/NodeFunctions";
import UpdateDropRowsColumnNode from "../../UpdateNodes/UpdateDropRowsColumnNode/UpdateDropRowsColumnNode";

function DropRowsColumnNode({ id, data }) {
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
            rflow.getNode(edge.target).type === "Upload File"
        );
      temp.forEach(async (val) => {
        await handleDropRowColumn(rflow, val);
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
          <RemoveCircleOutlineOutlinedIcon />
          <span>Drop Column/Row</span>
        </div>
      </div>
      {data && data.table && (
        <UpdateDropRowsColumnNode
          visible={visible}
          setVisible={setVisible}
          nodeId={id}
          csvData={data.table}
        />
      )}
    </>
  );
}

export default DropRowsColumnNode;
