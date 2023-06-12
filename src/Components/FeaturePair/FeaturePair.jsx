import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import AgGridComponent from "../AgGridComponent/AgGridComponent";

function FeaturePair({ rowData }) {
  let columnNames = Object.keys(rowData[0]);
  columnNames = columnNames.filter((name) => name !== "column_name");
  const [Data, setData] = useState([]);
  const [changedData, setChangedData] = useState();
  const [colDef, setColDef] = useState([]);
  const [drop, setDrop] = useState(false);
  const [absolute, setAbsolute] = useState(false);

  const [filter1, setFilter1] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const dropdownRef1 = useRef(null);

  const [filter2, setFilter2] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setIsOpen1(false);
      }

      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const colNames = new Set(columnNames);
    colNames.add("");
    let tempRowData = JSON.parse(JSON.stringify(rowData));
    let newRowData = {};
    for (let i = 0; i < tempRowData.length; i++) {
      const { column_name, ...rest } = tempRowData[i];
      const tempObj = { [columnNames[i]]: rest };
      newRowData = { ...newRowData, ...tempObj };
    }

    if (colNames.has(filter1) && colNames.has(filter2)) {
      if (filter1 || filter2) {
        const fetchData = async () => {
          const res = await fetch(
            "http://127.0.0.1:8000/api/display_correlation_featurePair/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                file: newRowData,
                gradient: true,
                feature1: filter1,
                feature2: filter2,
                drop: false,
                absol: false,
                high: 0.0,
              }),
            }
          );

          let { data } = await res.json();
          data = JSON.parse(data);

          setData(data);
          const tempColDef = Object.keys(data[0]).map((val) => ({
            headerName: val,
            field: val,
            valueGetter: (params) => {
              return params.data[val];
            },
          }));
          setColDef(tempColDef);
          setChangedData(data);
        };

        fetchData();
      }
    }
  }, [filter1, filter2, rowData]);

  const handleInputChange1 = (event) => {
    const newFilter = event.target.value;
    setFilter1(newFilter);
    setIsOpen1(true);
  };
  const handleInputChange2 = (event) => {
    const newFilter = event.target.value;
    setFilter2(newFilter);
    setIsOpen2(true);
  };

  const filteredItems1 = columnNames.filter((item) =>
    item.toLowerCase().includes(filter1.toLowerCase())
  );

  const filteredItems2 = columnNames.filter((item) =>
    item.toLowerCase().includes(filter2.toLowerCase())
  );

  useEffect(() => {
    let temp = JSON.parse(JSON.stringify(Data));
    if (drop) {
      temp = temp.filter(
        (val) => parseInt(val["Correlation Coefficient"]) !== 1
      );
    }
    if (absolute) {
      temp = temp.map((val) => {
        return {
          ...val,
          "Correlation Coefficient": Math.abs(
            parseFloat(val["Correlation Coefficient"])
          ),
        };
      });
    }

    setChangedData(temp);
  }, [drop, absolute, Data]);

  return (
    <div>
      <div className="flex text-lg mt-8 items-end gap-8 w-full">
        <div className="flex flex-col gap-1 basis-80">
          <label className="mb-1" htmlFor="correlation-method">
            Feature 1 Filter
          </label>
          <div ref={dropdownRef1} className="relative">
            <Input
              type="text"
              bordered
              color="success"
              fullWidth
              placeholder="Column Name"
              value={filter1}
              onChange={handleInputChange1}
              onFocus={() => setIsOpen1(true)}
            />

            {isOpen1 && (
              <ul className="border border-gray-300 shadow-md rounded-md absolute max-h-60 overflow-y-auto w-full top-full p-2 px-4 z-50 bg-white">
                {filteredItems1.map((item, ind) => (
                  <li
                    key={ind}
                    onClick={() => {
                      setFilter1(item);
                      setIsOpen1(false);
                    }}
                    className="text-lg tracking-wider cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 basis-80">
          <label className="mb-1" htmlFor="correlation-method">
            Feature 2 Filter
          </label>
          <div ref={dropdownRef2} className="relative">
            <Input
              type="text"
              bordered
              placeholder="Column Name"
              color="success"
              fullWidth
              value={filter2}
              onChange={handleInputChange2}
              onFocus={() => setIsOpen2(true)}
            />

            {isOpen2 && (
              <ul className="border border-gray-300 shadow-md rounded-md absolute max-h-60 overflow-y-auto w-full top-full p-2 px-4 z-50 bg-white">
                {filteredItems2.map((item, ind) => (
                  <li
                    key={ind}
                    onClick={() => {
                      setFilter2(item);
                      setIsOpen2(false);
                    }}
                    className="text-lg tracking-wider cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Checkbox color="success" onChange={(e) => setDrop(e.valueOf())}>
            Drop Perfect
          </Checkbox>
          <Checkbox color="success" onChange={(e) => setAbsolute(e.valueOf())}>
            Absolute Value
          </Checkbox>
        </div>
      </div>

      {Data.length > 0 && colDef.length > 0 && (
        <div className="mt-8 h-[600px]">
          <AgGridComponent rowData={changedData} columnDefs={colDef} />
          <div className="mt-8"></div>
        </div>
      )}
    </div>
  );
}

export default FeaturePair;
