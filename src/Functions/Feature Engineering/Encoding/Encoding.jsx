import { Checkbox } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

const Method = ["Ordinal Encoding", "One-Hot Encoding", "Target Encoding"];

function Encoding({ csvData }) {
  const allStringColumn = Object.keys(csvData[0]).filter(
    (val) => typeof csvData[0][val] === "string"
  );
  const allNumberColumn = Object.keys(csvData[0]).filter(
    (val) => typeof csvData[0][val] === "number"
  );
  const [stringColumn, setStringColumn] = useState(allStringColumn[0]);
  const [method, setMethod] = useState(Method[0]);
  const [add_to_pipeline, setAddToPipeline] = useState(false);
  const [stringValues, setStringValues] = useState();

  useEffect(() => {
    if (method === Method[0]) {
      let temp = csvData.map((val) => val[stringColumn]);
      temp = new Set(temp);
      temp = [...temp];
      setStringValues(temp);
    }
  }, [method, stringColumn, csvData]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-8">
        <div className="w-full">
          <p>Select Column</p>
          <SingleDropDown
            columnNames={allStringColumn}
            onValueChange={setStringColumn}
          />
        </div>
        <div className="w-full">
          <p>Select Method</p>
          <SingleDropDown columnNames={Method} onValueChange={setMethod} />
        </div>
        <Checkbox
          color="success"
          className="w-full"
          onChange={(e) => setAddToPipeline(e.valueOf())}
        >
          Add To Pipeline
        </Checkbox>
      </div>

      {method === "Ordinal Encoding" && (
        <div className="mt-8">
          <div className="flex items-center gap-12">
            <Checkbox color="success">Start from 0</Checkbox>
            <Checkbox color="success">Include NaN</Checkbox>
            <Checkbox color="success">Sort Values</Checkbox>
          </div>
          <div className="mt-4">
            <p>Set Value Order</p>
            <MultipleDropDown
              columnNames={stringValues}
              setSelectedColumns={setStringColumn}
            />
          </div>
        </div>
      )}

      {method === "One-Hot Encoding" && (
        <div className="mt-4">
          <Checkbox color="success" className="mt-4">
            Drop First
          </Checkbox>
        </div>
      )}

      {method === "Target Encoding" && (
        <div className="mt-4">
          <p>Select Target</p>
          <SingleDropDown columnNames={allNumberColumn} />
        </div>
      )}

      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
      >
        Submit
      </button>
    </div>
  );
}

export default Encoding;
