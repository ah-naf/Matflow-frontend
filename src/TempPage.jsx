import React, { useEffect, useState } from "react";
import { fetchDataFromIndexedDB } from "./util/indexDB";

const MultiSelectDropdown = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const res = await fetchDataFromIndexedDB("IRIS.csv");

        setRowData(res);

        const resp = await fetch(
          "http://127.0.0.1:8000/api/display_correlation/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: res,
            }),
          }
        );
        let { data } = await resp.json();
        const tempData = JSON.parse(data);
        console.log(tempData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCSVData();
  }, []);

  return <div className="dropdown"></div>;
};

export default MultiSelectDropdown;
