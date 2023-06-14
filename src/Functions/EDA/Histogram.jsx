import { Checkbox, Input, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function Histogram() {
  const [csvData, setCsvData] = useState();
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [stringColumn, setStringColumn] = useState([]);
  const [numberColumn, setNumberColumn] = useState([]);
  const [activeStringColumn, setActiveStringColumn] = useState("");
  const [activeNumberColumn, setActiveNumberColumn] = useState("");
  const [activeHueColumn, setActiveHueColumn] = useState("");
  const [orientation, setOrientation] = useState("Vertical");
  const [showTitle, setShowTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [title, setTitle] = useState();
  const [dodge, setDodge] = useState(false);
  const [aggregate, setAggregate] = useState("count");
  const [KDE, setKDE] = useState(false);
  const [legend, setLegend] = useState(false);
  const [showAutoBin, setShowAutoBin] = useState(false);

  useEffect(() => {
    if (activeCsvFile && activeCsvFile.name) {
      const getData = async () => {
        const res = await fetchDataFromIndexedDB(activeCsvFile.name);
        setCsvData(res);

        const tempStringColumn = [];
        const tempNumberColumn = [];

        Object.entries(res[0]).forEach(([key, value]) => {
          if (typeof res[0][key] === "string") tempStringColumn.push(key);
          else tempNumberColumn.push(key);
        });

        setStringColumn(tempStringColumn);
        setNumberColumn(tempNumberColumn);
      };

      getData();
    }
  }, [activeCsvFile]);

  useEffect(() => {
    if (activeNumberColumn && csvData) {
      const fetchData = async () => {
        setLoading(true);
        setImage("");
        const resp = await fetch("http://127.0.0.1:8000/api/eda_boxplot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cat: activeStringColumn || "-",
            num: activeNumberColumn || "-",
            hue: activeHueColumn || "-",
            orient: orientation,
            dodge: dodge,
            title: title || "",
            file: csvData,
          }),
        });
        let data = await resp.blob();
        const imageUrl = URL.createObjectURL(data);
        setImage(imageUrl);
        setLoading(false);
      };

      fetchData();
    }
  }, [
    activeNumberColumn,
    activeHueColumn,
    activeStringColumn,
    orientation,
    title,
    dodge,
    csvData,
  ]);

  return (
    <div>
      <div className="flex items-center gap-8 mt-8">
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">Variable</p>
          <SingleDropDown
            columnNames={numberColumn}
            onValueChange={setActiveNumberColumn}
          />
        </div>
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">Hue</p>
          <SingleDropDown
            onValueChange={setActiveHueColumn}
            columnNames={stringColumn}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-medium tracking-wide">
            Aggregate Statistics
          </label>
          <select
            name=""
            id=""
            value={aggregate}
            className="bg-transparent p-2 focus:border-[#06603b] border-2 rounded-lg"
            onChange={(e) => setAggregate(e.target.value)}
          >
            <option value="probability">Probability</option>
            <option value="count">Count</option>
            <option value="frequency">Frequency</option>
            <option value="percent">Percent</option>
            <option value="density">Density</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="" className="text-lg font-medium tracking-wide">
            Orientation
          </label>
          <select
            name=""
            id=""
            value={orientation}
            className="bg-transparent p-2 focus:border-[#06603b] border-2 rounded-lg"
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="Vertical">Vertical</option>
            <option value="Horizontal">Horizontal</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 tracking-wider">
        <Checkbox color="success" onChange={(e) => setShowTitle(e.valueOf())}>
          Title
        </Checkbox>
        <Checkbox color="success" onChange={(e) => setShowAutoBin(e.valueOf())}>
          Auto Bin
        </Checkbox>
        <Checkbox color="success" onChange={(e) => setKDE(e.valueOf())}>
          KDE
        </Checkbox>
        <Checkbox color="success" onChange={(e) => setLegend(e.valueOf())}>
          Legend
        </Checkbox>
      </div>
      <div className="my-8">
        <div className="flex  w-64 m-auto items-center h-32 justify-center">
          <div className="py-1 relative min-w-full">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 rounded-full bg-teal-600 w-0"
                style={{width: "58.5714%"}}
              ></div>
              <div
                className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
                
                

                style={{left: "58.5714%"}}
              >
                <div className="relative -mt-2 w-1">
                  <div
                    className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                    style={{marginLeft: "-20.5px"}}
                  >
                    <div className="relative shadow-md">
                      <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                        92
                      </div>
                      <svg
                        className="absolute text-black w-full h-2 left-0 top-100"
                        x="0px"
                        y="0px"
                        viewBox="0 0 255 255"
                        xmlSpace="preserve"
                      >
                        <polygon
                          className="fill-current"
                          points="0,0 127.5,127.5 255,0"
                        ></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">
                10
              </div>
              <div className="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">
                150
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTitle && (
        <div className="mt-4">
          <Input
            clearable
            bordered
            color="success"
            size="lg"
            label="Input Title"
            placeholder="Enter your desired title"
            fullWidth
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            helperText="Press Enter to apply"
            onKeyDown={(e) => {
              if (e.key === "Enter") setTitle(titleValue);
            }}
          />
        </div>
      )}
      {loading && (
        <div className="grid place-content-center mt-12 w-full h-full">
          <Loading color={"success"} size="xl">
            Fetching Data...
          </Loading>
        </div>
      )}
      {image && (
        <div className="py-8 flex justify-center">
          <img src={image} alt="" className="w-full max-w-[800px]" />
        </div>
      )}
    </div>
  );
}

export default Histogram;
