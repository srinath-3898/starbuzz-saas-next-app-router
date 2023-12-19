import { createSlice } from "@reduxjs/toolkit";
import {
  getRolesByOrganisation,
  getRolesByUser,
  fetchRolesByName,
} from "./rolesActions";

const initialState = {
  loading: false,
  roles: null,
  userRoles: null,
  searchedRolesLoading: false,
  searchedRoles: null,
  error: null,
  getRolesByUsersErrorCode: null,
  getRolesByOrganisationErrorCode: null,
  fetchRolesByNameErrorCode: null,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetSearchedRolesData: (state) => {
      state.searchedRoles = null;
      state.searchedRolesLoading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    //get roles by user
    builder
      .addCase(getRolesByUser.pending, (state) => {
        state.loading = true;
        state.userRoles = null;
        state.error = null;
        state.getRolesByUsersErrorCode = null;
      })
      .addCase(getRolesByUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        let roles = localStorage.getItem("roles");
        if (roles === null && payload?.page === 1) {
          const roles = payload?.response?.data?.data?.data?.map((role) => ({
            label: `${role?.roleName} - ${role?.brandName}`,
            value: role?.brandId,
            roleId: role?.roleId,
          }));
          localStorage.setItem("roles", JSON.stringify(roles));
        } else if (roles !== null && payload?.page !== 1) {
          roles = [
            ...JSON.parse(roles),
            ...payload?.response?.data?.data?.data?.map((role) => ({
              label: `${role?.roleName} - ${role?.brandName}`,
              value: role?.brandId,
              roleId: role?.roleId,
            })),
          ];
          localStorage.setItem("roles", JSON.stringify(roles));
        }
        state.roles = payload?.response?.data?.data;
        state.error = null;
        state.getRolesByUsersErrorCode = null;
      })
      .addCase(getRolesByUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.getRolesByUsersErrorCode = payload?.code;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //get roles by organisation
    builder
      .addCase(getRolesByOrganisation.pending, (state) => {
        state.loading = true;
        state.roles = null;
        state.error = null;
        state.getRolesByOrganisationErrorCode = null;
      })
      .addCase(getRolesByOrganisation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.roles = payload?.data?.data;
        state.error = null;
        state.getRolesByOrganisationErrorCode = null;
      })
      .addCase(getRolesByOrganisation.rejected, (state, { payload }) => {
        state.loading = false;
        state.getRolesByOrganisationErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      })
      .addCase(fetchRolesByName.pending, (state) => {
        state.searchedRolesLoading = true;
        state.searchedRoles = null;
        state.error = null;
        state.fetchRolesByNameErrorCode = null;
      })
      .addCase(fetchRolesByName.fulfilled, (state, { payload }) => {
        state.searchedRolesLoading = false;
        state.fetchRolesByNameErrorCode = null;
        state.searchedRoles = payload?.data?.data;
      })
      .addCase(fetchRolesByName.rejected, (state, { payload }) => {
        state.searchedRolesLoading = false;
        state.fetchRolesByNameErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default rolesSlice.reducer;
export const { resetSearchedRolesData } = rolesSlice.actions;
