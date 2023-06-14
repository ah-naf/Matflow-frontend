import { useSelector } from "react-redux";
import DatasetCorrelation from "../../Functions/Dataset/DatasetCorrelation";
import DatasetDisplay from "../../Functions/Dataset/DatasetDisplay";
import DatasetDuplicates from "../../Functions/Dataset/DatasetDuplicates";
import DatasetGroup from "../../Functions/Dataset/DatasetGroup";
import DatasetInformation from "../../Functions/Dataset/DatasetInformation";
import DatasetStatistics from "../../Functions/Dataset/DatasetStatistics";
import BarPlot from "../../Functions/EDA/BarPlot";
import BoxPlot from "../../Functions/EDA/BoxPlot";
import CountPlot from "../../Functions/EDA/CountPlot";
import PiePlot from "../../Functions/EDA/PiePlot";
import Histogram from "../../Functions/EDA/Histogram";

function DashBoardRight() {
  const activeFunction = useSelector((state) => state.sideBar.activeFunction);
  const activeFile = useSelector((state) => state.uploadedFile.activeFile);

  return (
    <div className="flex-grow h-full overflow-y-auto px-6">
      {activeFunction && activeFile ? (
        <>
          {activeFunction && activeFunction === "Display" && <DatasetDisplay />}
          {activeFunction && activeFunction === "Information" && (
            <DatasetInformation />
          )}
          {activeFunction && activeFunction === "Statistics" && (
            <DatasetStatistics />
          )}
          {activeFunction && activeFunction === "Corelation" && (
            <DatasetCorrelation />
          )}
          {activeFunction && activeFunction === "Duplicate" && (
            <DatasetDuplicates />
          )}
          {activeFunction && activeFunction === "Group" && <DatasetGroup />}
          {activeFunction && activeFunction === "Bar Plot" && <BarPlot />}
          {activeFunction && activeFunction === "Pie Plot" && <PiePlot />}
          {activeFunction && activeFunction === "Count Plot" && <CountPlot />}
          {activeFunction && activeFunction === "Box Plot" && <BoxPlot />}
          {activeFunction && activeFunction === "Histogram" && <Histogram />}
        </>
      ) : (
        <div className="w-full h-full grid place-content-center">
          <h1 className="text-3xl tracking-wide text-center">
            Please select a function to continue...
          </h1>
        </div>
      )}
    </div>
  );
}

export default DashBoardRight;
