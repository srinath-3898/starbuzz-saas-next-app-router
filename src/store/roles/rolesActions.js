import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRolesByUser = createAsyncThunk(
  "roles/getRolesByUser",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/role/get-user-roles?size=${size}&page=${page}`
      );
      return { response, page };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRolesByOrganisation = createAsyncThunk(
  "roles/getRolesByOrganisation",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/role/byOrg?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRolesByName = createAsyncThunk(
  "roles/fetchRolesByName",
  async ({ search }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/search/role/${search}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
