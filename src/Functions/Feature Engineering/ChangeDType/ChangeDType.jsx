import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { setFile } from "../../../Slices/FeatureEngineeringSlice";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";

function ChangeDType() {
  const dispatch = useDispatch();
  const featureData = useSelector((state) => state.featureEngineering);
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [csvData, setCsvData] = useState();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const [columnNames, setColumnNames] = useState();

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
                  label="Current Dtype"
                  value={"number"}
                  disabled
                />
                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="">Desired Dtype</label>
                  <select className="p-2 py-3 rounded-xl" name="" id="">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="complex">complex</option>
                    <option value="str">str</option>
                  </select>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="">Desired Bit Length</label>
                  <select className="p-2 py-3 rounded-xl" name="" id="">
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                    <option value="256">256</option>
                  </select>
                </div>
              </div>
            );
          })}
      </div>
      <button
        className="self-start mt-12 border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2"
        //   onClick={handleSave}
      >
        Submit
      </button>
    </div>
  );
}

export default ChangeDType;
