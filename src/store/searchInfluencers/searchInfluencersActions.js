import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchInfluencersByUsername = createAsyncThunk(
  "searchInfluencers/searchInfluencersByUsername",
  async ({ brandId, value }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/discovery/suggestor/${value}/instagram`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
