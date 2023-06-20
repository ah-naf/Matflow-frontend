import { Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import SingleDropDown from "../../../../Components/SingleDropDown/SingleDropDown";

function Add_GroupNumerical({ csvData }) {
  const [nGroups, setNGroups] = useState(2);
  const columnNames = Object.keys(csvData[0]).filter(
    (val) => typeof csvData[0][val] === "number"
  );
  const [nGroupData, setNGroupData] = useState([
    {
      min_value: 0,
      max_value: 0,
      operator: "==",
      value: "",
      bin_value: 0,
      use_operator: false,
    },
    {
      min_value: 0,
      max_value: 0,
      operator: "==",
      value: "",
      bin_value: 0,
      use_operator: false,
    },
  ]);
  const [bin_column, setBin_column] = useState("");
  const [show_bin_dict, setShow_bin_dict] = useState(false);

  const handleOperatorClick = (e, ind) => {
    let tempNGroupData = JSON.parse(JSON.stringify(nGroupData));
    tempNGroupData = tempNGroupData.map((val, i) => {
      if (i === ind) return { ...val, operator: e.valueOf() };
      return val;
    });
    setNGroupData(tempNGroupData);
  };

  return (
    <div>
      <div className="flex gap-8 mb-4">
        <Input
          label="N Groups"
          value={nGroups}
          onChange={(e) => {
            setNGroups(e.target.value);
            setNGroupData([
              ...nGroupData,
              { "1st": "", "2nd": "", operator: false },
            ]);
          }}
          type="number"
        />
        <div className="flex-grow">
          <p>Bin Column</p>
          <SingleDropDown
            columnNames={columnNames}
            onValueChange={setBin_column}
          />
        </div>
        <Checkbox
          color="success"
          onChange={(e) => setShow_bin_dict(e.valueOf())}
        >
          Show Bin Dict
        </Checkbox>
      </div>
      <div className="mt-8">
        {Array.from({ length: nGroups }, (_, index) => {
          return (
            <div key={index} className="flex gap-8 mt-4">
              <div className="flex w-full gap-8">
                {nGroupData[index].operator ? (
                  <>
                    <div className="w-full flex flex-col">
                      <label htmlFor="" className="mb-2 text-sm">
                        Operator
                      </label>
                      <select name="" id="" className="p-2 rounded-lg">
                        <option value="==">==</option>
                        <option value="!=">!=</option>
                        <option value="<">{"<"}</option>
                        <option value=">">{">"}</option>
                        <option value="<=">{"<="}</option>
                        <option value=">=">{">="}</option>
                      </select>
                    </div>
                    <Input label="Value" type="number" fullWidth />
                  </>
                ) : (
                  <>
                    <Input label="Min Value" type="number" fullWidth />
                    <Input label="Max Value" type="number" fullWidth />
                  </>
                )}
                <Input label="Bin Value" type="number" fullWidth />
              </div>
              <Checkbox
                color="success"
                className="w-60"
                onChange={(e) => handleOperatorClick(e, index)}
              >
                Use Operator
              </Checkbox>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Add_GroupNumerical;
