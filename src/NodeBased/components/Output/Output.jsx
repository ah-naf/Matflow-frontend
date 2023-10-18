import { Collapse } from "@nextui-org/react";
import React from "react";
import AgGridAutoDataComponent from "../../../FunctionBased/Components/AgGridComponent/AgGridAutoDataComponent";

const TABLE = [
  "Alter Field Name",
  "File",
  "Table",
  "Change Dtype",
  "Imputation",
  "Encoding",
  "Scaling",
  "Drop Column/Rows",
  "Feature Selection",
  "Cluster",
  "Add/Modify",
  "Upload File",
  "ReverseML",
  "Time Series Analysis",
  "Split Dataset",
];

function Output({ outputData: { data, type } }) {
  console.log({ data, type });

  if (!type)
    return <h1 className="text-lg mt-1">Select a node to see the output</h1>;

  if (!data) return <h1 className="text-lg mt-1">No data found.</h1>;

  if (TABLE.includes(type))
    return (
      <Collapse.Group bordered className="mt-2">
        <Collapse title={<h1 className="font-medium tracking-wider">Table</h1>}>
          <div className=" w-full h-full overflow-auto">
            {data.file_name && (
              <h3 className="font-medium text-center text-lg mb-1">
                File Name: {data.file_name}
              </h3>
            )}
            <AgGridAutoDataComponent
              rowData={data.table}
              download
              height="500px"
              rowHeight={40}
              headerHeight={40}
              paginationPageSize={10}
            />
          </div>
        </Collapse>
      </Collapse.Group>
    );

  if (type === "Append Dataset" || type === "Merge Dataset")
    return (
      <>
        {Object.keys(data).map((val, ind) => (
          <Collapse.Group bordered key={ind} className="mt-2">
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">Table {ind + 1}</h1>
              }
            >
              <div className=" w-full h-full overflow-auto">
                {data[val] && (
                  <h3 className="font-medium text-center text-lg mb-1">
                    File Name: {val}
                  </h3>
                )}
                <AgGridAutoDataComponent
                  rowData={data[val]}
                  download
                  height="500px"
                  rowHeight={40}
                  headerHeight={40}
                  paginationPageSize={10}
                />
              </div>
            </Collapse>
          </Collapse.Group>
        ))}
      </>
    );

  if (type === "Test-Train Dataset")
    return (
      <>
        {["table", "test", "train"].map((val, ind) => (
          <Collapse.Group bordered key={ind} className="mt-2">
            <Collapse
              title={
                <h1 className="font-medium tracking-wider capitalize">
                  {val === "table" ? val : val + " Dataset"}
                </h1>
              }
            >
              <div className=" w-full h-full overflow-auto">
                {data[
                  val === "test"
                    ? "test_dataset_name"
                    : val === "train"
                    ? "train_dataset_name"
                    : ""
                ] && (
                  <h3 className="font-medium text-center text-lg mb-1">
                    File Name:{" "}
                    {
                      data[
                        val === "test"
                          ? "test_dataset_name"
                          : val === "train"
                          ? "train_dataset_name"
                          : ""
                      ]
                    }
                  </h3>
                )}
                <AgGridAutoDataComponent
                  rowData={data[val]}
                  download
                  height="500px"
                  rowHeight={40}
                  headerHeight={40}
                  paginationPageSize={10}
                />
              </div>
            </Collapse>
          </Collapse.Group>
        ))}
      </>
    );
}

export default Output;
