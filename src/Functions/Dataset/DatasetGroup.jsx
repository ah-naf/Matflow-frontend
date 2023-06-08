import { Input, Popover } from "@nextui-org/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiHide } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import { useSelector } from "react-redux";
import AgGridComponent from "../../Components/AgGridComponent/AgGridComponent";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function DatasetGroup() {
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [groupVar, setGroupVar] = useState([]);
  const [aggFunc, setAggFunc] = useState("");
  const [rowData, setRowData] = useState(null);
  const [allColumns, setAllColumns] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const allColumnsRef = useRef(allColumns);

  const columnDefs = useMemo(() => {
    if (!rowData) return;
    const columns = Object.keys(rowData[0] || {});
    return columns.map((column) => ({
      headerName: column,
      field: column,
      filter: true,
      filterParams: {
        suppressAndOrCondition: true, // Optional: Suppress 'and'/'or' filter conditions
        newRowsAction: "keep", // Optional: Preserve filter when new rows are loaded
      },
      sortable: true,
      flex: 1,
    }));
  }, [rowData]);

  useEffect(() => {
    if (activeCsvFile) {
      const fetchCSVData = async () => {
        try {
          const res = await fetchDataFromIndexedDB(activeCsvFile.name);
          const tempColumns = Object.keys(res[0]);
          setAllColumns(tempColumns);
          setGroupVar([tempColumns[0]]);
          allColumnsRef.current = tempColumns;

          const response = await fetch("http://127.0.0.1:8000/api/display/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: res,
              group_var: tempColumns[0],
              agg_func: "count",
            }),
          });

          let { data } = await response.json();
          data = JSON.parse(data);

          setRowData(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchCSVData();
    }
  }, [activeCsvFile]);

  const handleColAdd = async () => {
    setGroupVar([...groupVar, searchValue]);
    setSearchValue("");
    const response = await fetch("http://127.0.0.1:8000/api/display/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: rowData,
        group_var: [...groupVar, searchValue],
        agg_func: aggFunc ? aggFunc : "count",
      }),
    });

    let { data } = await response.json();
    data = JSON.parse(data);
    setRowData(data);
  };

  const filterColumn = async (name) => {
    const tempFunc = groupVar.filter((val) => val !== name);
    setGroupVar(tempFunc);
    const response = await fetch("http://127.0.0.1:8000/api/display/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: rowData,
        group_var: tempFunc,
        agg_func: aggFunc ? aggFunc : "count",
      }),
    });

    let { data } = await response.json();
    data = JSON.parse(data);
    setRowData(data);
  };

  const handleOptionChange = async (e) => {
    e.preventDefault();
    setAggFunc(e.target.value);
    const response = await fetch("http://127.0.0.1:8000/api/display/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: rowData,
        group_var: groupVar,
        agg_func: e.target.value,
      }),
    });

    let { data } = await response.json();
    data = JSON.parse(data);
    console.log(data)
    // console.log(data);
    setRowData(data);
  };

  return (
    <div>
      <div className="flex justify-between mt-4 items-end">
        <h1 className="text-3xl font-bold">Group Data</h1>
        <div>
          <Popover placement={"bottom-right"} shouldFlip isBordered>
            <Popover.Trigger>
              <h3 className="text-base underline cursor-pointer text-[#06603b] font-medium tracking-wide">
                Aggregate Column
              </h3>
            </Popover.Trigger>
            <Popover.Content>
              <div className="px-6 py-4 min-w-[350px] max-w-xl">
                <div className="w-full">
                  <div className="flex gap-2 mb-2 items-center">
                    <p className="font-titillium font-semibold tracking-wide text-sm">Aggregate Function: </p>
                    <select name="aggFunc" id="" onChange={handleOptionChange} className="flex-grow p-2 rounded border-2 border-[#097045] bg-transparent">
                      <option value="count">count</option>
                      <option value="sum">sum</option>
                      <option value="min">min</option>
                      <option value="max">max</option>
                      <option value="mean">mean</option>
                      <option value="median">median</option>
                      <option value="std">std</option>
                      <option value="var">var</option>
                    </select>
                  </div>
                  <p className="mb-2 tracking-wide font-semibold font-titillium">
                    Add Column
                  </p>
                  <Input
                    width="100%"
                    color="success"
                    bordered
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter Column Name. (Check spelling)"
                    contentRight={
                      <button className="cursor-pointer" onClick={handleColAdd}>
                        <GrFormAdd color="#06603b" />
                      </button>
                    }
                    contentClickable
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm tracking-wide font-titillium font-semibold">
                    Showing Column :
                  </h3>
                  <div className="w-full flex items-center mt-4 flex-wrap gap-2 max-w-xl">
                    {groupVar &&
                      groupVar.length > 0 &&
                      groupVar.map((val, ind) => (
                        <button
                          className="text-white flex items-center justify-between rounded cursor-pointer bg-[#097045] font-roboto tracking-wide group"
                          key={ind}
                        >
                          <span className="p-2">{val}</span>
                          <span
                            className="pr-2 hidden group-hover:flex"
                            onClick={() => filterColumn(val)}
                          >
                            <BiHide />
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
      <div className="ag-theme-alpine w-full h-[600px] mt-4">
        {rowData && columnDefs && (
          <AgGridComponent rowData={rowData} columnDefs={columnDefs} />
        )}
      </div>
    </div>
  );
}

export default DatasetGroup;
