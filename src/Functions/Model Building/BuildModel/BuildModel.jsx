import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import KNearestNeighbour from "./components/Categorical/KNearestNeighbour";
import SupportVectorMachine from "./components/Categorical/SupportVectorMachine";
import LogisticRegression from "./components/Categorical/LogisticRegression";
import DecisionTreeClassification from "./components/Categorical/DecisionTreeClassification";
import RandomForestClassification from "./components/Categorical/RandomForestClassification";
import MultilayerPerceptron from "./components/Categorical/MultilayerPerceptron";

const Regressor = [
  "Linear Regression",
  "Ridge Regression",
  "Lasso Regression",
  "Decision Tree Regression",
  "Random Forest Regression",
  "Support Vector Regressor",
];

const CLASSIFIER = [
  "K-Nearest Neighbors",
  "Support Vector Machine",
  "Logistic Regression",
  "Decision Tree Classification",
  "Random Forest Classification",
  "Multilayer Perceptron",
];

function BuildModel({ csvData }) {
  // const [regressor, setRegressor] = useState(Regressor[0]);
  const [regressor, setRegressor] = useState(CLASSIFIER[0]);

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
            columnNames={CLASSIFIER}
            onValueChange={setRegressor}
            initValue={CLASSIFIER[0]}
          />
        </div>
        <div className="w-full">
          <Input fullWidth label="Model Name" size="lg" />
        </div>
      </div>

      {/* Regressor (for Numerical Column) */}

      {/* <div className="mt-12">
        {regressor === Regressor[0] && <LinearRegression />}
        {regressor === Regressor[1] && <RidgeRegression />}
        {regressor === Regressor[2] && <LassoRegression />}
        {regressor === Regressor[3] && <DecisionTreeRegression />}
        {regressor === Regressor[4] && <RandomForestRegression />}
        {regressor === Regressor[5] && <SupportVectorRegressor />}
      </div> */}

      {/* Classifier (for Categorical Column) */}

      <div className="mt-12">
        {regressor === CLASSIFIER[0] && <KNearestNeighbour />}
        {regressor === CLASSIFIER[1] && <SupportVectorMachine />}
        {regressor === CLASSIFIER[2] && <LogisticRegression />}
        {regressor === CLASSIFIER[3] && <DecisionTreeClassification />}
        {regressor === CLASSIFIER[4] && <RandomForestClassification />}
        {regressor === CLASSIFIER[5] && <MultilayerPerceptron />}
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
