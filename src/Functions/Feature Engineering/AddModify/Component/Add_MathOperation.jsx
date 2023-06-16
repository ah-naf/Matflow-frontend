import { Textarea } from "@nextui-org/react";
import React from "react";

function Add_MathOperation({ csvData }) {
  return (
    <div>
      <p>New Value Operation</p>
      <Textarea fullWidth minRows={6} />
      <p className="flex flex-col text-sm text-gray-500 tracking-wide mt-1">
        <span>{"<math expression> <column name>. example: 10 ** Height"}</span>
        <span>Separate all expression with space (including parenthesis).</span>
        <span>Example: Weight / ( Height ** 2 )</span>
      </p>
    </div>
  );
}

export default Add_MathOperation;
