import { Input } from "@nextui-org/react";
import React from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function MergeDataset() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div>
        <p>Select Dataset You Wanna Merge With</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div>
        <Input bordered color="success" fullWidth label="New Dataset Name" />
      </div>
      <div>
        <p>How</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div>
        <p>Select column name for left dataframe:</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div>
        <p>Select column name for right dataframe:</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
      >
        Merge
      </button>
    </div>
  );
}

export default MergeDataset;
