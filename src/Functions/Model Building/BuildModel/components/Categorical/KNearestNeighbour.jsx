import { Input } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleDropDown from "../../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../../Components/SingleDropDown/SingleDropDown";
import { setHyperparameterData } from "../../../../../Slices/ModelBuilding";

const DISPLAY_METRICES = ["Accuracy", "Precision", "Recall", "F1-Score"];

function KNearestNeighbour({ train, test }) {
  const hyperparameterOption = useSelector(
    (state) => state.modelBuilding.hyperparameter
  );
  const regressor = useSelector((state) => state.modelBuilding.regressor);
  const type = useSelector((state) => state.modelBuilding.type);
  const target_variable = useSelector(
    (state) => state.modelBuilding.target_variable
  );
  const dispatch = useDispatch();

  const handleOptimization = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/hyperparameter_optimization/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            train,
            test,
            [type === 'regressor'? 'regressor': 'classifier']: regressor,
            type,
            target_variable,
            ...hyperparameterOption,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Input
              fullWidth
              bordered
              color="success"
              type="number"
              onChange={(e) =>
                dispatch(
                  setHyperparameterData({
                    ...hyperparameterOption,
                    "Number of iterations for hyperparameter search":
                      e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="w-full">
            <p className="mb-1">Number of cross-validation folds</p>
            <Input
              fullWidth
              bordered
              color="success"
              type="number"
              onChange={(e) =>
                dispatch(
                  setHyperparameterData({
                    ...hyperparameterOption,
                    "Number of cross-validation folds": e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="w-full">
            <p className="mb-1">Random state for hyperparameter search</p>
            <Input
              fullWidth
              bordered
              color="success"
              type="number"
              onChange={(e) =>
                dispatch(
                  setHyperparameterData({
                    ...hyperparameterOption,
                    "Random state for hyperparameter search": e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <button
          className="self-start border-2 px-4 tracking-wider border-primary-btn text-black font-medium text-sm rounded-md py-2 mt-6"
          onClick={handleOptimization}
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
            label="Number of neighbors"
            value={5}
            step={1}
          />

          <div>
            <p>Weight Function</p>
            <SingleDropDown
              columnNames={["uniform", "distance"]}
              initValue={"uniform"}
            />
          </div>
          <div>
            <p>Distance Metric</p>
            <SingleDropDown
              columnNames={["minkowski", "euclidean", "manhattan"]}
              initValue={"minkowski"}
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

export default KNearestNeighbour;