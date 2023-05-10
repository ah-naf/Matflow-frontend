import React, { useRef, useState } from 'react'
import Papa from "papaparse";

function UploadFile() {
  const [fileData, setFileData] = useState();
  const [gridRow, setGridRow] = useState();
  const [gridColumn, setGridColumn] = useState();
  const inputRef = useRef();

  const changeHandler = (event) => {
    event.preventDefault()
    Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            const tempRow = [];
            const tempCol = [];

            results.data.map(d => {
                tempRow.push(Object.keys(d));
                if(tempCol.length < 5) tempCol.push(Object.values(d));
            })

            setFileData(results.data)
            setGridColumn(tempCol);
            setGridRow(tempRow[0]);
            console.log(tempCol.length)
        }
    })
  }

  return (
    <div className='bg-[rgba(0,0,0,0.25)] text-[10px] p-4 rounded-sm text-white'>
        {fileData === undefined ? 
        <>
            <h3 className='mb-2'>Please upload a CSV file</h3>
            <input type="file" className="block w-full text-[8px] text-slate-500
            file:mr-2 file:px-3 file:py-1
            file:rounded-full file:border-0
            file:text-[8px] file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 file:cursor-pointer
            " onChange={changeHandler}/>
        </> : 
        <>
            <p className='font-medium text-[10px] mb-1'>File uploaded successfully.</p>
            <div className='p-2 border w-60 h-36 overflow-scroll '>
                <table className='w-full text-[8px] text-left text-gray-500'>
                    <thead className='text-xs text-white0 uppercase bg-gray-50'>
                        <tr>
                            {gridRow.map((rows, index) => {
                                return <th scope='col' className='px-2 text-[9px] py-1' key={index}>{rows}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {gridColumn.map((cols, index) => {
                            console.log(cols);
                            return;
                            return <tr className='bg-white border-b' key={index}>
                                {cols.map((col, ind) => {
                                    <td className='px-2 py-1' key={ind}>{col}</td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            
            <p className='text-[8px] font-light mt-1'>Showing first 5 results</p>
        </>}
    </div>
  )
}

export default UploadFile