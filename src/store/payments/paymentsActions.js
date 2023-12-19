import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPayments = createAsyncThunk(
  "payments/getPayments",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/payments?size=${params.size}&page=${params.page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAddonPayments = createAsyncThunk(
  "payments/getAddonPayments",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/addon-payments?size=${params.size}&page=${params.page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
