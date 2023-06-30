import { Checkbox, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function ModelEvaluation() {
  const [display_type, setDisplayType] = useState("Graph");
  const [orientation, setOrientation] = useState("Vertical");
  const [test_dataset, setTestDataset] = useState();
  const [include_data, setIncludeData] = useState(false);
  const [display_result, setDisplayResult] = useState("Test");

  return (
    <div className="mt-8">
      <div>
        <p>Select Train Test Dataset</p>
        <SingleDropDown columnNames={["s"]} onValueChange={setTestDataset} />
      </div>
      <div className="flex items-end gap-8 mt-4">
        <div className="w-full">
          <p>Display Type</p>
          <SingleDropDown
            columnNames={["Graph", "Table"]}
            initValue={"Graph"}
            onValueChange={setDisplayType}
          />
        </div>
        <div className="w-full">
          {display_type === "Graph" ? (
            <div>
              <p>Select Orientation</p>
              <SingleDropDown
                columnNames={["Vertical", "Horizontal"]}
                initValue={"Vertical"}
                onValueChange={setOrientation}
              />
            </div>
          ) : (
            <div>
              <Checkbox
                color="success"
                onChange={(e) => setIncludeData(e.valueOf())}
              >
                Include Data
              </Checkbox>
            </div>
          )}
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
    </div>
  );
}

export default ModelEvaluation;
