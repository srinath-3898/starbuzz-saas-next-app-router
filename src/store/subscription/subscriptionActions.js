import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPlans = createAsyncThunk(
  "subscription/getPlans",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/subscription-plans`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
