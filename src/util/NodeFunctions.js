import { toast } from "react-toastify";

const EDA_LINK = {
  "Bar Plot": "eda_barplot",
  "Box Plot": "eda_boxplot",
  "Count Plot": "eda_countplot",
  "Custom Plot": "eda_customplot",
  Histogram: "eda_histogram",
};

export const handleOutputTable = async (rflow, params) => {
  try {
    const csvFile = rflow.getNode(params.source).data;

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return { ...val, data: { table: csvFile.table } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    toast.error("Check your file in upload node", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return false;
  }
};

export const handlePlotOptions = async (rflow, params) => {
  try {
    // const { plot, plotOption, nodeId } = Plot;
    const file = rflow.getNode(params.source).data;
    if (!file || !file.table) {
      throw new Error("File not found.");
    }
    console.log(file);
    if (Object.keys(file.plotOption).length === 0) return true;

    const url = `http://127.0.0.1:8000/api/${
      EDA_LINK[file.plot || "Bar Plot"]
    }/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...file.plotOption,
        file: file.table,
      }),
    });
    let data = await res.json();
    data = JSON.parse(data);

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: { graph: data } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return false;
  }
};
