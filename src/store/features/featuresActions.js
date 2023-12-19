import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFeatures = createAsyncThunk(
  "features/getAllFeatures",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = api.get("/user/feature");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFeaturesByOrgRole = createAsyncThunk(
  "features/getFeaturesByOrgRole",
  async (roleId, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/feature/byOrg/${roleId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFeaturesByUserRole = createAsyncThunk(
  "features/getFeaturesByUserRole",
  async (roleId, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/feature/byUser/${roleId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
