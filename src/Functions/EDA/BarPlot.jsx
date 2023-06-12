import { Checkbox, Input, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function BarPlot() {
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
  const [annotate, setAnnotate] = useState(false);

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
    if (activeNumberColumn && activeStringColumn && csvData) {
      const fetchData = async () => {
        setLoading(true);
        setImage('')
        const resp = await fetch("http://127.0.0.1:8000/api/eda_barplot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cat: activeStringColumn || '-',
            num: activeNumberColumn || '-',
            hue: activeHueColumn || '-',
            orient: orientation,
            annote: annotate,
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
    annotate,
    csvData,
  ]);

  const onCatChange = (name) => setActiveStringColumn(name);
  const onNumChange = (name) => setActiveNumberColumn(name);
  const onHueChange = (name) => setActiveHueColumn(name);

  return (
    <div>
      <div className="flex items-center gap-8 mt-8">
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">
            Categorical Variable
          </p>
          <SingleDropDown
            columnNames={stringColumn}
            onValueChange={onCatChange}
          />
        </div>
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">
            Numerical Variable
          </p>
          <SingleDropDown
            columnNames={numberColumn}
            onValueChange={onNumChange}
          />
        </div>
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">Hue</p>
          <SingleDropDown
            onValueChange={onHueChange}
            columnNames={stringColumn}
          />
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
        <Checkbox color="success" onChange={(e) => setAnnotate(e.valueOf())}>
          Annotate
        </Checkbox>
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
        <div className="py-8">
          <img src={image} alt="" className="w-full" />
        </div>
      )}
    </div>
  );
}

export default BarPlot;
