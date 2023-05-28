import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import * as stats from "simple-statistics";
import AgGridComponent from "../../Components/AgGridComponent/AgGridComponent";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function DatasetStatistics() {
  const [rowData, setRowData] = useState([]);
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);

  useEffect(() => {
    if (activeCsvFile && activeCsvFile.name) {
      const fetchCSVData = async () => {
        const res = await fetchDataFromIndexedDB(activeCsvFile.name);
        setRowData(res);
      };
      fetchCSVData();
    }
  }, [activeCsvFile]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Dataset Statistics</h1>
      {rowData.length > 0 && <MyAgGridComponent rowData={rowData} />}
    </div>
  );
}

const MyAgGridComponent = ({ rowData }) => {
  const [columnStats, setColumnStats] = useState([]);

  useEffect(() => {
    if (rowData && rowData.length > 0) {
      let columns = Object.keys(rowData[0] || {});
      const columnStatsData = [];
      columns = columns.filter((item, index) => {
        const dtype = typeof rowData[0][item];
        return dtype === "number";
      });

      columns.forEach((column) => {
        if (column !== "id") {
          let values = rowData
            .map((row) => parseFloat(row[column]))
            .filter((value) => !isNaN(value));
          const count = values.length;
          if (count > 0) {
            const min = stats.min(values);
            const max = stats.max(values);
            const std = stats.standardDeviation(values);

            const mean = stats.mean(values);
            const percentile25 = stats.quantile(values, 0.25);
            const median = stats.quantile(values, 0.5);
            const percentile75 = stats.quantile(values, 0.75);

            columnStatsData.push({
              column,
              count,
              min,
              max,
              std,
              mean,
              "25%": percentile25,
              "50%": median,
              "75%": percentile75,
            });
          }
        }
      });

      setColumnStats(columnStatsData);
    }
  }, [rowData]);

  const columnDefs = useMemo(() => {
    const columns = Object.keys(columnStats[0] || {});
    return columns.map((column) => ({
      headerName: column,
      field: column,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true,
        newRowsAction: "keep",
      },
      sortable: true,
      flex: 1,
    }));
  }, [columnStats]);

  return (
    <div className="w-full">
      <div className="ag-theme-alpine h-[600px] w-full">
        {columnDefs && columnStats && (
          <AgGridComponent rowData={columnStats} columnDefs={columnDefs} />
        )}
      </div>
    </div>
  );
};

export default DatasetStatistics;
