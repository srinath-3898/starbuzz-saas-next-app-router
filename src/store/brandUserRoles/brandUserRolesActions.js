import api from "@/configs/apiConfig";
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const assignBrandUserRole = createAsyncThunk(
  "brandUserRoles/assignBrandUserRole",
  async ({ userId, roleId, brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand-user-roles/assign`, {
        userId,
        roleId,
        brandId,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRolesAssignedUsers = createAsyncThunk(
  "brandUserRoles/getRolesAssignedUsers",
  async ({ size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand-user-roles/by-org?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unassignBrandUserRole = createAsyncThunk(
  "brandUserRoles/unassignBrandUserRole",
  async ({ userId, roleId, brandId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand-user-roles/un-assign`, {
        userId,
        roleId,
        brandId,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
