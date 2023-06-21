import { Checkbox, Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import {
  setDatasetName,
  setSaveAsNew,
} from "../../../Slices/FeatureEngineeringSlice";

function DropRow({ csvData }) {
  const [defaultValue, setDefaultValue] = useState("With Null");
  const allColumns = Object.keys(csvData[0]);
  const [selectedColumns, setSelectedColumns] = useState();
  const [savedAsNewDataset, setSavedAsNewDataset] = useState(false);
  const dispatch = useDispatch();
  const [add_to_pipeline, setAddToPipeline] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <p>Default Value</p>
          <div>
            <Radio.Group
              orientation="horizontal"
              defaultValue="With Null"
              color="success"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e)}
            >
              <Radio value="With Null">With Null</Radio>
            </Radio.Group>
          </div>
        </div>
        <Checkbox
          color="success"
          className="w-full"
          onChange={(e) => setAddToPipeline(e.valueOf())}
        >
          Add To Pipeline
        </Checkbox>
      </div>
      <div className="mt-4">
        <p>Select Columns</p>
        <MultipleDropDown
          columnNames={allColumns}
          setSelectedColumns={setSelectedColumns}
          defaultValue={selectedColumns}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Checkbox
          color="success"
          onChange={(e) => {
            setSavedAsNewDataset(e.valueOf());
            dispatch(setSaveAsNew(e.valueOf()));
          }}
        >
          Save as New Dataset
        </Checkbox>
        {savedAsNewDataset && (
          <div>
            <Input
              label="New Dataset Name"
              fullWidth
              clearable
              onChange={(e) => {
                dispatch(setDatasetName(e.target.value));
              }}
            />
          </div>
        )}
        <button
          className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2"
          //   onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default DropRow;
