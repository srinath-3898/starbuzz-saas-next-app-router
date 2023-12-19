import { createSlice } from "@reduxjs/toolkit";
import { getAddOns } from "./addOnsActions";

const initailState = {
  loading: false,
  addOns: null,
  error: null,
  errorCode: null,
};

export const addOnsSlice = createSlice({
  name: "addOns",
  initialState: initailState,
  reducers: {
    resetAddOnsData: (state) => {
      state.loading = false;
      state.addOns = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddOns.pending, (state) => {
      state.loading = true;
      state.addOns = null;
      state.error = null;
      state.errorCode = null;
    });
    builder.addCase(getAddOns.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.addOns = payload?.data?.data;
      state.error = null;
      state.errorCode = null;
    });
    builder.addCase(getAddOns.rejected, (state, { payload }) => {
      state.loading = false;
      state.addOns = null;
      state.errorCode = payload?.response?.status;
      if (payload?.response?.data?.message) {
        state.error = payload?.response?.data?.message;
      } else {
        state.error = payload?.message;
      }
    });
  },
});
export default addOnsSlice.reducer;

export const { resetAddOnsData } = addOnsSlice.actions;
