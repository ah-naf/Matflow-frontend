import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as stats from "simple-statistics";
import AgGridComponent from "../../Components/AgGridComponent/AgGridComponent";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function DatasetCorrelation() {
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [relationMethod, setRelationMethod] = useState("pearson");
  const [displayType, setDisplayType] = useState("table");

  useEffect(() => {
    if (activeCsvFile) {
      const fetchCSVData = async () => {
        try {
          const res = await fetchDataFromIndexedDB(activeCsvFile.name);

          const correlations = calculateCorrelations(res);
          const { columnDefs, rowData } = generateAgGridData(res, correlations);

          setColumnDefs(columnDefs);
          setRowData(rowData);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCSVData();
    }
  }, [activeCsvFile]);

  const calculateCorrelations = (data) => {
    let columnNames = Object.keys(data[0]);
    columnNames = columnNames.filter(
      (val) => typeof data[0][val] === "number" && val !== "id"
    );
    const correlations = {};

    for (let i = 0; i < columnNames.length; i++) {
      const column1 = columnNames[i];
      correlations[column1] = {};

      for (let j = 0; j < columnNames.length; j++) {
        const column2 = columnNames[j];
        const column1Data = [];
        const column2Data = [];

        for (let k = 0; k < data.length; k++) {
          const val1 = parseFloat(data[k][column1]);
          const val2 = parseFloat(data[k][column2]);

          if (!isNaN(val1) && !isNaN(val2)) {
            column1Data.push(val1);
            column2Data.push(val2);
          }
        }

        // Calculate the correlation coefficient using simple-statistics correlation function
        const correlationCoefficient = stats
          .sampleCorrelation(column1Data, column2Data)
          .toFixed(3);

        // Store the correlation coefficient in the correlations object
        correlations[column1][column2] = correlationCoefficient;
      }
    }

    return correlations;
  };

  const generateAgGridData = (data, correlations) => {
    let columnDefs = Object.keys(correlations).map((columnName) => ({
      headerName: columnName,
      field: columnName,
      flex: 1,
      filter: true,
      sortable: true,
    }));
    columnDefs = [{ headerName: "", field: "name" }, ...columnDefs];
    const columnName = Object.keys(correlations);
    let ind = 0;

    let rowData = Object.values(correlations);
    rowData = rowData.map((val) => {
      return { ...val, name: columnName[ind++] };
    });

    return { columnDefs, rowData };
  };

  return (
    <div className="ag-theme-alpine w-full h-[600px]">
      <h1 className="text-3xl font-bold my-4">Feature Correlation</h1>
      {rowData && columnDefs && (
        <>
          <div className="flex text-lg my-6 items-center gap-8 max-w-2xl ">
            <div className="flex flex-col w-1/2 gap-1">
              <label className="" htmlFor="correlation-method">
                Correlation Method
              </label>
              <select
                className="text-xl p-2 rounded outline-none border-2 border-[#06603b] shadow bg-gray-100"
                name="correlation-method"
                id="correlation-method"
                value={relationMethod}
                onChange={(e) => setRelationMethod(e.target.value)}
              >
                <option value="pearson">Pearson</option>
                <option value="kendall">Kendall</option>
                <option value="spearman">Spearman</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <label htmlFor="display-type">Display Type</label>
              <select
                className="text-xl p-2 rounded outline-none border-2 border-[#06603b] shadow bg-gray-100"
                name="display-type"
                id="display-type"
                value={displayType}
                onChange={(e) => setDisplayType(e.target.value)}
              >
                <option value="table">Table</option>
                <option value="heatmap">Heatmap</option>
              </select>
            </div>
          </div>
          {displayType === "table" ? (
            <AgGridComponent columnDefs={columnDefs} rowData={rowData} />
          ) : (
            <p>Display heatmap</p>
          )}
        </>
      )}
    </div>
  );
}

export default DatasetCorrelation;
