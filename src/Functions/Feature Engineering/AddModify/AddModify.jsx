import { Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../Components/SingleDropDown/SingleDropDown";

function AddModify() {
  const [currentOption, setCurrentOption] = useState("Add");
  return (
    <div>
      <div className="flex justify-between items-end gap-8 mt-8">
        <div className="w-full flex flex-col">
          <label
            className="mb-1 text-lg tracking-wide font-medium"
            htmlFor="option"
          >
            Option
          </label>
          <select
            name=""
            id="option"
            className="py-[0.6rem] rounded-xl px-3"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
          >
            <option value="Add">Add</option>
            <option value="Modify">Modify</option>
          </select>
        </div>
        <div className="w-full flex flex-col">
          <label className=" text-lg tracking-wide font-medium" htmlFor="">
            {currentOption === "Add" ? "New column name" : "Select Column"}
          </label>
          {currentOption === "Add" ? (
            <Input bordered color="success" className="mt-1" />
          ) : (
            <SingleDropDown columnNames={["s"]} />
          )}
        </div>
        <div className="w-full flex flex-col">
          <label
            className="mb-1 text-lg tracking-wide font-medium"
            htmlFor="method"
          >
            Method
          </label>
          <select
            name=""
            id="method"
            className="py-[0.6rem] rounded-xl px-3"
            onChange={(e) => console.log(e.target.value)}
          >
            {currentOption === "Add" && (
              <option value="New Column">New Column</option>
            )}
            <option value="Math Operation">Math Operation</option>
            <option value="Extract Text">Extract Text</option>
            <option value="Group Categorical">Group Categorical</option>
            <option value="Group Numerical">Group Numerical</option>
            {currentOption === "Modify" && (
              <>
                <option value="Replace Values">Replace Values</option>
                <option value="Progress Apply">Progress Apply</option>
              </>
            )}
          </select>
        </div>
        <div className="w-full flex flex-col">
          <Checkbox defaultSelected color="success">
            Add To Pipeline
          </Checkbox>
          <button className="border-2 tracking-wider w-max bg-transparent border-primary-btn py-1 text-sm px-5 hover:bg-primary-btn hover:text-white mt-2 rounded">
            Show Sample
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModify;
