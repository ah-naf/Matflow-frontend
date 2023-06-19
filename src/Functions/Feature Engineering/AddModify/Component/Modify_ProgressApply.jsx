import React from "react";

function Modify_ProgressApply({ csvData }) {
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="">Select Function</label>
        <select className="px-2 py-3 rounded-lg" name="" id="">
          <option value="Compute All Features using RDKit">
            Compute All Features using RDKit
          </option>
          <option value="Chem.inchi.MolTolInchiKey">
            Chem.inchi.MolTolInchiKey
          </option>
        </select>
      </div>
    </div>
  );
}

export default Modify_ProgressApply;
