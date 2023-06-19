import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { setDatasetName, setFile, setSaveAsNew } from "../../../Slices/FeatureEngineeringSlice";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";

function AlterFieldName() {
  const dispatch = useDispatch();
  const featureData = useSelector((state) => state.featureEngineering);
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [csvData, setCsvData] = useState();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const [columnNames, setColumnNames] = useState();
  const [savedAsNewDataset, setSavedAsNewDataset] = useState(false)

  useEffect(() => {
    if (activeCsvFile && activeCsvFile.name) {
      const getData = async () => {
        const res = await fetchDataFromIndexedDB(activeCsvFile.name);
        setCsvData(res);
        setColumnNames(Object.keys(res[0]));
        dispatch(setFile(res));
      };

      getData();
    }
  }, [activeCsvFile, dispatch]);

  return (
    <div className="my-8">
      <div className="flex gap-4 max-w-3xl items-center">
        <div className="basis-2/3">
          <Input
            label="Number of columns"
            value={numberOfColumns}
            onChange={(e) => setNumberOfColumns(e.target.value)}
            type="number"
            step={1}
            fullWidth
          />
        </div>
        <div className="basis-1/3">
          <Checkbox color="success">Add to pipeline</Checkbox>
        </div>
      </div>
      <div className="mt-8">
        {csvData &&
          Array.from({ length: numberOfColumns }, (_, index) => {
            return (
              <div key={index} className="flex items-end gap-8 mt-6">
                <div className="w-full">
                  <p>Column {index + 1}</p>
                  <SingleDropDown columnNames={columnNames} />
                </div>
                <Input
                  fullWidth
                  label="New Field Name"
                  placeholder="New name."
                />
              </div>
            );
          })}
      </div>
      <div className="mt-8 flex flex-col gap-4">
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

export default AlterFieldName;
