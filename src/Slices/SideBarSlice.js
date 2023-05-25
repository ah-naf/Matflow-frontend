import { createSlice } from "@reduxjs/toolkit";

export const SideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    showLeftSideBar: true,
    activeFunction: "Dataset",
    activeSubFunction: "Display",
  },
  reducers: {
    setShowLeftSideBar: (state, { payload }) => {
      state.showLeftSideBar = payload;
    },
    setActiveFunction: (state, { payload }) => {
      state.activeFunction = payload;
    },
    setActiveSubFunction: (state, { payload }) => {
      state.activeSubFunction = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowLeftSideBar, setActiveFunction, setActiveSubFunction } =
  SideBarSlice.actions;

export default SideBarSlice.reducer;
