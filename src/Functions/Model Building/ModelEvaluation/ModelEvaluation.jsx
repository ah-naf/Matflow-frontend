import { Checkbox, Radio } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import MultipleDropDown from "../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";

function ModelEvaluation() {
  const [display_type, setDisplayType] = useState("Table");
  const [orientation, setOrientation] = useState("Vertical");
  const [test_dataset, setTestDataset] = useState();
  const [include_data, setIncludeData] = useState(false);
  const [display_result, setDisplayResult] = useState("Test");
  const [allDatasetName, setAllDatasetName] = useState();
  const [columnName, setColumnName] = useState();
  const [file, setFile] = useState();
  const [selectedColumn, setSelectedColumn] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let tempDatasetName = await fetchDataFromIndexedDB("splitted_dataset");
      tempDatasetName = tempDatasetName.map((val) => Object.keys(val)[0]);
      setAllDatasetName(tempDatasetName);
    };
    fetchData();
  }, []);

  const handleChangeDataset = async (e) => {
    setTestDataset(e);
    let tempModels = await fetchDataFromIndexedDB("models");
    tempModels = tempModels.map((val) => {
      if (Object.keys(val)[0] === e) {
        return val[e];
      }
    })[0];
    const keys = Object.keys(tempModels);
    const temp = keys.map((val) => {
      return { ...tempModels[val], name: val };
    });
    setColumnName(Object.keys(temp[0]));
    setFile(temp);
  };

  useEffect(() => {
    if (display_type === "Graph") {
      const fetchData = async () => {
        try {
          const res = await fetch(
            "http://127.0.0.1:8000/api/model_evaluation/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                file,
                'Display Type': display_type,
                'Display Result': display_result,
                'Select Orientation': orientation,
                'Columns': selectedColumn
              }),
            }
          );
          const data = await res.json()
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [display_type, display_result, file, orientation, selectedColumn]);

  if (!allDatasetName) return <div>Loading...</div>;
  return (
    <div className="mt-8">
      <div>
        <p>Select Train Test Dataset</p>
        <SingleDropDown
          columnNames={allDatasetName}
          onValueChange={(e) => handleChangeDataset(e)}
        />
      </div>
      <div className="flex items-end gap-8 mt-4">
        <div className="w-full">
          <p>Display Type</p>
          <SingleDropDown
            columnNames={["Graph", "Table"]}
            initValue={"Table"}
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
          <MultipleDropDown
            columnNames={columnName}
            setSelectedColumns={setSelectedColumn}
          />
        </div>
      )}
    </div>
  );
}

export default ModelEvaluation;
