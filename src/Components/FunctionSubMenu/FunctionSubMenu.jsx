import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSubFunction } from "../../Slices/SideBarSlice";

const functionSubMenu = [
  "Display",
  "Information",
  "Statistices",
  "Corelation",
  "Duplicate",
  "Group",
];

function FunctionSubMenu() {
  const activeSubFunction = useSelector(
    (state) => state.sideBar.activeSubFunction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const temp = localStorage.getItem('activeSubFunction')
    if(temp) {
        dispatch(setActiveSubFunction(temp));
    }
  }, [dispatch])

  const handleClick = (name) => {
    dispatch(setActiveSubFunction(name))
    localStorage.setItem('activeSubFunction', name);
  }

  return (
    <div className="w-full">
      <div className="border-b-2">
        {functionSubMenu.map((item, ind) => (
          <button
            key={ind}
            className={`py-3 tracking-wider outline-none px-6 border-b-2 ${
              item === activeSubFunction
                ? " text-[#208059] border-[#208059] font-bold"
                : "font-light hover:bg-[#e0f3e8] border-transparent"
            }`}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FunctionSubMenu;
