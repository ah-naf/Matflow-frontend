import React, { useEffect, useState } from "react";
import FunctionSubMenu from "../FunctionSubMenu/FunctionSubMenu";
import { useSelector } from "react-redux";
import { Button, Radio, Table } from "@nextui-org/react";
import Papa from "papaparse";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function DashBoardRight() {
  const activeFunction = useSelector((state) => state.sideBar.activeFunction);
  const activeFile = useSelector((state) => state.uploadedFile.activeFile);
  const activeSubFunction = useSelector(
    (state) => state.sideBar.activeSubFunction
  );

  return (
    <div className="flex-grow h-full overflow-y-auto px-6">
      {activeFunction && activeFile ? (
        <>
          <FunctionSubMenu />
          {activeSubFunction && activeSubFunction === "Display" && (
            <DatasetDisplay />
          )}
        </>
      ) : (
        <div className="w-full h-full grid place-content-center">
          <h1 className="text-3xl tracking-wide text-center">
            Please select a function to continue...
          </h1>
        </div>
      )}
    </div>
  );
}

// Function -> Dataset | SubFunction -> Display

const DatasetDisplay = () => {
  const [value, setValue] = useState("All");
  const [csvData, setCsvData] = useState([]);
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);

  useEffect(() => {
    if (activeCsvFile && activeCsvFile.name) {
      const getData = async () => {
        const res = await fetchDataFromIndexedDB(activeCsvFile.name);
        setCsvData(res);
      };
      getData();
    }
  });

  return (
    <div className="">
      <h1 className="text-3xl mt-4">Display Dataset</h1>
      <div>
        <Radio.Group value={value} onChange={setValue} orientation="horizontal">
          <Radio size="sm" value="All" color="success">
            All
          </Radio>
          <Radio size="sm" value="Head" color="success">
            Head
          </Radio>
          <Radio size="sm" value="Tail" color="success">
            Tail
          </Radio>
          <Radio size="sm" value="Custom" color="success">
            Custom
          </Radio>
        </Radio.Group>
      </div>
      {(value === "All" || value === "Head" || value === "Tail") && (
        <div className="mt-4">
          {csvData.length > 0 && (
            <Table
              bordered
              shadow={false}
              color="secondary"
              aria-label="Example pagination table"
              aria-labelledby="f"
              aria-describedby="f"
              aria-details="s"
              css={{
                height: "600px",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                {/* {console.log(csvData[0])} */}
                {Object.keys(csvData[0]).map((val, index) => {
                  return (
                    <Table.Column key={index} className="capitalize">
                      {val}
                    </Table.Column>
                  );
                })}
              </Table.Header>
              <Table.Body>
                {value !== "Tail"
                  ? csvData.map((row, index) => (
                      <Table.Row key={index}>
                        {Object.values(row).map((value, index) => (
                          <Table.Cell key={index} css={{ fontSize: "$sm" }}>
                            {value}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))
                  : csvData.slice(-10).map((row, index) => (
                      <Table.Row key={index}>
                        {Object.values(row).map((value, index) => (
                          <Table.Cell key={index} css={{ fontSize: "$sm" }}>
                            {value}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
              </Table.Body>
              <Table.Pagination
                color={"success"}
                shadow
                align="center"
                onPageChange={(page) => console.log({ page })}
                rowsPerPage={10}
                className={`${value !== "All" ? "!hidden" : ""}`}
              />
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default DashBoardRight;
