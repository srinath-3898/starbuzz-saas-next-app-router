import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post("/user/brand", params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${params.brandId}`,
        params.brandDetails
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (brandId, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(`/user/brand/${brandId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
