import { Radio } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";

function ModelPrediction() {
  const [selectDataset, setSelectDataset] = useState();
  const [allDataset, setAllDataset] = useState();
  const [allModels, setAllModels] = useState();
  const [select_data, setSelectData] = useState();
  const [target_variable, setTargetVariable] = useState("Vertical");
  const [select_model, setSelectModel] = useState();
  const [include_data, setIncludeData] = useState(false);
  const [display_result, setDisplayResult] = useState("Test");
  const [currentModels, setCurrentModels] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let tempDatasets = await fetchDataFromIndexedDB("splitted_dataset");
      tempDatasets = tempDatasets.map((val) => Object.keys(val)[0]);
      setAllDataset(tempDatasets);

      let tempModels = await fetchDataFromIndexedDB("models");
      setAllModels(tempModels);
    };

    fetchData();
  }, []);

  const handleSelectDataset = async (e) => {
    setSelectDataset(e);
    const temp = allModels.map((val) => {
      if (Object.keys(val)[0] === e) {
        return val[e];
      }
    })[0];
    setCurrentModels(Object.keys(temp));
    let tempDatasets = await fetchDataFromIndexedDB("splitted_dataset");
    tempDatasets = tempDatasets.map(val => {
      if(Object.keys(val)[0] === e) {
        return val[e]
      }
    })[0]
    setSelectData(tempDatasets[4])
    // console.log(tempDatasets)
    setTargetVariable(tempDatasets[3])
  };

  if (!allDataset) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <div className="mb-4">
        <p>Select Test Train Dataset</p>
        <SingleDropDown
          columnNames={allDataset}
          onValueChange={(e) => handleSelectDataset(e)}
        />
      </div>
      <div>
        <p>Select Model</p>
        <SingleDropDown columnNames={currentModels || []} onValueChange={setSelectModel} />
      </div>
      <div className="flex items-end gap-8 mt-4">
        <div className="w-full">
          <p>Select Data</p>
          <SingleDropDown
            columnNames={select_data ? [select_data] : []}
            initValue={select_data}
            onValueChange={setSelectData}
          />
        </div>
        <div className="w-full">
          <p>Target Variable</p>
          <SingleDropDown
            columnNames={target_variable ? [target_variable] : []}
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
        <SingleDropDown columnNames={["s"]} />
      </div>
    </div>
  );
}

export default ModelPrediction;
