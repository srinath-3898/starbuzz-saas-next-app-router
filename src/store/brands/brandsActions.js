import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `user/brand/byOrg?size=${size}&page=${page}`
      );
      return { response, page };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBrandsbyName = createAsyncThunk(
  "brands/fetchBrandsbyName",
  async ({ search, size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/search/brand/${search}`);
      return { response, page };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
