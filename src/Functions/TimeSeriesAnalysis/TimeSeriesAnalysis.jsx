import { Collapse, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AgGridComponent from "../../Components/AgGridComponent/AgGridComponent";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";
import DateTime from "../../Components/DateTime/DateTime";

function TimeSeriesAnalysis({ csvData }) {
  const [dataTimeWarning, setDateTimeWarning] = useState(false);
  const [extend_time, setExtendTime] = useState(0.00)

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
              <Input
                fullWidth
                type="number"
                min={0}
                step={0.01}
                value={extend_time}
                onChange={e => setExtendTime(e.target.value)}
                label="Extend Time"
              />
            </div>
            <div className="w-full">
              <p>Select Column</p>
              <SingleDropDown columnNames={["s"]} />
            </div>
          </div>
          <div>
            {/* <DateTime /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSeriesAnalysis;
