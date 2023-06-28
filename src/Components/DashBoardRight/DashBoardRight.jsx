import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatasetCorrelation from "../../Functions/Dataset/DatasetCorrelation";
import DatasetDisplay from "../../Functions/Dataset/DatasetDisplay";
import DatasetDuplicates from "../../Functions/Dataset/DatasetDuplicates";
import DatasetGroup from "../../Functions/Dataset/DatasetGroup";
import DatasetInformation from "../../Functions/Dataset/DatasetInformation";
import DatasetStatistics from "../../Functions/Dataset/DatasetStatistics";
import BarPlot from "../../Functions/EDA/BarPlot";
import BoxPlot from "../../Functions/EDA/BoxPlot";
import CountPlot from "../../Functions/EDA/CountPlot";
import CustomPlot from "../../Functions/EDA/CustomPlot";
import Histogram from "../../Functions/EDA/Histogram";
import LinePlot from "../../Functions/EDA/LinePlot";
import PiePlot from "../../Functions/EDA/PiePlot";
import RegPlot from "../../Functions/EDA/RegPlot";
import ScatterPlot from "../../Functions/EDA/ScatterPlot";
import ViolinPlot from "../../Functions/EDA/ViolinPlot";
import AddModify from "../../Functions/Feature Engineering/AddModify/AddModify";
import AlterFieldName from "../../Functions/Feature Engineering/AlterFieldName/AlterFieldName";
import AppendDataset from "../../Functions/Feature Engineering/AppendDataset/AppendDataset";
import ChangeDType from "../../Functions/Feature Engineering/ChangeDType/ChangeDType";
import Cluster from "../../Functions/Feature Engineering/Cluster/Cluster";
import DropColumn from "../../Functions/Feature Engineering/DropColumn/DropColumn";
import DropRow from "../../Functions/Feature Engineering/DropRow/DropRow";
import Encoding from "../../Functions/Feature Engineering/Encoding/Encoding";
import FeatureSelection from "../../Functions/Feature Engineering/FeatureSelection/FeatureSelection";
import MergeDataset from "../../Functions/Feature Engineering/MergeDataset/MergeDataset";
import Scaling from "../../Functions/Feature Engineering/Scaling/Scaling";
import BuildModel from "../../Functions/Model Building/BuildModel/BuildModel";
import SplitDataset from "../../Functions/Model Building/SplitDataset/SplitDataset";
import { setFile } from "../../Slices/FeatureEngineeringSlice";
import { fetchDataFromIndexedDB } from "../../util/indexDB";
import TimeSeriesAnalysis from "../../Functions/TimeSeriesAnalysis/TimeSeriesAnalysis";

function DashBoardRight() {
  const activeFunction = useSelector((state) => state.sideBar.activeFunction);
  const activeFile = useSelector((state) => state.uploadedFile.activeFile);
  const dispatch = useDispatch();
  const [csvData, setCsvData] = useState();

  useEffect(() => {
    if (activeFile && activeFile.name) {
      const getData = async () => {
        const res = await fetchDataFromIndexedDB(activeFile.name);
        setCsvData(res);
        dispatch(setFile(res));
      };

      getData();
    }
  }, [activeFile, dispatch]);

  return (
    <div className="flex-grow h-full overflow-y-auto px-6">
      {activeFunction && activeFile ? (
        <>
          {/* Dataset Functions */}

          {activeFunction &&
            (activeFunction === "Display" || activeFunction === "Dataset") && (
              <DatasetDisplay />
            )}
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

          {/* EDA Functions */}

          {activeFunction &&
            (activeFunction === "Bar Plot" || activeFunction === "EDA") && (
              <BarPlot />
            )}
          {activeFunction && activeFunction === "Pie Plot" && <PiePlot />}
          {activeFunction && activeFunction === "Count Plot" && <CountPlot />}
          {activeFunction && activeFunction === "Box Plot" && <BoxPlot />}
          {activeFunction && activeFunction === "Histogram" && <Histogram />}
          {activeFunction && activeFunction === "Violin Plot" && <ViolinPlot />}
          {activeFunction && activeFunction === "Scatter Plot" && (
            <ScatterPlot />
          )}
          {activeFunction && activeFunction === "Reg Plot" && <RegPlot />}
          {activeFunction && activeFunction === "Line Plot" && <LinePlot />}
          {activeFunction && activeFunction === "Custom Plot" && <CustomPlot />}

          {/* Feature Engineering Functions */}

          {csvData &&
            activeFunction &&
            (activeFunction === "Add/Modify" ||
              activeFunction === "Feature Engineering") && (
              <AddModify csvData={csvData} />
            )}
          {activeFunction && activeFunction === "Change Dtype" && (
            <ChangeDType />
          )}
          {activeFunction && activeFunction === "Alter Field Name" && (
            <AlterFieldName />
          )}
          {csvData && activeFunction && activeFunction === "Encoding" && (
            <Encoding csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Scaling" && (
            <Scaling csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Drop Column" && (
            <DropColumn csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Drop Rows" && (
            <DropRow csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Merge Dataset" && (
            <MergeDataset csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Append Dataset" && (
            <AppendDataset csvData={csvData} />
          )}
          {csvData && activeFunction && activeFunction === "Cluster" && (
            <Cluster csvData={csvData} />
          )}
          {csvData &&
            activeFunction &&
            activeFunction === "Feature Selection" && (
              <FeatureSelection csvData={csvData} />
            )}

          {/* Model Building */}

          {csvData &&
            activeFunction &&
            (activeFunction === "Split Dataset" ||
              activeFunction === "Model Building") && (
              <SplitDataset csvData={csvData} />
            )}
          {csvData && activeFunction && activeFunction === "Build Model" && (
            <BuildModel csvData={csvData} />
          )}

          {/* Time Series Analysis */}

          {csvData && activeFunction && activeFunction === "Time Series Analysis" && (
            <TimeSeriesAnalysis csvData={csvData} />
          )}
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
