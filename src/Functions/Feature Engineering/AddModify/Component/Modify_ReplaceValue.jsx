import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../../Components/SingleDropDown/SingleDropDown";

function Modify_ReplaceValue({ csvData }) {
  const columnNames = Object.keys(csvData[0]);
  const [subMethod, setSubMethod] = useState("Text Input");
  const [fillNullMethod, setFillNullMethod] = useState("Custom Value");
  const [stringOperationMethod, setStringOperationMethod] =
    useState("Uppercase");
  return (
    <div>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Sub Methods</label>
        <select
          name=""
          id=""
          value={subMethod}
          className="px-2 py-3 rounded-lg"
          onChange={(e) => setSubMethod(e.target.value)}
        >
          <option value="Text Input">Text Input</option>
          <option value="Numpy Operations">Numpy Operations</option>
          <option value="Fill Null">Fill Null</option>
          <option value="String Operations">String Operations</option>
        </select>
      </div>
      <div className="my-8">
        {subMethod === "Text Input" && (
          <>
            <Input fullWidth label="Old Value" className="mb-3" />
            <Input label="New Value" fullWidth />
          </>
        )}
        {subMethod === "Numpy Operations" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="">Select an operation</label>
            <select name="" id="" className="px-2 py-3 rounded-lg">
              <option value="np.log10">np.log10</option>
              <option value="np.sin">np.sin</option>
              <option value="np.cos">np.cos</option>
              <option value="np.tan">np.tan</option>
              <option value="np.exp">np.exp</option>
            </select>
          </div>
        )}
        {subMethod === "Fill Null" && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Select method to fill null values</label>
              <select
                name=""
                id=""
                className="px-2 py-3 rounded-lg"
                value={fillNullMethod}
                onChange={(e) => setFillNullMethod(e.target.value)}
              >
                <option value="Custom Value">Custom Value</option>
                <option value="Mean">Mean</option>
                <option value="Median">Median</option>
                <option value="Mode">Mode</option>
                <option value="From Another Column">From Another Column</option>
              </select>
            </div>
            <div className="mt-4">
              {fillNullMethod === "Custom Value" && (
                <Input fullWidth label="Enter Custom Value" />
              )}
              {fillNullMethod === "From Another Column" && (
                <div>
                  <p>Select column</p>
                  <SingleDropDown columnNames={columnNames} />
                </div>
              )}
            </div>
          </>
        )}
        {subMethod === "String Operations" && (
          <>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="">Select an operation</label>
              <select
                name=""
                id=""
                className="px-2 py-3 rounded-lg"
                value={stringOperationMethod}
                onChange={(e) => setStringOperationMethod(e.target.value)}
              >
                <option value="Uppercase">Uppercase</option>
                <option value="Lowercase">Lowercase</option>
                <option value="Title case">Title case</option>
                <option value="Strip leading/trailing whitespace">
                  Strip leading/trailing whitespace
                </option>
                <option value="Remove leading whitespace">
                  Remove leading whitespace
                </option>
                <option value="Remove trailing whitespace">
                  Remove trailing whitespace
                </option>
                <option value="Remove Characters">Remove Characters</option>
              </select>
            </div>
            {stringOperationMethod === 'Remove Characters' && <Input fullWidth label="Enter character to remove" />}
          </>
        )}
      </div>
    </div>
  );
}

export default Modify_ReplaceValue;
