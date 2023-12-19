import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFeatures,
  getFeaturesByOrgRole,
  getFeaturesByUserRole,
} from "./featuresActions";

const initialState = {
  loading: false,
  allFeatures: null,
  orgRoleFeatures: null,
  userRoleFeatures: null,
  error: null,
  errorCode: null,
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    resetOrgRoleFeaturesData: (state) => {
      state.orgRoleFeatures = null;
      state.errorCode = null;
    },
    resetAllFeaturesData: (state) => {
      state.allFeatures = null;
      state.errorCode = null;
    },
    resetUserRoleFeatures: (state) => {
      state.userRoleFeatures = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
        state.allFeatures = null;
      })
      .addCase(getAllFeatures.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allFeatures = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getAllFeatures.rejected, (state, { payload }) => {
        state.loading = false;
        state.allFeatures = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //get features by organisatio role
    builder
      .addCase(getFeaturesByOrgRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
        state.orgRoleFeatures = null;
      })
      .addCase(getFeaturesByOrgRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orgRoleFeatures = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getFeaturesByOrgRole.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //get features by user role
    builder
      .addCase(getFeaturesByUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
        state.userRoleFeatures = null;
      })
      .addCase(getFeaturesByUserRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userRoleFeatures = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getFeaturesByUserRole.rejected, (state, { payload }) => {
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

export default featuresSlice.reducer;
export const {
  resetOrgRoleFeaturesData,
  resetAllFeaturesData,
  resetUserRoleFeatures,
} = featuresSlice.actions;
