import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setDatasetName,
  setSaveAsNew,
} from "../../../../Slices/FeatureEngineeringSlice";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function Imputation({ csvData }) {
  const [savedAsNewDataset, setSavedAsNewDataset] = useState(false);
  const dispatch = useDispatch();
  const [imputationNotExist, setImputationNotExist] = useState(true);
  const [nullVar, setNullVar] = useState([]);
  const [select_column, setSelectColumn] = useState();
  const [group_by, setGroupBy] = useState([]);
  const [strategy, setStrategy] = useState([]);
  const [activeStrategy, setActiveStrategy] = useState();
  const [catData, setCatData] = useState();
  const [option, setOption] = useState("Select Mode");
  const [constant, setConstant] = useState(0);
  const [fill_group, setFillGroup] = useState();

  useEffect(() => {
    setImputationNotExist(true);
    setNullVar([]);
    setStrategy(null);
    setActiveStrategy();

    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/imputation_data1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: csvData,
        }),
      });

      const data = await res.json();
      // console.log(data);
      if (!data.null_var || data.null_var.length === 0)
        setImputationNotExist(true);
      else setImputationNotExist(false);
      setNullVar(data.null_var);
    };
    fetchData();
  }, [csvData]);

  const handleSave = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/imputation_result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: csvData,
        Select_columns: select_column,
        strategy: activeStrategy,
        fill_group,
        constant,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const handleSelectColumn = async (e) => {
    if (typeof csvData[0][e] === "number")
      setStrategy(["mean", "median", "constant"]);
    else setStrategy(["mode", "value"]);
    setSelectColumn(e);

    const res = await fetch("http://127.0.0.1:8000/api/imputation_data2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: csvData,
        Select_columns: e,
      }),
    });

    const data = await res.json();
    // console.log(data);

    setGroupBy(data.group_by);
    setCatData(data);
    setConstant(0);
  };

  if (imputationNotExist)
    return (
      <h1 className="my-8 text-3xl font-medium">Imputation doesn't exist</h1>
    );

  return (
    <div className="my-8 space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-grow">
          <p>Select Columns</p>
          <SingleDropDown
            columnNames={nullVar}
            onValueChange={(e) => handleSelectColumn(e)}
          />
        </div>
        <Checkbox label="Add to pipeline" color="success" />
      </div>
      <div className="">
        <p>Strategy</p>
        <SingleDropDown
          columnNames={strategy}
          onValueChange={setActiveStrategy}
        />
      </div>

      {strategy && (
        <>
          {(activeStrategy === "mean" || activeStrategy === "median") && (
            <div className="">
              <p>Group By</p>
              <SingleDropDown
                columnNames={group_by}
                onValueChange={setFillGroup}
              />
            </div>
          )}
          {activeStrategy === "mode" && (
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <p>Options</p>
                <SingleDropDown
                  columnNames={["Select Mode", "Group Mode"]}
                  onValueChange={setOption}
                  initValue={option}
                />
              </div>
              {option === "Select Mode" ? (
                <div className="w-full">
                  <p>Mode Value</p>
                  <SingleDropDown
                    columnNames={Object.values(catData.mode)}
                    onValueChange={setFillGroup}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <p>Group By</p>
                  <SingleDropDown
                    columnNames={group_by}
                    onChange={setFillGroup}
                  />
                </div>
              )}
            </div>
          )}
          {(activeStrategy === "constant" || activeStrategy === "value") && (
            <Input
              label="Value"
              type="number"
              step={0.01}
              fullWidth
              value={constant}
              onChange={(e) => setConstant(e.target.value)}
              bordered
            />
          )}
        </>
      )}
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
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Imputation;
