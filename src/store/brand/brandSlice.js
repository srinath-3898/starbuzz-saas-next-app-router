import { createSlice } from "@reduxjs/toolkit";
import { createBrand, updateBrand, deletBrand } from "./brandActions";

const initialState = {
  cudBrandLoading: false,
  hasEnoughCredits: null,
  cudBrandMessage: null,
  error: null,
  errorCode: null,
};
export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetCreateBrandData: (state) => {
      state.cudBrandLoading = false;
      state.hasEnoughCredits = null;
      state.cudBrandMessage = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.cudBrandLoading = true;
        state.cudBrandMessage = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(createBrand.fulfilled, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.cudBrandMessage = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(createBrand.rejected, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          let err = payload?.response?.data?.errors?.map((e) => e.msg);
          state.error = err?.join(", ") || payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    builder
      .addCase(updateBrand.pending, (state) => {
        state.cudBrandLoading = true;
        state.cudBrandMessage = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(updateBrand.fulfilled, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.cudBrandMessage = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(updateBrand.rejected, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.errors?.length > 0) {
          state.error = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    builder
      .addCase(deletBrand.pending, (state) => {
        state.cudBrandLoading = true;
        state.cudBrandMessage = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(deletBrand.fulfilled, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.cudBrandMessage = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(deletBrand.rejected, (state, { payload }) => {
        state.cudBrandLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default brandSlice.reducer;
export const { resetCreateBrandData } = brandSlice.actions;
