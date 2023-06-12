import React, { useEffect, useState } from "react";
import { fetchDataFromIndexedDB } from "./util/indexDB";

function DropdownMenu() {
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDataFromIndexedDB("IRIS.csv");

      const resp = await fetch("http://127.0.0.1:8000/api/eda_barplot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cat: "species",
          num: "sepal_length",
          hue: "species",
          orient: "Vertical",
          annote: "true",
          file: res,
        }),
      });
      let data = await resp.blob();
      const imageUrl = URL.createObjectURL(data);
      console.log(imageUrl)
      setImage(imageUrl);
    };
    fetchData();
  }, []);

  return (
    <div>
      <img src={image} alt="" className="w-96 h-96" />
    </div>
  );
}

export default DropdownMenu;
