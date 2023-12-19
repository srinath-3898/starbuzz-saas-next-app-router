import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAddOns = createAsyncThunk(
  "addOns/getAddOns",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/addons`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
