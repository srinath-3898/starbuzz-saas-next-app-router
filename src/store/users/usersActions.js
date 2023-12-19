import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/byOrg?size=${size}&page=${page}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserByName = createAsyncThunk(
  "users/fetchUserByName",
  async ({ search }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/search/user/${search}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
