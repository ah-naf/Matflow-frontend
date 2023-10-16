import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { Handle, Position, useReactFlow } from "reactflow";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";

function InformationNode({ id, data }) {
  const rflow = useReactFlow();
  const type = rflow.getNode(id).type;
  const dispatch = useDispatch();
  
  return (
    <div
      className="flex bg-white border-2 border-black shadow-[6px_6px_0_1px_rgba(0,0,0,0.7)]"
      onClick={() => {
        dispatch(setRightSidebarData(data));
        dispatch(setNodeType(type));
      }}
    >
      <Handle type="source" position={Position.Right}></Handle>
      <Handle type="target" position={Position.Left}></Handle>
      <div className="grid place-items-center gap-1 p-2 py-3 min-w-[80px]">
        <InfoOutlinedIcon />
        <span>Information</span>
      </div>
    </div>
  );
}

export default InformationNode;
