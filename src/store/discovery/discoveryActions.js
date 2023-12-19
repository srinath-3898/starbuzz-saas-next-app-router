import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFreemiumInfluencers = createAsyncThunk(
  "discovery/getFreemiumInfluencers",
  async ({ brandId, size, page, niches }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/discovery/freemium?size=${size}&page=${page}`,
        { niches }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFreemiumYoutubeInfluencers = createAsyncThunk(
  "discovery/getFreemiumYoutubeInfluencers",
  async ({ brandId, size, page, niches }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/yt/discovery/freemium?size=${size}&page=${page}`,
        { niches }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const discoverInfluencers = createAsyncThunk(
  "discovery/discoverInfluencers",
  async ({ brandId, body }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand/${brandId}/discovery`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Discover youtube influencers

export const discoverYoutubeInfluencers = createAsyncThunk(
  "discovery/discoverYoutubeInfluencers",
  async ({ brandId, body }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/yt/discovery`,
        body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRecentSearch = createAsyncThunk(
  "discovery/getRecentSearch",
  async ({ brandId, recentSearchId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/discovery/recent-searches-by-id/${recentSearchId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
