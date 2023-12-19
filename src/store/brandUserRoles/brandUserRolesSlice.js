import { createSlice } from "@reduxjs/toolkit";
import {
  assignBrandUserRole,
  getRolesAssignedUsers,
  unassignBrandUserRole,
} from "./brandUserRolesActions";

const initialState = {
  loading: false,
  assignLoading: false,
  unassignLoading: false,
  message: null,
  assignedroles: null,
  error: null,
  errorCode: null,
};

const brandUserRolesSlice = createSlice({
  name: "brandUserRoles",
  initialState,
  reducers: {
    resetAssingRoleToUserData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.assignLoading = false;
      state.unassignLoading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignBrandUserRole.pending, (state) => {
        state.assignLoading = true;
        state.message = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(assignBrandUserRole.fulfilled, (state, { payload }) => {
        state.assignLoading = false;
        state.message = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(assignBrandUserRole.rejected, (state, { payload }) => {
        state.assignLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
    builder
      .addCase(getRolesAssignedUsers.pending, (state) => {
        state.loading = true;
        state.assignedroles = null;
        state.error = null;
      })
      .addCase(getRolesAssignedUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.assignedroles = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getRolesAssignedUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
    builder
      .addCase(unassignBrandUserRole.pending, (state) => {
        state.unassignLoading = true;
        state.message = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(unassignBrandUserRole.fulfilled, (state, { payload }) => {
        state.unassignLoading = false;
        state.message = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(unassignBrandUserRole.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default brandUserRolesSlice.reducer;

export const { resetAssingRoleToUserData } = brandUserRolesSlice.actions;
