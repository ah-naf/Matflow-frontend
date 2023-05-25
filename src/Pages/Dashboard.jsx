import DashBoardTop from "../Components/DashBoardTop/DashBoardTop";
import DashBoardLeft from "../Components/DashBoardLeft/DashBoardLeft";
import DashBoardRight from "../Components/DashBoardRight/DashBoardRight";

export default function Dashboard() {
  return (
    <div className="h-screen">
      <DashBoardTop />
      <div style={{ height: "calc(100% - 3.91rem)" }} className="flex gap-4">
        <DashBoardLeft />
        <DashBoardRight />
      </div>
    </div>
  );
}
