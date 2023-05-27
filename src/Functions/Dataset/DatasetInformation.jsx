import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

const DatasetInformation = () => {
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
      <h1 className="text-3xl font-bold my-4">Dataset Information</h1>
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
      filter: true,
      filterParams: {
        suppressAndOrCondition: true, // Optional: Suppress 'and'/'or' filter conditions
        newRowsAction: "keep", // Optional: Preserve filter when new rows are loaded
      },
      sortable: true,
      flex: 1
    }));
  }, [data]);

  return (
    <div className="w-full">
      <div className="ag-theme-alpine h-[500px] w-full">
        {columnDefs && data && (
          <AgGridReact rowData={data} columnDefs={columnDefs} />
        )}
      </div>
    </div>
  );
};

export default DatasetInformation;
