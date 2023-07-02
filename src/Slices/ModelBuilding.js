import { createSlice } from "@reduxjs/toolkit";

const ModelBuildingSlice = createSlice({
  name: "model building",
  initialState: {
    regressor: "",
    hyperparameter: {},
    model_setting: {},
  },
  reducers: {
    setReg: (state, {payload}) => {
        state.regressor = payload
    },
    setHyperparameterData: (state, {payload}) => {
        state.hyperparameter = payload
    }
  },
});

// Action creators are generated for each case reducer function
// export const {} = ModelBuildingSlice.actions;
export const { setReg, setHyperparameterData } = ModelBuildingSlice.actions;

export default ModelBuildingSlice.reducer;
