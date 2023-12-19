import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListsByBrand = createAsyncThunk(
  "lists/fetchListsByBrand",
  async ({ brandId, size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/list?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
