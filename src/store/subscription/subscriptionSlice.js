import { createSlice } from "@reduxjs/toolkit";
import { getPlans } from "./subscriptionActions";

const initialState = {
  loading: false,
  plans: null,
  error: null,
  errorCode: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.plans = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getPlans.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.plans = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getPlans.rejected, (state, { payload }) => {
        state.loading = false;
        state.plans = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default subscriptionSlice.reducer;
export const {} = subscriptionSlice.actions;
