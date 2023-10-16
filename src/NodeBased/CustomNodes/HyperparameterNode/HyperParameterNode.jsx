import React, { useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import UpdateHyperparameterNode from "../../UpdateNodes/UpdateHyperparameterNode/UpdateHyperparameterNode";
import { handleHyperParameter } from "../../../util/NodeFunctions";
import { useDispatch } from "react-redux";
import { setNodeType, setRightSidebarData } from "../../../Slices/SideBarSlice";

function HyperParameterNode({ id, data }) {
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
            rflow.getNode(edge.target).type === "Build Model"
        );
      temp.forEach(async (val) => {
        // console.log(temp)
        await handleHyperParameter(rflow, val);
      });
      // console.log(data)
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
        <div className="grid place-items-center gap-1 p-2 py-3 min-w-[80px] text-center">
          {/* <HiOutlinePuzzle size={"25"} /> */}
          <span>
            Hyperparameter <br /> Optimization
          </span>
        </div>
      </div>
      {data && data.testTrain && (
        <UpdateHyperparameterNode
          visible={visible}
          setVisible={setVisible}
          nodeData={data.testTrain}
          nodeId={id}
        />
      )}
    </>
  );
}

export default HyperParameterNode;
