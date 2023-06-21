import styled from "@emotion/styled";
import { Slider, Stack } from "@mui/material";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function Cluster({ csvData }) {
  const allColumns = Object.keys(csvData[0]);
  const [numberOfClass, setNumberOfClass] = useState(3);
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
              onChange={(e) => setNumberOfClass(e.target.value)}
              valueLabelDisplay="on"
              color="primary"
            />
            <span>10</span>
          </Stack>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-4">
        {Array.from({ length: numberOfClass }, (_, index) => {
          return (
            <div key={index} className="">
              <Input fullWidth label={`Class ${index + 1} Name`} required />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <p>Display Type</p>
          <SingleDropDown columnNames={["Graph", "Table"]} />
        </div>
        <div>
          <p>Target Variable</p>
          <SingleDropDown columnNames={allColumns} />
        </div>
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
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
