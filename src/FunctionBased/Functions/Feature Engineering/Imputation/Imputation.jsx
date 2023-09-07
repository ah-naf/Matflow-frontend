import { Checkbox } from "@nextui-org/react";
import React from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function Imputation() {
  const handleSave = () => {};
  return (
    <div className="my-8 space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-grow">
          <p>Select Columns</p>
          <SingleDropDown columnNames={["s"]} />
        </div>
        <Checkbox label="Add to pipeline" color="success" />
      </div>
      <div className="">
        <p>Strategy</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div className="">
        <p>Group By</p>
        <SingleDropDown columnNames={["s"]} />
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

export default Imputation;
