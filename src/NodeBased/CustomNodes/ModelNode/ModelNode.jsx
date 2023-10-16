import { Download, DownloadDone } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { Handle, Position, useReactFlow } from "reactflow";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";

function ModelNode({ id, data }) {
  const rflow = useReactFlow();
  const type = rflow.getNode(id).type;
  const dispatch = useDispatch();

  return (
    <>
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
          {/* <RiFileEditLine size={"25"} /> */}
          {data && data.model ? (
            <span>{data.model.name}</span>
          ) : (
            <span>Model</span>
          )}
          {data && data.model && (
            <div className="mx-auto">
              <button className="border-2 border-gray-600 rounded shadow px-1 hover:bg-black hover:border-black hover:text-white" title="Download Model">
                <Download fontSize="small" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ModelNode;
