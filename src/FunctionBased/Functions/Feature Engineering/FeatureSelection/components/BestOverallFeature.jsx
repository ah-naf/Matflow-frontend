import { Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function BestOverallFeature({ csvData }) {
  const [k_fold, setKFoldValue] = useState(2);
  const [method, setMethod] = useState("None");
  const selectionMethod = useSelector((state) => state.featureSelection.method);
  const target_var = useSelector((state) => state.featureSelection.target_variable);

  const handleMethod = async (e) => {
    setMethod(e);
    if (e == "All") {
      const res = await fetch("http://127.0.0.1:8000/api/feature_selection/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: selectionMethod,
          k_fold,
          target_var,
          dataset: csvData,
        }),
      });

      const data = await res.json();
      console.log(JSON.parse(data.selected_features))
    }
  };

  return (
    <div className="mt-4">
      <div>
        <Input
          label="Enter the value for k-fold"
          fullWidth
          type="number"
          step={1}
          value={k_fold}
          onChange={(e) => setKFoldValue(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Radio.Group
          defaultValue={method}
          onChange={handleMethod}
          orientation="horizontal"
        >
          <Radio value="All" color="success">
            All
          </Radio>
          <Radio value="Custom" color="success">
            Custom
          </Radio>
          <Radio value="None" color="success">
            None
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

export default BestOverallFeature;
