import React, { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { Handle, Position } from "reactflow";
import UpdateAddModifyNode from "../../UpdateNodes/UpdateAddModifyNode/UpdateAddModifyNode";

function AddModify({ id, data }) {
  console.log(data);
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
          <RiFileEditLine className="text-[rgba(0,0,0,0.54)]" size={"25"} />
          <span>Add/Modify</span>
        </div>
      </div>
      {data && data.table && (
        <UpdateAddModifyNode
          visible={visible}
          setVisible={setVisible}
          nodeId={id}
          csvData={data.table}
        />
      )}
    </>
  );
}

export default AddModify;
