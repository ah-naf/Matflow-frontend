import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import LinearRegression from "./components/LinearRegression";
import RidgeRegression from "./components/RidgeRegression";
import LassoRegression from "./components/LassoRegression";
import DecisionTreeRegression from "./components/DecisionTreeRegression";
import RandomForestRegression from "./components/RandomForestRegression";
import SupportVectorRegressor from "./components/SupportVectorRegressor";

const Regressor = [
  "Linear Regression",
  "Ridge Regression",
  "Lasso Regression",
  "Decision Tree Regression",
  "Random Forest Regression",
  "Support Vector Regressor",
];

function BuildModel({ csvData }) {
  const [regressor, setRegressor] = useState(Regressor[0]);
  return (
    <div className="my-8">
      <div>
        <p>Select Train Test Dataset</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div className="flex items-center gap-8 mt-8">
        <div className="w-full">
          <p>Regressor</p>
          <SingleDropDown
            columnNames={Regressor}
            onValueChange={setRegressor}
            initValue={"Linear Regression"}
          />
        </div>
        <div className="w-full">
          <Input fullWidth label="Model Name" size="lg" />
        </div>
      </div>
      <div className="mt-12">
        {regressor === Regressor[0] && <LinearRegression />}
        {regressor === Regressor[1] && <RidgeRegression />}
        {regressor === Regressor[2] && <LassoRegression />}
        {regressor === Regressor[3] && <DecisionTreeRegression />}
        {regressor === Regressor[4] && <RandomForestRegression />}
        {regressor === Regressor[5] && <SupportVectorRegressor />}
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
      >
        Submit
      </button>
    </div>
  );
}

export default BuildModel;
