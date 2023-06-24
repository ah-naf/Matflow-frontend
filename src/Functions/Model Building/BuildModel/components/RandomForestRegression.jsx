import { Slider, Stack } from "@mui/material";
import { Input } from "@nextui-org/react";
import React from "react";
import MultipleDropDown from "../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../Components/SingleDropDown/SingleDropDown";
import styled from "@emotion/styled";

const DISPLAY_METRICES = [
  "R-Squared",
  "Mean Absolute Error",
  "Mean Squared Error",
  "Root Mean Squared Error",
];

const CRITERION = [
  "friedman_mse",
  "squared_error",
  "absolute_error",
  "poisson",
];

const MAX_FEATURE = ["sqrt", "log2", "None"];

function RandomForestRegression() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium tracking-wide mb-2">
          Hyperparameter Optimization Settings
        </h1>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="w-full">
            <p className="mb-1">
              Number of iterations for hyperparameter search
            </p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
          <div className="w-full">
            <p className="mb-1">Number of cross-validation folds</p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
          <div className="w-full">
            <p className="mb-1">Random state for hyperparameter search</p>
            <Input fullWidth bordered color="success" type="number" />
          </div>
        </div>
        <button
          className="self-start border-2 px-4 tracking-wider border-primary-btn text-black font-medium text-sm rounded-md py-2 mt-6"
          // onClick={handleSave}
        >
          Run Optimization
        </button>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-medium tracking-wide mb-3">
          Model Settings
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p>Criterion</p>
            <SingleDropDown columnNames={CRITERION} initValue={CRITERION[0]} />
          </div>
          <div>
            <p>Max Features</p>
            <SingleDropDown
              columnNames={MAX_FEATURE}
              initValue={MAX_FEATURE[0]}
            />
          </div>
        </div>
        <div>
          <div className="mt-4">
            <p className="mb-12">Min. Samples Split</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>2</span>
              <PrettoSlider
                aria-label="Auto Bin Slider"
                min={2}
                max={10}
                step={1}
                defaultValue={2}
                valueLabelDisplay="on"
                color="primary"
              />
              <span>10</span>
            </Stack>
          </div>
          <div className="mt-4">
            <p className="mb-12">Max Depth</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>1</span>
              <PrettoSlider
                aria-label="Auto Bin Slider"
                min={1}
                max={100}
                step={1}
                defaultValue={1}
                valueLabelDisplay="on"
                color="primary"
              />
              <span>100</span>
            </Stack>
          </div>
          <div className="mt-4">
            <p className="mb-12">Min. Samples Leaf</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>1</span>
              <PrettoSlider
                aria-label="Auto Bin Slider"
                min={1}
                max={10}
                step={1}
                defaultValue={1}
                valueLabelDisplay="on"
                color="primary"
              />
              <span>10</span>
            </Stack>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2">Display Metrices</p>
          <MultipleDropDown
            columnNames={DISPLAY_METRICES}
            defaultValue={DISPLAY_METRICES}
          />
        </div>
      </div>
    </div>
  );
}

export default RandomForestRegression;

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
