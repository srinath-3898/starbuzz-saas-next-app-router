import api from "@/configs/apiConfig";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const searchCitiesByName = createAsyncThunk(
  "search/searchCitiesByName",
  async ({ data }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/search/city/${data}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCitiesById = createAsyncThunk(
  "search/getCitiesById",
  async ({ ids }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`user/search/cities`, { geoIds: ids });
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
