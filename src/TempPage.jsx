import React, { useState } from "react";
import Papa from "papaparse";

function TempPage() {
  const [file, setFile] = useState();
  const [Data, setData] = useState();
  const [blobUrl, setBlobUrl] = useState()

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const contents = reader.result;
        const blob = new Blob([contents], { type: "text/csv" });
        const blobUrl = URL.createObjectURL(blob);

        console.log(blobUrl);
        setBlobUrl(blobUrl)
        // dispatch(setBlobUrl(blobUrl));

        Papa.parse(blobUrl, {
          download: true,
          complete: (results) => {
            const data = results.data;
            // console.log(data);
            setData(data);
          },
        });
      };
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Submit</button>
      {blobUrl && <input type="file" value={blobUrl} />}
    </div>
  );
}

export default TempPage;
