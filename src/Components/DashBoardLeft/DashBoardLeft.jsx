import React, { useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import FileTab from "../FileTab/FileTab";
import FunctionTab from "../FunctionTab/FunctionTab";

function DashBoardLeft() {
  const [currentTab, setCurrentTab] = useState("file");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-end p-2">
        <AiOutlineDoubleLeft size={"20"} className=" cursor-pointer" />
      </div>
      <div className="flex mt-2 font-roboto gap-2 border-b border-[rgba(0,0,0,0.15)] shadow-sm">
        <button
          className={`py-3 w-full ${
            currentTab === "file" ? "text-primary-btn font-bold" : ""
          } border-b border-transparent  outline-none hover:text-primary-btn hover:border-primary-btn`}
          onClick={() => setCurrentTab("file")}
        >
          File
        </button>
        <button
          className={`py-3 w-full ${
            currentTab === "functions" ? "text-primary-btn font-bold" : ""
          } border-b border-transparent  outline-none hover:text-primary-btn hover:border-primary-btn`}
          onClick={() => setCurrentTab("functions")}
        >
          Functions
        </button>
      </div>
      {currentTab === "file" ? <FileTab /> : <FunctionTab />}
    </div>
  );
}

export default DashBoardLeft;
