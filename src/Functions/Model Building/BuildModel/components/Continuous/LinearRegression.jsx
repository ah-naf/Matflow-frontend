import { Checkbox, Input } from "@nextui-org/react";
import React from "react";
import MultipleDropDown from "../../../../../Components/MultipleDropDown/MultipleDropDown";

const DISPLAY_METRICES = [
  "R-Squared",
  "Mean Absolute Error",
  "Mean Squared Error",
  "Root Mean Squared Error",
];

function LinearRegression() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium tracking-wide mb-2">
          Hyperparameter Optimization Settings
        </h1>
        <div className="flex gap-4 items-center">
          <div className="w-full">
            <p className="mb-1">Number of cross-validation folds</p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
          <div className="w-full">
            <p className="mb-1">Random state for hyperparameter search</p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
        </div>
        <button
          className="self-start border-2 px-4 tracking-wider border-primary-btn text-black font-medium text-sm rounded-md py-2 mt-6"
          // onClick={handleSave}
        >
          Run Optimization
        </button>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-medium tracking-wide mb-3">
          Model Settings
        </h1>
        <div className="flex items-center gap-8">
          <Input
            fullWidth
            label="Number of jobs"
            bordered
            value={-1}
            type="number"
            color="success"
          />
          <Checkbox defaultSelected color="success" className="w-[30%]">
            Fit Intercept
          </Checkbox>
        </div>
        <div className="mt-4">
          <p className="mb-2">Display Metrices</p>
          <MultipleDropDown
            columnNames={DISPLAY_METRICES}
            defaultValue={DISPLAY_METRICES}
          />
        </div>
      </div>
    </div>
  );
}

export default LinearRegression;
