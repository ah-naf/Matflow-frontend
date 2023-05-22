import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setActiveFile } from "../../Slices/UploadedFileSlice";

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
  }, []);

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
    }
  };

  const handleDelete = (name) => {
    const tempFiles = files.filter((item) => item.name != name);
    setFiles(tempFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));
  };

  const handleFileSelect = (name) => {
    setFileActiveId(name);
    const active = files.filter((item) => item.name === name)[0];
    dispatch(setActiveFile(active));
  };

  const handleFileUpload = () => {
    if (uploadedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const contents = reader.result;
        const blob = new Blob([contents], { type: "text/csv" });
        const blobUrl = URL.createObjectURL(blob);

        const tempFiles = [
          ...files,
          { name: uploadedFile.name, link: blobUrl },
        ];
        setFiles(tempFiles);
        localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));
      };
      reader.readAsText(uploadedFile);
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
                  className={`flex cursor-pointer items-center group justify-between mt-2 px-2 py-3 rounded ${
                    fileActiveId === item.name
                      ? "bg-primary-btn text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleFileSelect(item.name)}
                >
                  <p
                    className={`flex tracking-wide gap-1 items-center ${
                      fileActiveId === item.name ? "font-bold" : ""
                    }`}
                  >
                    {" "}
                    <span>
                      {fileActiveId === item.name && <BsFillPlayFill />}
                    </span>{" "}
                    {item.name}
                  </p>
                  <button
                    className="hidden group-hover:flex"
                    onClick={() => handleDelete(item.name)}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 font-bold tracking-wide">
            Please upload a file
          </p>
        )}
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
        <button
          className="mt-2 outline-none bg-primary-btn text-white text-sm font-medium px-4 py-2 rounded text"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileTab;
