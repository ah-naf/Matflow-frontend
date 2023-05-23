import { createSlice } from "@reduxjs/toolkit";

export const SideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    showLeftSideBar: true,
  },
  reducers: {
    setShowLeftSideBar: (state, {payload}) => {
        state.showLeftSideBar = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setShowLeftSideBar } = SideBarSlice.actions;

export default SideBarSlice.reducer;
