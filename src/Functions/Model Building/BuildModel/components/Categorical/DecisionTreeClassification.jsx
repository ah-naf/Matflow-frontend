import { Checkbox, Input } from "@nextui-org/react";
import React from "react";
import MultipleDropDown from "../../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../../Components/SingleDropDown/SingleDropDown";

const DISPLAY_METRICES = ["Accuracy", "Precision", "Recall", "F1-Score"];

function DecisionTreeClassification() {
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
            label="Min. Samples Split"
            value={2}
            step={1}
          />
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Min. Samples Leaf"
            value={2}
            step={1}
          />
          <Input
            type="number"
            fullWidth
            bordered
            color="success"
            label="Random State"
            value={0}
            step={1}
          />

          <div>
            <p>Criterion</p>
            <SingleDropDown
              columnNames={["gini", "entropy", "log_loss"]}
              initValue={"gini"}
            />
          </div>
          <div>
            <p>Multiclass Average</p>
            <SingleDropDown
              columnNames={["micro", "macro", "weighted"]}
              initValue={"micro"}
            />
          </div>
          <Checkbox color="success">None</Checkbox>
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

export default DecisionTreeClassification;
