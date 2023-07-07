import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";

const RESULT = [
  "Target Value",
  "Accuracy",
  "Precision",
  "Recall",
  "F1-Score",
  "Classification Report",
  "Confusion Matrix",
  "Actual vs. Predicted",
  "Precision-Recall Curve",
  "ROC Curve",
];

function ModelPrediction({ csvData }) {
  const [selectDataset, setSelectDataset] = useState();
  const [allDataset, setAllDataset] = useState();
  const [allModels, setAllModels] = useState();
  const [select_data, setSelectData] = useState();
  const [target_variable, setTargetVariable] = useState("Vertical");
  const [select_model, setSelectModel] = useState();
  const [currentModels, setCurrentModels] = useState();
  const [modelData, setModelData] = useState();
  const [result, setResult] = useState(RESULT[0]);
  const [data, setData] = useState();

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
    tempDatasets = tempDatasets.map((val) => {
      if (Object.keys(val)[0] === e) {
        return val[e];
      }
    })[0];
    setSelectData(tempDatasets[4]);
    // console.log(tempDatasets)
    setTargetVariable(tempDatasets[3]);
  };

  const handleModelChange = async (e) => {
    setSelectModel(e);
    let res = await fetchDataFromIndexedDB("models");
    res = res.map((val) => val[selectDataset])[0][e];
    console.log(res);
    setModelData(res);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/model_prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Target Variable": target_variable,
          model: modelData.metrics_table,
          file: csvData,
          Result: result,
          y_pred: modelData.y_pred,
          type: modelData.type,
          regressor: modelData.regressor,
        }),
      });

      const Data = await res.json();
      console.log(Data);
      setData({
        table: Data.table,
        graph: JSON.parse(Data.fig),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  if (!allDataset) return <div>Loading...</div>;
  if (!allModels || allModels.length === 0)
    return (
      <h1 className="mt-8 font-medium tracking-wider text-3xl">
        No Models Found...
      </h1>
    );
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
        <SingleDropDown
          columnNames={currentModels || []}
          onValueChange={(e) => handleModelChange(e)}
        />
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
      <div className="mt-4">
        <p>Result</p>
        <SingleDropDown
          columnNames={RESULT}
          initValue={RESULT[0]}
          onValueChange={setResult}
        />
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        onClick={handleSave}
      >
        Show Result
      </button>
      {data && (
        // <h1>{JSON.stringify(data.graph)}</h1>
        <div className="flex justify-center mt-4">
          <Plot
            data={data.graph.data}
            layout={{ ...data.graph.layout, showlegend: true }}
            config={{ scrollZoom: true, editable: true, responsive: true }}
          />
        </div>
      )}
    </div>
  );
}

export default ModelPrediction;
