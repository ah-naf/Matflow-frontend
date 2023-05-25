import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineDocumentReport, HiOutlinePuzzle } from "react-icons/hi";
import { RxGear, RxRocket } from "react-icons/rx";
import { MdOutlineDataset } from "react-icons/md";
import { RiFlowChart } from "react-icons/ri";
import { TbBrain } from "react-icons/tb";
import { GrDeploy } from "react-icons/gr";
import { SlMagnifier } from "react-icons/sl";
import { setActiveFunction } from "../../Slices/SideBarSlice";

const functionsName = [
  { name: "Dataset", icon: <MdOutlineDataset size={"25"} /> },
  { name: "EDA", icon: <SlMagnifier size={"25"} /> },
  { name: "Feature Engineering", icon: <RxGear size={"25"} /> },
  { name: "Final Dataset", icon: <HiOutlineDocumentReport size={"25"} /> },
  { name: "Pipeline", icon: <RiFlowChart size={"25"} /> },
  { name: "Model Building", icon: <TbBrain size={"25"} /> },
  { name: "Model Deployment", icon: <RxRocket size={"25"} /> },
  { name: "Time Series Analysis", icon: <AiOutlineLineChart size={"25"} /> },
  { name: "ReverseML", icon: <HiOutlinePuzzle size={"25"} /> },
];

function FunctionTab() {
  const activeCsvFile = useSelector((state) => state.uploadedFile.activeFile);
  const activeFunction = useSelector(state => state.sideBar.activeFunction)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const temp = localStorage.getItem('activeFunction')
    if(temp) {
      dispatch(setActiveFunction(temp));
    }
  }, [dispatch])

  const handleClick = (name) => {
    dispatch(setActiveFunction(name));
    localStorage.setItem('activeFunction', name);
  }

  return (
    <div className="px-2 mt-4">
      {activeCsvFile ? (
        functionsName.map((item, ind) => {
          return (
            <div
              key={ind}
              className="w-full mb-2"
              onClick={() => handleClick(item.name)}
            >
              <div
                className={`flex cursor-pointer items-center py-2 px-4 gap-3 rounded hover:text-gray-50 ${item.name === activeFunction ? 'text-gray-50 font-bold bg-[#287e5a] rounded-md' : 'text-gray-300 hover:bg-[#287e5a] '}`}
                // onClick={() => handleFileSelect(item)}
              >
                <p className="">{item.icon}</p>
                <p className="tracking-wide">{item.name}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="mt-4 p-2 text-center text-white tracking-wide font-bold text-lg">
          Please select a file to view the functions.
        </p>
      )}
    </div>
  );
}

export default FunctionTab;
