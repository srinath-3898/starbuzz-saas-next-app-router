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
