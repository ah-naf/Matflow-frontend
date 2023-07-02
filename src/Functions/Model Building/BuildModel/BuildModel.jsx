import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import { setReg } from "../../../Slices/ModelBuilding";
import { fetchDataFromIndexedDB } from "../../../util/indexDB";
import DecisionTreeClassification from "./components/Categorical/DecisionTreeClassification";
import KNearestNeighbour from "./components/Categorical/KNearestNeighbour";
import LogisticRegression from "./components/Categorical/LogisticRegression";
import MultilayerPerceptron from "./components/Categorical/MultilayerPerceptron";
import RandomForestClassification from "./components/Categorical/RandomForestClassification";
import SupportVectorMachine from "./components/Categorical/SupportVectorMachine";
import DecisionTreeRegression from "./components/Continuous/DecisionTreeRegression";
import LassoRegression from "./components/Continuous/LassoRegression";
import LinearRegression from "./components/Continuous/LinearRegression";
import RandomForestRegression from "./components/Continuous/RandomForestRegression";
import RidgeRegression from "./components/Continuous/RidgeRegression";
import SupportVectorRegressor from "./components/Continuous/SupportVectorRegressor";

const REGRESSOR = [
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
  const [allRegressor, setAllRegressor] = useState();
  const [regressor, setRegressor] = useState();
  const [allDatasetName, setAllDatasetName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [whatKind, setWhatKind] = useState();
  const dispatch = useDispatch();
  const [train, setTrain] = useState();
  const [test, setTest] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let tempDatasets = await fetchDataFromIndexedDB("splitted_dataset");
      tempDatasets = tempDatasets.map((val) => Object.keys(val)[0]);
      setAllDatasetName(tempDatasets);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDatasetChange = async (e) => {
    let tempDatasets = await fetchDataFromIndexedDB("splitted_dataset");
    tempDatasets.forEach(async (val) => {
      if (e === Object.keys(val)[0]) {
        setWhatKind(val[e][0]);

        // Check What Kind
        if (val[e][0] === "Continuous") {
          setAllRegressor(REGRESSOR);
          setRegressor(REGRESSOR[0]);
          dispatch(setReg(REGRESSOR[0]));
        } else {
          setAllRegressor(CLASSIFIER);
          setRegressor(CLASSIFIER[0]);
          dispatch(setReg(CLASSIFIER[0]));
        }

        const trainData = await fetchDataFromIndexedDB(val[e][1]);
        const testData = await fetchDataFromIndexedDB(val[e][2]);

        if (!testData || !trainData || !testData.length || !trainData.length) {
          setAllRegressor();
          toast.warn("Properly Split Dataset First.", {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          setTrain(trainData);
          setTest(testData);
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (allDatasetName.length === 0)
    return (
      <div className="my-8">
        <h1 className="text-2xl font-medium">Split a dataset to continue</h1>
      </div>
    );

  return (
    <div className="my-8">
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <div>
        <p>Select Train Test Dataset</p>
        <SingleDropDown
          columnNames={allDatasetName}
          onValueChange={(e) => handleDatasetChange(e)}
        />
      </div>
      {allRegressor && (
        <>
          <div className="flex items-center gap-8 mt-8">
            <div className="w-full">
              <p>Regressor</p>
              <SingleDropDown
                columnNames={allRegressor}
                onValueChange={(e) => {
                  setRegressor(e);
                  dispatch(setReg(e));
                }}
                initValue={allRegressor[0]}
              />
            </div>
            <div className="w-full">
              <Input fullWidth label="Model Name" size="lg" />
            </div>
          </div>

          {/* Regressor (for Numerical Column) */}

          {whatKind && whatKind === "Continuous" ? (
            <div className="mt-12">
              {regressor === REGRESSOR[0] && (
                <LinearRegression train={train} test={test} />
              )}
              {regressor === REGRESSOR[1] && (
                <RidgeRegression train={train} test={test} />
              )}
              {regressor === REGRESSOR[2] && (
                <LassoRegression train={train} test={test} />
              )}
              {regressor === REGRESSOR[3] && (
                <DecisionTreeRegression train={train} test={test} />
              )}
              {regressor === REGRESSOR[4] && (
                <RandomForestRegression train={train} test={test} />
              )}
              {regressor === REGRESSOR[5] && (
                <SupportVectorRegressor train={train} test={test} />
              )}
            </div>
          ) : (
            <div className="mt-12">
              {regressor === CLASSIFIER[0] && (
                <KNearestNeighbour train={train} test={test} />
              )}
              {regressor === CLASSIFIER[1] && (
                <SupportVectorMachine train={train} test={test} />
              )}
              {regressor === CLASSIFIER[2] && (
                <LogisticRegression train={train} test={test} />
              )}
              {regressor === CLASSIFIER[3] && (
                <DecisionTreeClassification train={train} test={test} />
              )}
              {regressor === CLASSIFIER[4] && (
                <RandomForestClassification train={train} test={test} />
              )}
              {regressor === CLASSIFIER[5] && (
                <MultilayerPerceptron train={train} test={test} />
              )}
            </div>
          )}

          <button
            className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
            // onClick={handleSave}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default BuildModel;
