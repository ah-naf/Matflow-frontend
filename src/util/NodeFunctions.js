import { toast } from "react-toastify";

const EDA_LINK = {
  "Bar Plot": "eda_barplot",
  "Box Plot": "eda_boxplot",
  "Count Plot": "eda_countplot",
  "Custom Plot": "eda_customplot",
  Histogram: "eda_histogram",
  "Line Plot": "eda_lineplot",
  "Pie Plot": "eda_pieplot",
  "Reg Plot": "eda_regplot",
  "Scatter Plot": "eda_scatterplot",
  "Violin Plot": "eda_violinplot",
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
    // Error paile connected node er data delete kore dibe
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: {} };
      return val;
    });
    rflow.setNodes(tempNodes);
    
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
    // Error paile connected node er data delete kore dibe
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: {} };
      return val;
    });
    rflow.setNodes(tempNodes);
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

export const handleReverseML = async (rflow, params) => {
  try {
    const { table, reverseml } = rflow.getNode(params.source).data;
    console.log("first");
    if (!table) throw new Error("Check your file in upload node.");
    const res = await fetch("http://127.0.0.1:8000/api/reverseml/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: table,
        "Select Feature": reverseml["Select Feature"],
        "Select Target Variable": reverseml["Select Target Variable"],
        "Enter Values": reverseml["Enter Values"],
      }),
    });
    const data = await res.json();

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: { table: data } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    // Error paile connected node er data delete kore dibe
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: {} };
      return val;
    });
    rflow.setNodes(tempNodes);

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
