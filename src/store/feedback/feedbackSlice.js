import { createSlice } from "@reduxjs/toolkit";
import { submitFeedback } from "./feedbackActions";

const initialState = {
  loading: false,
  message: null,
  error: null,
  errorCode: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetFeedBackData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(submitFeedback.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(submitFeedback.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default feedbackSlice.reducer;

export const { resetFeedBackData } = feedbackSlice.actions;
