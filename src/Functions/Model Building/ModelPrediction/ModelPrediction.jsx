import { Radio } from "@nextui-org/react";
import React, { useState } from "react";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function ModelPrediction() {
  const [select_data, setSelectData] = useState();
  const [target_variable, setTargetVariable] = useState("Vertical");
  const [select_model, setSelectModel] = useState();
  const [include_data, setIncludeData] = useState(false);
  const [display_result, setDisplayResult] = useState("Test");

  return (
    <div className="mt-8">
      <div>
        <p>Select Model</p>
        <SingleDropDown columnNames={["s"]} onValueChange={setSelectModel} />
      </div>
      <div className="flex items-end gap-8 mt-4">
        <div className="w-full">
          <p>Select Data</p>
          <SingleDropDown
            columnNames={["S", "T"]}
            initValue={"S"}
            onValueChange={setSelectData}
          />
        </div>
        <div className="w-full">
          <p>Target Variable</p>
          <SingleDropDown
            columnNames={["date"]}
            onValueChange={setTargetVariable}
          />
        </div>
      </div>
      <div className="mt-6">
        <Radio.Group
          orientation="horizontal"
          label="Display Result"
          defaultValue={display_result}
          onChange={(e) => setDisplayResult(e)}
        >
          <Radio value="All" color="success">
            All
          </Radio>
          <Radio value="Train" color="success">
            Train
          </Radio>
          <Radio value="Test" color="success">
            Test
          </Radio>
          <Radio value="Custom" color="success">
            Custom
          </Radio>
        </Radio.Group>
      </div>
      {display_result === "Custom" && (
        <div className="mt-4">
          <p>Columns</p>
          <MultipleDropDown columnNames={["s", "a"]} />
        </div>
      )}
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
      >
        Show Result
      </button>
      <div className="mt-4">
        <p>Result</p>
        <SingleDropDown columnNames={['s']} />
      </div>
    </div>
  );
}

export default ModelPrediction;
