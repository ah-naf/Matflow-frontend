import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../FunctionBased/Components/SingleDropDown/SingleDropDown";
import Add_ExtractText from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Add_ExtractText";
import Add_GroupCategorical from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Add_GroupCategorical";
import Add_GroupNumerical from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Add_GroupNumerical";
import Add_MathOperation from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Add_MathOperation";
import Add_NewColumn from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Add_NewColumn";
import Modify_ProgressApply from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Modify_ProgressApply";
import Modify_ReplaceValue from "../../../FunctionBased/Functions/Feature Engineering/AddModify/Component/Modify_ReplaceValue";
import { setMethod } from "../../../Slices/FeatureEngineeringSlice";
import { useDispatch } from "react-redux";

function UpdateAddModifyNode({ visible, setVisible, csvData, nodeId }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [option, setOption] = useState("Add");
  const [column_name, setColumnName] = useState("");
  const [currentMethod, setCurrentMethod] = useState("New Column");
  const dispatch = useDispatch()

  return (
    <div>
      <Dialog
        open={visible}
        onClose={() => setVisible(false)}
        fullScreen={fullScreen}
        scroll="paper"
      >
        <span
          className="ml-auto p-2 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <CloseIcon color="action" />
        </span>
        <h1 className="text-center font-medium tracking-wider text-3xl">
          Edit Add/Modify Options
        </h1>
        <div className="min-w-[600px] mx-auto w-full p-6 py-4 space-y-4">
          <div>
            <p>Option</p>
            <SingleDropDown
              columnNames={["Add", "Modify"]}
              initValue={option}
              onValueChange={e => {
                setOption(e)
                
              }}
            />
          </div>
          <Input
            fullWidth
            label="New Column Name"
            value={column_name}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <div>
            <p>Method</p>
            <select
              name=""
              id="method"
              className="py-[0.6rem] rounded-xl px-3 w-full"
              value={currentMethod}
              onChange={(e) => {
                setCurrentMethod(e.target.value);
                dispatch(setMethod(e.target.value));
              }}
            >
              {option === "Add" && (
                <option value="New Column">New Column</option>
              )}
              <option value="Math Operation">Math Operation</option>
              <option value="Extract Text">Extract Text</option>
              <option value="Group Categorical">Group Categorical</option>
              <option value="Group Numerical">Group Numerical</option>
              {option === "Modify" && (
                <>
                  <option value="Replace Values">Replace Values</option>
                  <option value="Progress Apply">Progress Apply</option>
                </>
              )}
            </select>
          </div>
          <div className="mt-12">
            {csvData && currentMethod === "New Column" && (
              <Add_NewColumn csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Math Operation" && (
              <Add_MathOperation csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Extract Text" && (
              <Add_ExtractText csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Group Categorical" && (
              <Add_GroupCategorical csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Group Numerical" && (
              <Add_GroupNumerical csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Replace Values" && (
              <Modify_ReplaceValue csvData={csvData} type="node" />
            )}
            {csvData && currentMethod === "Progress Apply" && (
              <Modify_ProgressApply csvData={csvData} type="node" />
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t-2 shadow-md border-gray-200 flex items-center gap-4 w-full justify-end px-6 py-3 pt-6 mt-4 z-[100]">
          <button
            className="font-medium border-2 p-2 px-4 text-lg tracking-wider border-gray-500 rounded"
            onClick={() => {
              setVisible(false);
            }}
          >
            Close
          </button>
          <button
            className="font-medium border-2 p-2 px-4 text-lg tracking-wider bg-black text-white rounded"
            onClick={() => {
              //   handleSave();
              setVisible(false);
            }}
          >
            Save
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default UpdateAddModifyNode;
