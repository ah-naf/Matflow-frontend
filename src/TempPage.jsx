import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchDataFromIndexedDB } from "./util/indexDB";

const TempPage = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      const res = await fetchDataFromIndexedDB("IRIS.csv");
      setRowData(res);
    };
    fetchCSVData();
  }, []);

  return (
    <div>
      <h1>Ag-Grid React Example</h1>
      {rowData.length > 0 && <MyAgGridComponent rowData={rowData} />}
    </div>
  );
};

const MyAgGridComponent = ({ rowData }) => {
  const data = useMemo(() => {
    const columns = Object.keys(rowData[0] || {});
    const columnInfo = [];

    columns.forEach((column) => {
      const uniqueValues = new Set();
      let nonNullCount = 0;

      rowData.forEach((row) => {
        const value = row[column];
        if (value) {
          uniqueValues.add(value);
          nonNullCount++;
        }
      });

      const nullCount = rowData.length - nonNullCount;
      const nullPercentage = (nullCount / rowData.length) * 100;
      const dtype = typeof rowData[0][column];

      columnInfo.push({
        column,
        uniqueValues: uniqueValues.size,
        nonNullCount,
        nullPercentage,
        dtype,
      });
    });

    return columnInfo;
  }, [rowData]);

  const columnDefs = useMemo(() => {
    const columns = Object.keys(data[0] || {});
    return columns.map((column) => ({
      headerName: column,
      field: column,
    }));
  }, [data]);

  return (
    <div>
      <div className="ag-theme-alpine h-[500px] w-full">
        {console.log(data)}
        {columnDefs && data && <AgGridReact rowData={data} columnDefs={columnDefs} />}
      </div>
      
    </div>
  );
};

export default TempPage;
