import { Input } from "@nextui-org/react";
import React from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function AppendDataset() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div>
        <p>Select Dataset You Wanna Append With</p>
        <SingleDropDown columnNames={["s"]} />
      </div>
      <div>
        <Input bordered color="success" fullWidth label="New Dataset Name" />
      </div>
      <button
        className="self-start border-2 px-6 tracking-wider bg-primary-btn text-white font-medium rounded-md py-2 mt-8"
        // onClick={handleSave}
      >
        Append
      </button>
    </div>
  );
}

export default AppendDataset;
