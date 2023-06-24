import { Checkbox, Input } from "@nextui-org/react";
import React from "react";
import MultipleDropDown from "../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../Components/SingleDropDown/SingleDropDown";

const DISPLAY_METRICES = [
  "R-Squared",
  "Mean Absolute Error",
  "Mean Squared Error",
  "Root Mean Squared Error",
];

const SOLVER = ["auto", "svd", "cholesky", "lsqr", "sparse_cg", "sag", "saga"];

function RidgeRegression() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium tracking-wide mb-2">
          Hyperparameter Optimization Settings
        </h1>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="w-full">
            <p className="mb-1">
              Number of iterations for hyperparameter search
            </p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
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
        <div className="grid grid-cols-3 gap-8">
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Alpha"
            value={1}
            step={0.1}
          />
          <Input
            fullWidth
            type="number"
            value={1000}
            bordered
            color="success"
            label="Max Iterations"
          />
          <Input
            fullWidth
            bordered
            color="success"
            type="number"
            value={0.0}
            step={0.01}
            label="Tolerance"
          />
          <div>
            <p>Solver</p>
            <SingleDropDown columnNames={SOLVER} initValue={SOLVER[0]} />
          </div>
          <Checkbox defaultSelected color="success">
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

export default RidgeRegression;
