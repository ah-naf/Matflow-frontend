import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

const DatasetDisplay = () => {
  const [value] = useState("All");
  const [csvData, setCsvData] = useState([]);
  const [filterText] = useState("");
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch data from IndexedDB
  useEffect(() => {
    if (activeCsvFile && activeCsvFile.name) {
      const getData = async () => {
        const res = await fetchDataFromIndexedDB(activeCsvFile.name);
        setCsvData(res);
      };
      getData();
    }
  }, [activeCsvFile]);

  const handleExportCSV = () => {
    // Code to export CSV
  };

  const handleDeleteSelectedRows = () => {
    // Code to delete selected rows
  };

  // Define the row data based on the selected view option
  let rowData;
  if (value === "Head") {
    rowData = csvData.slice(0, 10); // Display the first 10 rows
  } else if (value === "Tail") {
    rowData = csvData.slice(-10); // Display the last 10 rows
  } else if (value === "Custom") {
    // Apply custom filtering based on filterText
    rowData = csvData.filter((row) =>
      Object.values(row).some(
        (value) =>
          value !== null &&
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
  } else {
    rowData = csvData; // Display all rows
  }

  // Define the grid options
  const gridOptions = {
    columnDefs:
      csvData.length > 0
        ? Object.keys(csvData[0]).map((key) => ({
            headerName: key,
            field: key,
            valueFormatter: ({ value }) => (value !== null ? value : "N/A"),
            filter: true, // Enable filtering for the column
            filterParams: {
              suppressAndOrCondition: true, // Optional: Suppress 'and'/'or' filter conditions
              newRowsAction: "keep", // Optional: Preserve filter when new rows are loaded
            },
            sortable: true, // Enable sorting for the column
            flex: 1,
          }))
        : [],
    rowData,
    pagination: true,
    paginationPageSize: 10,
    enableFilter: true, // Enable filtering
    enableSorting: true, // Enable sorting
    rowSelection: "multiple", // Enable multiple row selection
    onRowSelected: (event) => {
      setSelectedRows(event.api.getSelectedRows());
    },
  };

  return (
    <>
      <h1 className="text-3xl mt-4 font-bold">Display Dataset</h1>

      <div className="mt-4">
        {rowData.length > 0 && (
          <div
            className="ag-theme-alpine"
            style={{ height: "600px", width: "100%" }}
          >
            <AgGridReact gridOptions={gridOptions} rowHeight={50} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatasetDisplay;
