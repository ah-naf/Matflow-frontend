import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import { Collapse } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineFile,
  AiOutlineGroup,
  AiOutlineLineChart,
  AiOutlineMergeCells,
} from "react-icons/ai";
import { BiStats, BiText } from "react-icons/bi";
import { BsTable } from "react-icons/bs";
import { GrTableAdd } from "react-icons/gr";
import { HiOutlineDocumentDuplicate, HiOutlinePuzzle } from "react-icons/hi";
import { RiFileEditLine } from "react-icons/ri";
import { RxRocket } from "react-icons/rx";
import { TbCirclesRelation } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setShowLeftSideBar } from "../../../Slices/SideBarSlice";

const FEATURE_ENGINEERING = [
  {
    key: "2-0",
    label: "Add/Modify",
    icon: <RiFileEditLine className="text-[rgba(0,0,0,0.54)]" size={"20"} />,
  },
  {
    key: "2-1",
    label: "Change Dtype",
    icon: <AutoFixHighOutlinedIcon color="action" />,
  },
  {
    key: "2-2",
    label: "Alter Field Name",
    icon: <TextFieldsOutlinedIcon color="action" />,
  },
  {
    key: "2-3",
    label: "Imputation",
  },
  {
    key: "2-4",
    label: "Encoding",
  },
  {
    key: "2-5",
    label: "Scaling",
  },
  {
    key: "2-6",
    label: "Drop Column/Rows",
    icon: <RemoveCircleOutlineOutlinedIcon color="action" />,
  },
  {
    key: "2-9",
    label: "Append Dataset",
    icon: <GrTableAdd className="opacity-70" size={"20"} />,
  },
  {
    key: "2-10",
    label: "Merge Dataset",
    icon: (
      <AiOutlineMergeCells className="text-[rgba(0,0,0,0.54)]" size={"20"} />
    ),
  },
  {
    key: "2-11",
    label: "Feature Selection",
  },
  {
    key: "2-12",
    label: "Cluster",
  },
];

const DATASET_NODES = [
  {
    key: "0-1",
    icon: <InfoOutlinedIcon color="action" />,
    label: "Information",
  },
  {
    key: "0-2",
    label: "Statistics",
    icon: <BiStats size={20} className="text-[rgba(0,0,0,0.54)]" />,
  },
  {
    key: "0-3",
    label: "Corelation",
    icon: <TbCirclesRelation size={20} className="text-[rgba(0,0,0,0.54)]" />,
  },
  {
    key: "0-4",
    label: "Duplicate",
    icon: (
      <HiOutlineDocumentDuplicate
        size={20}
        className="text-[rgba(0,0,0,0.54)]"
      />
    ),
  },
  {
    key: "0-5",
    label: "Group",
    icon: <AiOutlineGroup size={20} className="text-[rgba(0,0,0,0.54)]" />,
  },
];

const MODEL_BUILDING = [
  {
    key: "5-0",
    label: "Split Dataset",
    icon: <SplitscreenIcon color="action" />,
  },
  {
    key: "5-1",
    label: "Build Model",
  },
  {
    key: "5-2",
    label: "Model Evaluation",
  },
  {
    key: "5-3",
    label: "Model Prediction",
  },
  {
    key: "5-4",
    label: "Hyper-parameter Optimization",
  },
];

const FUNCTION_NODES = [
  {
    key: "1",
    label: "EDA",
    icon: <InsertChartOutlinedIcon color="action" />,
    children: [],
  },

  // {
  //   key: "3",
  //   label: "Final Dataset",
  //   icon: (
  //     <HiOutlineDocumentReport
  //       className="text-[rgba(0,0,0,0.54)]"
  //       size={"20"}
  //     />
  //   ),
  //   children: [],
  // },
  // {
  //   key: "4",
  //   label: "Pipeline",
  //   icon: <RiFlowChart className="text-[rgba(0,0,0,0.54)]" size={"20"} />,
  //   children: [],
  // },
  {
    key: "6",
    label: "Model Deployment",
    icon: <RxRocket className="text-[rgba(0,0,0,0.54)]" size={"20"} />,
    children: [],
  },
  {
    key: "7",
    label: "Time Series Analysis",
    icon: (
      <AiOutlineLineChart className="text-[rgba(0,0,0,0.54)]" size={"20"} />
    ),
    children: [],
  },
  {
    key: "8",
    label: "ReverseML",
    icon: <HiOutlinePuzzle className="text-[rgba(0,0,0,0.54)]" size={"20"} />,
    children: [],
  },
];

