import { Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import MultipleDropDown from "../../../../Components/MultipleDropDown/MultipleDropDown";
import SingleDropDown from "../../../../Components/SingleDropDown/SingleDropDown";

function Add_GroupCategorical({ csvData }) {
  const [nGroups, setNGroups] = useState(2);
  const columnNames = Object.keys(csvData[0]).filter(
    (val) => typeof csvData[0][val] === "number"
  );
  const [nGroupData, setNGroupData] = useState([
    {
      group_name: 0,
      group_members: 0,
    },
    {
      group_name: 0,
      group_members: 0,
    },
  ]);

  const handleOperatorClick = (e, ind) => {
    let tempNGroupData = JSON.parse(JSON.stringify(nGroupData));
    tempNGroupData = tempNGroupData.map((val, i) => {
      if (i === ind) return { ...val, operator: e.valueOf() };
      return val;
    });
    setNGroupData(tempNGroupData);
  };

  return (
    <div className="mt-12">
      <div className="flex gap-8 mb-4">
        <Input
          label="N Groups"
          value={nGroups}
          onChange={(e) => {
            setNGroups(e.target.value);
          }}
          type="number"
        />
        <div className="flex-grow">
          <p>Group Column</p>
          <SingleDropDown columnNames={columnNames} />
        </div>
        <div className="flex flex-col gap-2">
          <Checkbox defaultSelected={true} color="success">
            Sort Value
          </Checkbox>
          <Checkbox color="success">Show Group</Checkbox>
        </div>
      </div>
      <div className="mt-8">
        {Array.from({ length: nGroups }, (_, index) => {
          return (
            <div key={index} className="flex gap-8 mt-4">
              <div>
                <Input label="Group Name" fullWidth />
              </div>
              <div className="flex-grow">
                <p>Group Members</p>
                <MultipleDropDown columnNames={['0.38']} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Add_GroupCategorical;
