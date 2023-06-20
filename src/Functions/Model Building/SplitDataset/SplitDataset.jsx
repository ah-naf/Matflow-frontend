import styled from "@emotion/styled";
import { Slider, Stack } from "@mui/material";
import { Checkbox, Input } from "@nextui-org/react";
import React from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function SplitDataset({ csvData }) {
  const columnNames = Object.keys(csvData[0]);
  return (
    <div className="mt-8">
      <div className="flex items-center gap-8">
        <div className="w-full">
          <p>Target Variable</p>
          <SingleDropDown columnNames={columnNames} />
        </div>
        <div className="w-full">
          <p>Stratify</p>
          <SingleDropDown columnNames={["-", ...columnNames]} />
        </div>
      </div>
      <div className="flex items-center mt-12 gap-8">
        <div className="w-full">
          <Input
            label="Test Size"
            size="lg"
            fullWidth
            type="number"
            step={0.01}
          />
        </div>
        <div className="w-full">
          <p>Random State</p>
          <div className="mt-2">
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>0</span>
              <PrettoSlider
                aria-label="Random State Slider"
                min={0}
                max={1000}
                step={1}
                defaultValue={0}
                // value={autoBinValue}
                // onChange={(e) => setAutoBinValue(e.target.value)}
                valueLabelDisplay="on"
                color="primary"
              />
              <span>1000</span>
            </Stack>
          </div>
        </div>
        <Checkbox>Shuffle</Checkbox>
      </div>
      <div className="mt-12 flex  gap-4">
        <div className="w-full">
          <Input
            label="Train Data Name"
            fullWidth
            color="success"
            size="xl"
            value={"name"}
            labelLeft="train_"
          />
        </div>
        <div className="w-full">
          <Input
            label="Test Data Name"
            fullWidth
            size="xl"
            color="success"
            value={"name"}
            labelLeft="test_"
          />
        </div>
        <div className="w-full">
          <Input
            label="Splitted Dataset Name"
            fullWidth
            size="xl"
            helperColor="success"
          />
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

export default SplitDataset;

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 22,
    width: 22,
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
    transform: "translate(50%, -100%) rotate(90deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -0%) rotate(135deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(-135deg)",
    },
  },
});
