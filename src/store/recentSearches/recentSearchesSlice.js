import { createSlice } from "@reduxjs/toolkit";
import {
  getInstagramRecentSearches,
  getYoutubeRecentSearches,
} from "./recentSearchesActions";

const initialState = {
  loading: false,
  instagramRecentSearches: null,
  youtubeRecentSearches: null,
  error: null,
  errorCode: null,
};

const rescentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    resetRecentSearchesData: (state) => {
      state.loading = false;
      state.recentSearches = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstagramRecentSearches.pending, (state) => {
        state.loading = true;
        state.instagramRecentSearches = null;
        state.youtubeRecentSearches = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getInstagramRecentSearches.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.instagramRecentSearches = payload?.data?.data;
        state.youtubeRecentSearches = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getInstagramRecentSearches.rejected, (state, { payload }) => {
        state.loading = false;
        state.instagramRecentSearches = null;
        state.youtubeRecentSearches = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
          state.errorCode = null;
        } else {
          state.error = payload?.message;
        }
      });

    builder
      .addCase(getYoutubeRecentSearches.pending, (state) => {
        state.loading = true;
        state.instagramRecentSearches = null;
        state.youtubeRecentSearches = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getYoutubeRecentSearches.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.instagramRecentSearches = null;
        state.youtubeRecentSearches = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getYoutubeRecentSearches.rejected, (state, { payload }) => {
        state.loading = false;
        state.instagramRecentSearches = null;
        state.youtubeRecentSearches = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
          state.errorCode = null;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default rescentSearchesSlice.reducer;
export const { resetRecentSearchesData } = rescentSearchesSlice.actions;
