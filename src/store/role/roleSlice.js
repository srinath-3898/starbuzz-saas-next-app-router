import { createSlice } from "@reduxjs/toolkit";
import { createRole, deleteRole, updateRole } from "./roleActions";

const initialState = {
  loading: false,
  cudRoleMessage: null,
  cudRoleError: null,
  errorCode: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetRoleData: (state) => {
      state.loading = false;
      state.cudRoleMessage = null;
      state.cudRoleError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRole.pending, (state) => {
      state.loading = true;
      state.cudRoleMessage = null;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(createRole.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cudRoleMessage = payload?.data?.message;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(createRole.rejected, (state, { payload }) => {
      state.errorCode = payload?.response?.status;
      if (payload?.response?.data?.message) {
        state.cudRoleError = payload?.response?.data?.message;
      } else {
        state.cudRoleError = payload?.message;
      }
    });

    //update role
    builder.addCase(updateRole.pending, (state) => {
      state.loading = true;
      state.cudRoleMessage = null;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(updateRole.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cudRoleMessage = payload?.data?.message;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(updateRole.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorCode = payload?.response?.status;
      if (payload?.response?.data?.message) {
        state.cudRoleError = payload?.response?.data?.message;
      } else {
        state.cudRoleError = payload?.message;
      }
    });
    builder.addCase(deleteRole.pending, (state) => {
      state.loading = true;
      state.cudRoleMessage = null;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(deleteRole.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cudRoleMessage = payload?.data?.message;
      state.cudRoleError = null;
      state.errorCode = null;
    });
    builder.addCase(deleteRole.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorCode = payload?.response?.status;
      if (payload?.response?.data?.message) {
        state.cudRoleError = payload?.response?.data?.message;
      } else {
        state.cudRoleError = payload?.message;
      }
    });
  },
});

export default roleSlice.reducer;
export const { resetRoleData } = roleSlice.actions;
