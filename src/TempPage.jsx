import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Table } from "@nextui-org/react";
import { fetchDataFromIndexedDB, parseCsv, storeDataInIndexedDB } from "./util/indexDB";
const CSVRenderer = () => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const temp = async () => {
      const res = await fetchDataFromIndexedDB("sample.csv");
      setCsvData(res);
    };
    temp();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const parsedData = await parseCsv(file);
    storeDataInIndexedDB(parsedData, file.name);
    setCsvData(parsedData);
    // console.log(parsedData)
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <div>
        {csvData.length > 0 && (
          <Table
            bordered
            shadow={false}
            color="secondary"
            aria-label="Example pagination  table"
            css={{
              height: "700px",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              {Object.keys(csvData[0]).map((val, index) => {
                return <Table.Column key={index}>{val}</Table.Column>;
              })}
            </Table.Header>
            <Table.Body>
              {csvData.map((row, index) => (
                <Table.Row key={index}>
                  {Object.values(row).map((value, index) => (
                    <Table.Cell key={index}>{value}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              onPageChange={(page) => console.log({ page })}
              rowsPerPage={10}
            />
          </Table>
        )}
      </div>
      ;
    </div>
  );
};
export default CSVRenderer;
