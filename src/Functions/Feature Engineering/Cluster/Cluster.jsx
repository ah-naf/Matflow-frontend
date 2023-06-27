import styled from "@emotion/styled";
import { Slider, Stack } from "@mui/material";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";
import {
  fetchDataFromIndexedDB,
  updateDataInIndexedDB,
} from "../../../util/indexDB";

function Cluster({ csvData }) {
  const allColumns = Object.keys(csvData[0]);
  const [numberOfClass, setNumberOfClass] = useState(3);
  const [display_type, setDisplayType] = useState("Graph");
  const [target_variable, setTargetVariable] = useState("");
  const [data, setData] = useState(["", "", ""]);
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);

  const handleSave = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cluster/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: csvData,
          display_type,
          target_variable,
          data,
        }),
      });
      let Data = await res.json();

      let fileName = activeCsvFile.name;

      const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
      const fileExist = uploadedFiles.filter((val) => val.name === fileName);

      if (fileExist.length === 0) {
        uploadedFiles.push({ name: fileName });
      }
      localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

      const temp = await fetchDataFromIndexedDB(fileName);
      await updateDataInIndexedDB(fileName, Data);

      toast.success(`Data updated successfully!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="mt-8">
      <div>
        <p>Number of classes</p>
        <div className="mt-12">
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <span>1</span>
            <PrettoSlider
              aria-label="Auto Bin Slider"
              min={1}
              max={10}
              step={1}
              defaultValue={3}
              value={numberOfClass}
              onChange={(e) => {
                const val = e.target.value;
                setNumberOfClass(val);
                if (val < data.length) setData(data.slice(0, val));
                else {
                  const temp = JSON.parse(JSON.stringify(data));
                  while (val - temp.length > 0) {
                    temp.push("");
                  }
                  setData(temp);
                }
              }}
              valueLabelDisplay="on"
              color="primary"
            />
            <span>10</span>
          </Stack>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-4">
        {data.map((val, index) => {
          return (
            <div key={index} className="">
              <Input
                fullWidth
                label={`Class ${index + 1} Name`}
                required
                value={val}
                onChange={(e) =>
                  setData(
                    data.map((d, ind) => {
                      if (ind === index) return e.target.value;
                      return d;
                    })
                  )
                }
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <p>Display Type</p>
          <SingleDropDown
            columnNames={["Graph", "Table"]}
            onValueChange={setDisplayType}
            initValue={display_type}
          />
        </div>
        <div>
          <p>Target Variable</p>
          <SingleDropDown
            columnNames={allColumns}
            onValueChange={setTargetVariable}
          />
        </div>
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        onClick={handleSave}
      >
        Submit
      </button>
    </div>
  );
}

export default Cluster;

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
