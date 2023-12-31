import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReportsByBrand = createAsyncThunk(
  "reports/fetchReportsByBrand",
  async ({ brandId, size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/reports/by-brand?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReportsByUser = createAsyncThunk(
  "reports/fetchReportsByUser",
  async ({ brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/brand/${brandId}/reports/by-user`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//generate insta report pdf

export const generateInstaReportPDF = createAsyncThunk(
  "reports/generateInstaReportPDF",
  async ({ brandId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/ig/report/pdf/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//generate youtube report pdf

export const generateYoutubeReportPDF = createAsyncThunk(
  "reports/generateYoutubeReportPDF",
  async ({ brandId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/yt/report/pdf/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
