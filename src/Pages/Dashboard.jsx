import React from "react";
import DashBoardTop from "../Components/DashBoardTop/DashBoardTop";
import DashBoardLeft from "../Components/DashBoardLeft/DashBoardLeft";

export default function Dashboard() {
  return (
    <div className="h-screen">
      <DashBoardTop />
      <div style={{ height: "calc(100% - 3.91rem)" }} className="flex ">
        <DashBoardLeft />
        <div></div>
      </div>
    </div>
  );
}
