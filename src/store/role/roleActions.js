import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRole = createAsyncThunk(
  "role/createRole",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post("/user/role", params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/role/update-permissions/${params?.roleId}`,
        params.updateRoleData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRole = createAsyncThunk("role/deletRole", async (roleId) => {
  try {
    api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "token"
    )}`;
    const response = await api.delete(`/user/role/${roleId}`);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});
