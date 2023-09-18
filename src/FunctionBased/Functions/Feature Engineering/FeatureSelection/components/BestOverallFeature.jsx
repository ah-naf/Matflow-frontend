import { Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import NextTable from "../../../../Components/NextTable/NextTable";

function BestOverallFeature({ csvData }) {
  const [k_fold, setKFoldValue] = useState(2);
  const [method, setMethod] = useState("None");
  const selectionMethod = useSelector((state) => state.featureSelection.method);
  const target_var = useSelector(
    (state) => state.featureSelection.target_variable
  );
  const [graph_data, setGraphData] = useState();
  const [selected_feature_data, setSelectedFeatureData] = useState();

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
      console.log(data);
      const selectedFeatureData =
        data.selected_features.custom_feature_data.group.selected_features_data;
      let tempResult = [];
      selectedFeatureData.rows.forEach((row) => {
        let tmp = {};
        row.forEach((val, ind) => {
          tmp = { ...tmp, [selectedFeatureData.headers[ind]]: val };
        });
        tempResult.push(tmp);
      });
      setSelectedFeatureData(tempResult);
      setGraphData(data.selected_features.graph_data);
      // console.log(data.selected_features.graph_data);
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
      {selected_feature_data && (
        <div className="mt-4">
          <h1 className="text-2xl mb-2 font-medium">Selected Features:</h1>
          <NextTable rowData={selected_feature_data} />
        </div>
      )}
      {graph_data && (
        <>
          <div className="flex justify-center mt-4">
            <Plot
              data={JSON.parse(graph_data.bar_plot).data}
              layout={{
                ...JSON.parse(graph_data.bar_plot).layout,
                showlegend: true,
              }}
              config={{ scrollZoom: true, editable: true, responsive: true }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Plot
              data={JSON.parse(graph_data.scatter_plot).data}
              layout={{
                ...JSON.parse(graph_data.scatter_plot).layout,
                showlegend: true,
              }}
              config={{ scrollZoom: true, editable: true, responsive: true }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default BestOverallFeature;
