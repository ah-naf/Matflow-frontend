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

const raiseErrorToast = (rflow, params, error) => {
  // Error paile connected node er data delete kore dibe
  const tempNodes = rflow.getNodes().map((val) => {
    if (val.id === params.target) return { ...val, data: {} };
    return val;
  });
  rflow.setNodes(tempNodes);

  toast.error(error, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
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
    raiseErrorToast(rflow, params, error.message);
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
    raiseErrorToast(rflow, params, error.message);
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
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const isItTimeSeriesFile = async (rflow, params) => {
  try {
    const { table, timeSeries } = rflow.getNode(params.source).data;

    let option = { file: table };
    if (timeSeries && timeSeries.target_variable)
      option = { ...option, select_column: timeSeries.target_variable };
    else option = { ...option, select_column: "" };

    const res = await fetch("http://127.0.0.1:8000/api/time_series/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const data = await res.json();
    if ("error" in data && data.error) {
      toast.warn("No date-time column found in the dataset.", {
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
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target) return { ...val, data: { table } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleTimeSeriesAnalysis = async (rflow, params) => {
  try {
    const { table, timeSeries } = rflow.getNode(params.source).data;
    if (!timeSeries) return;
    console.log(timeSeries);
    const res = await fetch("http://127.0.0.1:8000/api/time_series_analysis/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: table,
        date: timeSeries.date,
        select_column: timeSeries.target_variable,
      }),
    });
    const data = await res.json();

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return { ...val, data: { graph: JSON.parse(data.graph) } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleFileForMergeDataset = async (rflow, params) => {
  try {
    const fileNode = rflow.getNode(params.source).data;
    const targetNodeFile = rflow.getNode(params.target).data;

    if (
      typeof targetNodeFile === "object" &&
      Object.keys(targetNodeFile).length === 2
    ) {
      throw new Error("Can't accept more than two dataset to merge");
    }

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { ...val.data, [fileNode["file_name"]]: fileNode.table },
        };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleMergeDataset = async (rflow, params) => {
  try {
    const { merge } = rflow.getNode(params.source).data;

    if (!merge) throw new Error("Check Merge Dataset Node.");

    const res = await fetch("http://127.0.0.1:8000/api/merge_dataset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        how: merge.how,
        left_dataframe: merge.left_dataframe,
        right_dataframe: merge.right_dataframe,
        file: merge.table1,
        file2: merge.table2,
      }),
    });

    let data = await res.json();
    data = JSON.parse(data);

    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return { ...val, data: { table: data, file_name: merge.dataset_name } };
      return val;
    });
    rflow.setNodes(tempNodes);
    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleAddModify = async (rflow, params) => {
  try {
    let { addModify } = rflow.getNode(params.source).data;
    // console.log(addModify);
    if (!addModify) throw new Error("Check Add/Modify Node.");
    if (addModify.option === "Add") {
      addModify.select_column = addModify.column_name;
    }
    const res = await fetch("http://127.0.0.1:8000/api/feature_creation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addModify),
    });

    let data = await res.json();
    // console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: addModify.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleChangeDtype = async (rflow, params) => {
  try {
    let { changeDtype } = rflow.getNode(params.source).data;
    // console.log(changeDtype);
    if (!changeDtype) throw new Error("Check Change Dtype Node.");

    const res = await fetch("http://127.0.0.1:8000/api/change_dtype/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeDtype),
    });

    let data = await res.json();
    // console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: changeDtype.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleAlterFieldName = async (rflow, params) => {
  try {
    let { alterFieldName } = rflow.getNode(params.source).data;

    if (!alterFieldName) throw new Error("Check Alter Field Name Node.");

    const res = await fetch("http://127.0.0.1:8000/api/alter_field_name/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alterFieldName),
    });

    let data = await res.json();
    // console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: alterFieldName.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleDropRowColumn = async (rflow, params) => {
  try {
    let { dropColumnRow } = rflow.getNode(params.source).data;

    if (!dropColumnRow) throw new Error("Check Drop Row/Column Node.");
    let url = "http://127.0.0.1:8000/api/drop_column/";
    if (dropColumnRow.dropOption === "Row")
      url = "http://127.0.0.1:8000/api/drop_rows/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        default_value: dropColumnRow.default_value,
        select_columns: dropColumnRow.select_columns,
        file: dropColumnRow.file,
      }),
    });

    let data = await res.json();
    // console.log(data)
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: dropColumnRow.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleScaling = async (rflow, params) => {
  try {
    let { scaling } = rflow.getNode(params.source).data;

    if (!scaling) throw new Error("Check Scaling Node.");
    let url = "http://127.0.0.1:8000/api/scaling/";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scaling),
    });

    let data = await res.json();
    console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: scaling.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleEncoding = async (rflow, params) => {
  try {
    let { encoding } = rflow.getNode(params.source).data;

    if (!encoding) throw new Error("Check Encoding Node.");
    let url = "http://127.0.0.1:8000/api/encoding/";
    // console.log(encoding)

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encoding),
    });

    let data = await res.json();
    console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: { table: data, file_name: encoding.dataset_name },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};

export const handleCluster = async (rflow, params, outputType) => {
  try {
    let { cluster } = rflow.getNode(params.source).data;

    if (!cluster) throw new Error("Check Cluster Node.");
    let url = "http://127.0.0.1:8000/api/cluster/";
    // console.log(encoding)

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cluster),
    });

    let data = await res.json();
    console.log(data);
    const tempNodes = rflow.getNodes().map((val) => {
      if (val.id === params.target)
        return {
          ...val,
          data: {
            [outputType === "table" ? "table" : "graph"]:
              outputType === "table" ? data.table : JSON.parse(data.graph),
          },
        };
      return val;
    });
    rflow.setNodes(tempNodes);

    return true;
  } catch (error) {
    raiseErrorToast(rflow, params, error.message);
    return false;
  }
};
