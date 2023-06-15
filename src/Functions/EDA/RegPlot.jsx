import { Checkbox, Input, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleDropDown from "../../Components/SingleDropDown/SingleDropDown";
import { fetchDataFromIndexedDB } from "../../util/indexDB";

function RegPlot() {
  const [csvData, setCsvData] = useState();
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [numberColumn, setNumberColumn] = useState([]);
  const [x_var, setX_var] = useState("");
  const [y_var, setY_var] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [title, setTitle] = useState();
  const [scatter, setScatter] = useState(true);

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

        setNumberColumn(tempNumberColumn);
      };

      getData();
    }
  }, [activeCsvFile]);

  useEffect(() => {
    if (x_var && y_var && csvData) {
      const fetchData = async () => {
        setLoading(true);
        setImage("");
        const resp = await fetch("http://127.0.0.1:8000/api/eda_regplot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x_var,
            y_var,
            title: title || "",
            scatter,
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
  }, [x_var, y_var, scatter, csvData, title]);

  return (
    <div>
      <div className="flex items-center gap-8 mt-8">
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">X Variable</p>
          <SingleDropDown columnNames={numberColumn} onValueChange={setX_var} />
        </div>
        <div className="w-full">
          <p className="text-lg font-medium tracking-wide">Y Variable</p>
          <SingleDropDown columnNames={numberColumn} onValueChange={setY_var} />
        </div>
        <div className="w-full flex flex-col gap-4 mt-4 tracking-wider">
          <Checkbox color="success" onChange={(e) => setShowTitle(e.valueOf())}>
            Title
          </Checkbox>
          <Checkbox
            color="success"
            defaultSelected
            onChange={(e) => setScatter(e.valueOf())}
          >
            Scatter
          </Checkbox>
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

export default RegPlot;
