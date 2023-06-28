import { Collapse } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AgGridComponent from "../../Components/AgGridComponent/AgGridComponent";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";

function TimeSeriesAnalysis({ csvData }) {
  const allColumnNames = Object.keys(csvData[0]);
  const [dataTimeWarning, setDateTimeWarning] = useState(false);
  const [extend_time, setExtendTime] = useState(0.0);
  const [target_variable, setTargetVariable] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/time_series/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: csvData,
          select_column: target_variable,
        }),
      });
      const data = await res.json();
      if(data.error) {
        setDateTimeWarning(true)
      }
      console.log(data)
    };
    fetchData();
  }, [target_variable, csvData]);

  useEffect(() => {
    if (dataTimeWarning) {
      toast.warn("No datetime found! (Check another dataset)", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [dataTimeWarning]);

  const initialColumnDefs =
    csvData.length > 0
      ? Object.keys(csvData[0]).map((key) => ({
          headerName: key,
          field: key,
          valueGetter: (params) => {
            return params.data[key];
          },
        }))
      : [];

  return (
    <div className="mt-8">
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
      <h1 className="text-3xl font-medium tracking-wide">
        Time Series Analysis
      </h1>
      <div className="mt-4">
        <Collapse.Group
          bordered
          accordion={false}
          borderWeight={"normal"}
          css={{ borderColor: "green" }}
          shadow
        >
          <Collapse
            title={
              <h1 className="font-medium tracking-wide text-lg">
                Original Dataset
              </h1>
            }
          >
            <div className="w-full h-[570px]">
              {csvData.length > 0 && (
                <div
                  className="ag-theme-alpine"
                  style={{ height: "510px", width: "100%" }}
                >
                  <AgGridComponent
                    rowData={csvData}
                    columnDefs={initialColumnDefs}
                    rowHeight={40}
                  />
                </div>
              )}
            </div>
          </Collapse>
        </Collapse.Group>
      </div>
      {!dataTimeWarning && (
        <div className="mt-8">
          <div className="flex items-end gap-8">
            <div className="w-full">
              <p>Select Column</p>
              <SingleDropDown
                columnNames={allColumnNames}
                onValueChange={setTargetVariable}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSeriesAnalysis;
