import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReport = createAsyncThunk(
  "influencerReport/getReport",
  async ({ brandId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/ig/report/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFreemiumReport = createAsyncThunk(
  "influencerReport/getFreemiumReport",
  async ({ brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/ig/report/freemium`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkReportGenerated = createAsyncThunk(
  "influencerReport/checkReportGenerated",
  async ({ username, brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/ig/report/is-report-generated/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getYoutubeReport = createAsyncThunk(
  "influencerReport/getYoutubeReport",
  async ({ brandId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/yt/report/${username}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
