import { Input, Radio } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";
import MultipleDropDown from "../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";

function ModelDeployment({ csvData }) {
  const allColumnNames = Object.keys(csvData[0]);
  const [splitted_datasets, setSplittedDatasets] = useState();
  const [datasetsName, setDatasetNames] = useState();
  const [allModels, setAllModels] = useState();
  const [modelNames, setModelsNames] = useState();
  const [current_dataset, setCurrentDataset] = useState();
  const [select_columns, setSelectColumns] = useState("all");
  const [filtered_column, setFilteredColumn] = useState(allColumnNames);
  const [train_data, setTrainData] = useState();
  const [target_val, setTargetVal] = useState();
  const [current_model, setCurrentModel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDataFromIndexedDB("models");
      const sp_data = await fetchDataFromIndexedDB("splitted_dataset");
      const tempDatasets = res.map((val) => Object.keys(val)[0]);
      setDatasetNames(tempDatasets);
      setAllModels(res);
      setCurrentModel(res[0]);
      setSplittedDatasets(sp_data);
    };
    fetchData();
  }, []);

  const handleDatasetChange = async (name) => {
    setCurrentDataset(name);
    const sp_ind = splitted_datasets.findIndex((obj) => name in obj);
    const res = allModels.map((val) => val[name]);
    const ind = allModels.findIndex((obj) => name in obj);
    if (ind !== -1) {
      const tempModel = Object.keys(allModels[ind][name]);
      if (tempModel.length > 0) setModelsNames(tempModel);
    }
    if (sp_ind !== -1) {
      setTargetVal(splitted_datasets[sp_ind][name][3]);
      const train = await fetchDataFromIndexedDB(
        splitted_datasets[sp_ind][name][1]
      );
      setTrainData(train);
    }
  };

  if (!datasetsName || datasetsName.length === 0)
    return (
      <div className="mt-8 font-semibold tracking-wide text-2xl">
        Split a dataset first...
      </div>
    );

  return (
    <div className="my-8">
      <div>
        <p>Select Test Train Dataset</p>
        <SingleDropDown
          columnNames={datasetsName}
          onValueChange={(e) => handleDatasetChange(e)}
        />
      </div>
      {modelNames && modelNames.length && (
        <>
          <div className="mt-4">
            <p>Select Model</p>
            <SingleDropDown
              columnNames={modelNames}
              onValueChange={setCurrentModel}
              initValue={current_model}
            />
          </div>
          <div className="mt-4">
            <Radio.Group
              label="Select Columns"
              orientation="horizontal"
              color="success"
              defaultValue={select_columns}
              onChange={(e) => {
                if (e === "all") setFilteredColumn(allColumnNames);
                else setFilteredColumn([]);
                setSelectColumns(e);
              }}
            >
              <Radio value="all">All Columns</Radio>
              <Radio value="custom">Custom Columns</Radio>
            </Radio.Group>
          </div>
          {select_columns === "custom" && (
            <div className="mt-4">
              <p>Custom Columns</p>
              <MultipleDropDown
                columnNames={allColumnNames}
                setSelectedColumns={(e) => setFilteredColumn(e)}
              />
            </div>
          )}
          {filtered_column && filtered_column.length > 0 && (
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div className="mt-4">
                <h3 className="font-medium text-2xl tracking-wide mb-4">
                  Input Values
                </h3>
                <div className="flex flex-col gap-4">
                  {filtered_column.map((val, ind) => (
                    <div key={ind}>
                      <Input
                        label={val}
                        value={0}
                        fullWidth
                        type="number"
                        size="lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {current_dataset && (!modelNames || modelNames.length === 0) && (
        <h1 className="mt-4 font-medium text-xl tracking-wide">
          Build a model first
        </h1>
      )}
    </div>
  );
}

export default ModelDeployment;
