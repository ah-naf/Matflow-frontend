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
  const [imputationNotExist, setImputationNotExist] = useState(false);
  const [nullVar, setNullVar] = useState([]);
  const [select_column, setSelectColumn] = useState();
  const [group_by, setGroupBy] = useState([]);
  const [strategy, setStrategy] = useState([]);
  const [activeStrategy, setActiveStrategy] = useState();

  useEffect(() => {
    (async function () {
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
      console.log(data);
      if (!data.null_var || data.null_var.length === 0)
        setImputationNotExist(true);

      setNullVar(data.null_var);
      setGroupBy(data.group_by);
    })();
  }, [csvData]);

  const handleSave = () => {};

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
    console.log(data);
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
      {(activeStrategy === "mean" || activeStrategy === "median") && (
        <div className="">
          <p>Group By</p>
          <SingleDropDown columnNames={group_by} />
        </div>
      )}
      {activeStrategy === "constant" && (
        <Input
          label="Value"
          type="number"
          step={0.01}
          fullWidth
          value={0.0}
          bordered
        />
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
