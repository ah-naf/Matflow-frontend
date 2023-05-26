import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setActiveFile } from "../../Slices/UploadedFileSlice";
import {
  deleteIndexedDB,
  parseCsv,
  storeDataInIndexedDB,
} from "../../util/indexDB";
import {
  setActiveFunction,
  setActiveSubFunction,
} from "../../Slices/SideBarSlice";

function FileTab() {
  const [files, setFiles] = useState([]);
  const [fileActiveId, setFileActiveId] = useState();
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadSectionHeight, setUploadSectionHeight] = useState(0);
  const inputRef = useRef();
  const uploadSection = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setUploadSectionHeight(uploadSection.current.clientHeight);
    const tempFiles = localStorage.getItem("uploadedFiles");
    if (tempFiles) {
      setFiles(JSON.parse(tempFiles));
    }
    const tempActiveFile = localStorage.getItem("activeFile");
    if (tempActiveFile) {
      dispatch(setActiveFile(JSON.parse(tempActiveFile)));
      setFileActiveId(JSON.parse(tempActiveFile).name);
    }
  }, [dispatch]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      const parsedData = await parseCsv(file);
      storeDataInIndexedDB(parsedData, file.name);
    }
  };

  const handleDelete = async (name) => {
    const tempFiles = files.filter((item) => item.name != name);
    setFiles(tempFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));
    if (name === fileActiveId) {
      localStorage.removeItem("activeFile");
      dispatch(setActiveFile(null));
      setFileActiveId("");
      dispatch(setActiveFunction(""));
      dispatch(setActiveSubFunction(""));
    }
    window.location.reload()
    await deleteIndexedDB(name);
    
  };

  const handleFileSelect = (name) => {
    setFileActiveId(name);
    const active = files.filter((item) => item.name === name)[0];
    dispatch(setActiveFile(active));
    localStorage.setItem("activeFile", JSON.stringify(active));
    window.location.reload()
  };

  const handleFileUpload = async () => {
    if (uploadedFile) {
      const tempFiles = [...files, { name: uploadedFile.name }];
      setFiles(tempFiles);
      localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));

      const parsedData = await parseCsv(uploadedFile);
      await storeDataInIndexedDB(parsedData, uploadedFile.name);
      setUploadedFile("");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div
      className="flex flex-col h-full justify-between"
      style={{ minHeight: `calc(100% - ${uploadSectionHeight}px)` }}
    >
      <div className="p-2 w-full h-full overflow-y-auto">
        {files && files.length > 0 ? (
          files.map((item, ind) => {
            return (
              <div key={ind}>
                <div
                  className={`flex cursor-pointer  items-center group justify-between mt-2 px-2 py-3 rounded ${
                    fileActiveId === item.name
                      ? "bg-[#287e5a] text-gray-100"
                      : "text-gray-300 hover:bg-[#276a4e] hover:text-gray-100"
                  }`}
                >
                  <p
                    className={`flex w-full tracking-wide gap-1 items-center ${
                      fileActiveId === item.name ? "font-bold" : ""
                    }`}
                    onClick={() => handleFileSelect(item.name)}
                  >
                    {" "}
                    <span>
                      {fileActiveId === item.name && <BsFillPlayFill />}
                    </span>{" "}
                    <span className="w-full">{item.name}</span>
                  </p>
                  <button
                    className="hidden group-hover:flex z-[9999] "
                    onClick={() => handleDelete(item.name)}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 font-bold text-white tracking-wide">
            Please upload a file
          </p>
        )}
      </div>
      <div
        className="p-2 pt-4 rounded text-end border-t border-gray-400"
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
          className="bg-emerald-600 rounded py-2 text-gray-300 border-[#cbd5e1] text-center border-2 border-dashed"
        >
          <label htmlFor="input-file-upload" className="">
            <p className="text-sm">Drag and drop your file or</p>
            <p className="hover:underline text-sm cursor-pointer">
              Upload a File
            </p>

            {uploadedFile ? (
              <p className="font-bold text-gray-100 tracking-wide text-md">
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
            onChange={handleFileChange}
          />
        </form>
        <button
          className="mt-2 outline-none bg-primary-btn text-slate-100 text-sm font-medium px-4 py-2 rounded text"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileTab;