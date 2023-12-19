import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactionsByBrand = createAsyncThunk(
  "transactions/getTransactionsByBrand",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/transactions/by-brand?size=${params.size}&page=${params.page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
