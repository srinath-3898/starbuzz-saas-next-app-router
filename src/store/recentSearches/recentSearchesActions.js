import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInstagramRecentSearches = createAsyncThunk(
  "recentSearches/getInstagramRecentSearches",
  async ({ brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/discovery/recent-searches`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getYoutubeRecentSearches = createAsyncThunk(
  "recentSearches/getYoutubeRecentSearches",
  async ({ brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/yt/discovery/recent-searches`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