const IO_NODES = [
  {
    key: "0-0-1",
    label: "Upload File",
    icon: <CloudUploadOutlinedIcon color="action" />,
  },
  {
    key: "0-0-2",
    label: "Graph",
    icon: <AutoGraphOutlinedIcon color="action" />,
  },
  {
    key: "0-0-3",
    label: "Table",
    icon: <BsTable className="text-[rgba(0,0,0,0.54)]" size={20} />,
  },
  {
    key: "0-0-4",
    label: "Test-Train Dataset",
  },
  {
    key: "0-0-5",
    label: "Model",
  },
  {
    key: "0-0-6",
    label: "Text",
    icon: <BiText className="text-[rgba(0,0,0,0.54)]" size={20} />,
  },
  {
    key: "0-0-7",
    label: "File",
    icon: <AiOutlineFile className="text-[rgba(0,0,0,0.54)]" size={20} />,
  },
];

const Sidebar = ({ onValueChange }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const dispatch = useDispatch();
  const showLeftSidebar = useSelector((state) => state.sideBar.showLeftSideBar);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      onValueChange(ref.current.offsetWidth);
    }
  }, [ref.current]);

  return (
    <div
      className={`relative top-[70px] z-50 overflow-y-auto grid place-items-center ${
        !showLeftSidebar ? "w-0" : "w-96"
      } transition-[width] border-r shadow `}
      ref={ref}
      style={{ height: "calc(100vh - 70px)" }}
    >
      {showLeftSidebar && (
        <button
          onClick={() => dispatch(setShowLeftSideBar(!showLeftSidebar))}
          className="absolute z-[50] right-0 top-0 translate-y-1/2 -translate-x-1/2 border p-1 px-1.5 border-gray-400/70 rounded text-gray-700 "
        >
          <AiOutlineDoubleLeft size="15" />
        </button>
      )}
      <aside className="bg-white h-full w-full p-4 border-l-2 shadow-2xl ">
        <h3 className="font-bold  text-3xl mb-2">Node Packet</h3>
        <p className=" mb-4">Drag and Drop nodes onto your editor.</p>
        <div className="grid gap-4">
          {/* Input-Output Nodes */}
          <Collapse.Group bordered>
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">
                  Input-Output Nodes
                </h1>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                {IO_NODES.map((node) => {
                  return (
                    <button
                      key={node.key}
                      className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                      onDragStart={(event) => onDragStart(event, node.label)}
                      draggable
                    >
                      {node.icon && <span>{node.icon}</span>}
                      <span className="text-xs">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </Collapse>
          </Collapse.Group>

          {/* Dataset Nodes */}
          <Collapse.Group bordered>
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">Dataset Nodes</h1>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                {DATASET_NODES.map((node) => {
                  return (
                    <button
                      key={node.key}
                      className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                      onDragStart={(event) => onDragStart(event, node.label)}
                      draggable
                    >
                      {node.icon && <span>{node.icon}</span>}
                      <span className="text-xs">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </Collapse>
          </Collapse.Group>

          {/* Function Nodes */}
          <Collapse.Group bordered>
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">Function Nodes</h1>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                {FUNCTION_NODES.map((node) => {
                  if (node.children.length === 0) {
                    return (
                      <button
                        key={node.key}
                        className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                        onDragStart={(event) => onDragStart(event, node.label)}
                        draggable
                      >
                        {node.icon && <span>{node.icon}</span>}
                        <span className="text-xs">{node.label}</span>
                      </button>
                    );
                  }
                })}
              </div>
            </Collapse>
          </Collapse.Group>

          {/* Feature Engineering Nodes */}
          <Collapse.Group bordered>
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">
                  Feature Engineering
                </h1>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                {FEATURE_ENGINEERING.map((node) => (
                  <button
                    className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                    onDragStart={(event) => onDragStart(event, node.label)}
                    draggable
                    key={node.key}
                  >
                    {node.icon && <span>{node.icon}</span>}
                    <span className="text-xs">{node.label}</span>
                  </button>
                ))}
              </div>
            </Collapse>
          </Collapse.Group>

          {/* Model Building Nodes */}
          <Collapse.Group bordered>
            <Collapse
              title={
                <h1 className="font-medium tracking-wider">
                  Model Building Nodes
                </h1>
              }
            >
              <div className="grid grid-cols-3 gap-4">
                {MODEL_BUILDING.map((node) => (
                  <button
                    className="grid gap-1 place-items-center border-2 px-2 py-3 rounded-md shadow text-sm "
                    onDragStart={(event) => onDragStart(event, node.label)}
                    draggable
                    key={node.key}
                  >
                    {node.icon && <span>{node.icon}</span>}
                    <span className="text-xs">{node.label}</span>
                  </button>
                ))}
              </div>
            </Collapse>
          </Collapse.Group>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
