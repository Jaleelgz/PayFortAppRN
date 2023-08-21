import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    value: "Hii",
  },
  reducers: {
    setTest: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTest } = testSlice.actions;

export default testSlice.reducer;
