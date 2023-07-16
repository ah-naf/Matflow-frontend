import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import MultipleDropDown from "../../../FunctionBased/Components/MultipleDropDown/MultipleDropDown";

function UpdateReverseMLNode({ visible, setVisible, csvData }) {
  const allColumnName = Object.keys(csvData[0]);
  const [allTargetColumn, setAllTargetColumn] = useState(
    Object.keys(csvData[0])
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectFeature, setSelectFeature] = useState();
  const [targetVariable, setTargetVariable] = useState();
  const [enterValues, setEnterValues] = useState("");
  const [mlData, setMlData] = useState();
  const [columnDef, setColumnDef] = useState();

  const handleSelectFeature = (e) => {
    setSelectFeature(e);
    const ache = new Set(e);
    const temp = [];
    allColumnName.forEach((val) => {
      if (!ache.has(val)) temp.push(val);
    });
    setAllTargetColumn(temp);
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={() => setVisible(false)}
        fullScreen={fullScreen}
        scroll="paper"
      >
        <span
          className="ml-auto p-2 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <CloseIcon color="action" />
        </span>
        <h1 className="text-center font-medium tracking-wider text-3xl">
          Edit ReverseML Options
        </h1>
        <div className="min-w-[500px] mx-auto w-full p-6 py-4">
          <div>
            <p>Select Features</p>
            <MultipleDropDown
              columnNames={allColumnName}
              setSelectedColumns={(e) => handleSelectFeature(e)}
              defaultValue={selectFeature}
            />
          </div>
          <div className="mt-4">
            <p>Select Target Variables</p>
            <MultipleDropDown
              columnNames={allTargetColumn}
              setSelectedColumns={setTargetVariable}
              defaultValue={targetVariable}
            />
          </div>
          <div className="mt-8">
            <h1 className="font-medium text-xl mb-4 tracking-wide">
              Prediction for All Target Variables
            </h1>
            <p className="mb-2">{`Enter values for ${
              targetVariable && targetVariable.length > 0
                ? JSON.stringify(targetVariable)
                : ""
            }`}</p>
            <Input
              bordered
              fullWidth
              size="lg"
              value={enterValues}
              onChange={(e) => setEnterValues(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default UpdateReverseMLNode;
