import { Input } from "@nextui-org/react";
import React from "react";
import MultipleDropDown from "../../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../../Components/SingleDropDown/SingleDropDown";

const DISPLAY_METRICES = ["Accuracy", "Precision", "Recall", "F1-Score"];

function LogisticRegression() {
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
            label="C"
            value={1}
            step={0.01}
          />
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Tolerance"
            value={0.001}
            step={0.001}
          />
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Max Iteration"
            value={100}
            step={1}
          />
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Random State"
            value={42}
            step={1}
          />

          <div>
            <p>Penalty</p>
            <SingleDropDown
              columnNames={["None", "l1", "l2", "elasticnet"]}
              initValue={"l2"}
            />
          </div>
          <div>
            <p>Solver</p>
            <SingleDropDown
              columnNames={["lbfgs", "newton-cg", 'liblinear', 'sag', 'saga']}
              initValue={"lbfgs"}
            />
          </div>
          <div>
            <p>Multiclass Average</p>
            <SingleDropDown
              columnNames={["micro", "macro", "weighted"]}
              initValue={"micro"}
            />
          </div>
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

export default LogisticRegression;
