import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

function FileTab() {
  const [fileActiveId, setFileActiveId] = useState(1);
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadSectionHeight, setUploadSectionHeight] = useState(0);
  const inputRef = useRef();
  const uploadSection = useRef()

  useEffect(() => {
    setUploadSectionHeight(uploadSection.current.clientHeight)
    console.log(uploadSection.current.clientHeight)
  }, [])

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      setUploadedFile(e.dataTransfer.files[0]);
      console.log(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between" style={{minHeight: `calc(100% - ${uploadSectionHeight}px)`}}>
      <div className="p-2 w-full h-full overflow-y-auto">
        {[0, 1].map((item, ind) => {
          return (
            <div key={ind}>
              <div
                className={`flex cursor-pointer items-center group justify-between mt-2 px-2 py-3 rounded ${
                  fileActiveId === item
                    ? "bg-primary-btn text-white"
                    : "bg-white"
                }`}
                onClick={() => setFileActiveId(item)}
              >
                <p
                  className={`flex tracking-wide gap-1 items-center ${
                    fileActiveId === item ? "font-bold" : ""
                  }`}
                >
                  {" "}
                  <span>
                    {fileActiveId === item && <BsFillPlayFill />}
                  </span>{" "}
                  AirPassenger.csv
                </p>
                <button className="hidden group-hover:flex">
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="p-2 pt-4 rounded text-end "
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        ref={uploadSection}
      >
        <form
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onSubmit={(e) => e.preventDefault()}
          
          className="bg-[#f8fafc] rounded py-2 border-[#cbd5e1] text-center border-2 border-dashed"
        >
          <label htmlFor="input-file-upload" className="">
            <p className="text-sm">Drag and drop your file or</p>
            <p className="hover:underline text-sm cursor-pointer">
              Upload a File
            </p>

            {uploadedFile ? (
              <p className="font-bold tracking-wide text-md">
                {uploadedFile.name}
              </p>
            ) : (
              <p className="text-xs font-light">Limit 200MB per file</p>
            )}
          </label>
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            hidden
            onChange={(e) => setUploadedFile(e.target.files[0])}
          />
        </form>
        <button className="mt-2 outline-none bg-primary-btn text-white text-sm font-medium px-4 py-2 rounded text">
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileTab;
