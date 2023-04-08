import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: 1,
  formData: {},
};
export const commonStateSlice = createSlice({
  name: "commonState",
  initialState: initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});
export const { setScreen, setFormData } = commonStateSlice.actions;
export default commonStateSlice.reducer;
