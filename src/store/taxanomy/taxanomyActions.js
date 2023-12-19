import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTaxanomy = createAsyncThunk(
  "taxanomy/fetchTaxanomy",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get("/user/taxonomy");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInstagramNiches = createAsyncThunk(
  "taxanomy/getInstagramNiches",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get("/user/niches/instagram");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getYoutubeNiches = createAsyncThunk(
  "taxanomy/getYoutubeNiches",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get("/user/niches/youtube");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
