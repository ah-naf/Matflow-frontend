import React, { useState } from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { Input } from "@nextui-org/react";

const Regressor = [
  "Linear Regression",
  "Ridge Regression",
  "Lasso Regression",
  "Decision Tree Regression",
  "Random Forest Regression",
  "Support Vector Regressor",
];

function BuildModel({ csvData }) {
    const [regressor, setRegressor] = useState('')
  return (
    <div className="mt-8">
      <div>
        <p>Select Train Test Dataset</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div className="flex items-center gap-8 mt-8">
        <div className="w-full">
            <p>Regressor</p>
            <SingleDropDown columnNames={Regressor} onValueChange={setRegressor} />
        </div>
        <div className="w-full">
            <Input fullWidth label="Model Name" size="lg" />
        </div>
      </div>
    </div>
  );
}

export default BuildModel;
