import { createSlice } from "@reduxjs/toolkit";
import {
  getInstagramNiches,
  getTaxanomy,
  getYoutubeNiches,
} from "./taxanomyActions";

const initialState = {
  loading: false,
  platforms: null,
  types: null,
  errorCode: null,
  error: null,
  instagramNichesLoading: false,
  instagramNiches: null,
  instagramNichesError: null,
  instagramNichesErroCode: null,
  youtubeNichesLoading: false,
  youtubeNiches: null,
  youtubeNichesError: null,
  youtubeNichesErroCode: null,
};

const taxanomySlice = createSlice({
  name: "taxanomy",
  initialState,
  reducers: {
    resetTaxanomyData: (state) => {
      state.loading = false;
      state.platforms = null;
      state.types = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaxanomy.pending, (state) => {
        state.loading = true;
        state.platforms = null;
        state.types = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getTaxanomy.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { platforms, types } = payload?.data?.data;
        state.platforms = platforms;
        state.types = types;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getTaxanomy.rejected, (state, { payload }) => {
        state.loading = false;
        state.platforms = null;
        state.types = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    builder
      .addCase(getInstagramNiches.pending, (state) => {
        state.instagramNichesLoading = true;
        state.instagramNiches = null;
        state.instagramNichesErroCode = null;
        state.instagramNichesErroCode = null;
      })
      .addCase(getInstagramNiches.fulfilled, (state, { payload }) => {
        state.instagramNichesLoading = false;
        state.instagramNiches = payload?.data;
        state.instagramNichesErroCode = null;
        state.instagramNichesError = null;
      })
      .addCase(getInstagramNiches.rejected, (state, { payload }) => {
        state.instagramNichesLoading = false;
        state.instagramNiches = null;
        state.instagramNichesErroCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.instagramNichesError = payload?.response?.data?.message;
        } else {
          state.instagramNichesError = payload?.message;
        }
      });

    builder
      .addCase(getYoutubeNiches.pending, (state) => {
        state.youtubeNichesLoading = true;
        state.youtubeNiches = null;
        state.youtubeNichesErroCode = null;
        state.youtubeNichesErroCode = null;
      })
      .addCase(getYoutubeNiches.fulfilled, (state, { payload }) => {
        state.youtubeNichesLoading = false;
        state.youtubeNiches = payload?.data;
        state.youtubeNichesErroCode = null;
        state.youtubeNichesError = null;
      })
      .addCase(getYoutubeNiches.rejected, (state, { payload }) => {
        state.youtubeNichesLoading = false;
        state.youtubeNiches = null;
        state.youtubeNichesErroCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.youtubeNichesError = payload?.response?.data?.message;
        } else {
          state.youtubeNichesError = payload?.message;
        }
      });
  },
});

export default taxanomySlice.reducer;
export const { resetTaxanomyData } = taxanomySlice.actions;
