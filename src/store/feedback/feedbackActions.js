import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post("/user/feedback", params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
