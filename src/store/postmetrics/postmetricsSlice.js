import { createSlice } from "@reduxjs/toolkit";
import {
  getPostMetrics,
  addPostMetrics,
  updatePostMetrics,
  removePostMetrics,
  getPostMetricsById,
} from "./postmetricsActions";

const initialState = {
  postMetricsLoading: false,
  postMetrics: null,
  postMetricsError: null,
  addPostMetricsLoading: false,
  addPostMetricsMessage: null,
  addPostMetricsError: null,
  updatePostMetricsLoading: false,
  updatePostMetricsMessage: null,
  updatePostMetricsError: null,
  removePostMetricsLoading: false,
  removePostMetricsMessage: null,
  removePostMetricsError: null,
  getPostMetricsByIdLoading: false,
  getPostMetricsById: null,
  getPostMetricsByIdError: null,
  errorCode: null,
};

export const postmetricsSlice = createSlice({
  name: "postmetrics",
  initialState,
  reducers: {
    resetGetPostMetricsData: (state) => {
      state.postMetricsLoading = false;
      state.postMetrics = null;
      state.postMetricsError = null;
      state.errorCode = null;
    },
    resetAddPostMetricsData: (state) => {
      state.addPostMetricsLoading = false;
      state.addPostMetricsMessage = null;
      state.addPostMetricsError = null;
      state.errorCode = null;
    },
    resetUpdatePostMetricsData: (state) => {
      state.updatePostMetricsLoading = false;
      state.updatePostMetricsMessage = null;
      state.updatePostMetricsError = null;
      state.errorCode = null;
    },
    resetRemovePostMetricsData: (state) => {
      state.removePostMetricsLoading = false;
      state.removePostMetricsMessage = null;
      state.removePostMetricsError = null;
      state.errorCode = null;
    },
    resetGetPostMetricsByIdData: (state) => {
      state.getPostMetricsByIdLoading = false;
      state.getPostMetricsById = null;
      state.getPostMetricsByIdError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostMetrics.pending, (state) => {
        state.postMetricsLoading = true;
        state.postMetricsError = null;
        state.errorCode = null;
      })
      .addCase(getPostMetrics.fulfilled, (state, payload) => {
        state.postMetricsLoading = false;
        state.addPostMetricsError = null;
        state.postMetrics = payload?.payload?.data?.data;
        state.errorCode = null;
      })
      .addCase(getPostMetrics.rejected, (state, payload) => {
        state.postMetricsLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.postMetricsError = payload?.response?.data?.message;
        } else {
          state.postMetricsError = payload?.message;
        }
      });
    builder
      .addCase(addPostMetrics.pending, (state) => {
        state.addPostMetricsLoading = true;
        state.addPostMetricsError = null;
        state.addPostMetricsMessage = null;
        state.errorCode = null;
      })
      .addCase(addPostMetrics.fulfilled, (state, payload) => {
        state.addPostMetricsLoading = false;
        state.addPostMetricsMessage = payload?.payload?.data?.message;
        state.addPostMetricsError = null;
        state.errorCode = null;
      })
      .addCase(addPostMetrics.rejected, (state, payload) => {
        state.addPostMetricsLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.addPostMetricsError = payload?.response?.data?.message;
        } else {
          state.addPostMetricsError = payload?.message;
        }
      });
    builder
      .addCase(updatePostMetrics.pending, (state) => {
        state.updatePostMetricsLoading = true;
        state.updatePostMetricsError = null;
        state.updatePostMetricsMessage = null;
        state.errorCode = null;
      })
      .addCase(updatePostMetrics.fulfilled, (state, payload) => {
        state.updatePostMetricsLoading = false;
        state.updatePostMetricsMessage = payload?.payload?.data?.message;
        state.updatePostMetricsError = null;
        state.errorCode = null;
      })
      .addCase(updatePostMetrics.rejected, (state, payload) => {
        state.updatePostMetricsLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.updatePostMetricsError = payload?.response?.data?.message;
        } else {
          state.updatePostMetricsError = payload?.message;
        }
      });
    builder
      .addCase(removePostMetrics.pending, (state) => {
        state.removePostMetricsLoading = true;
        state.removePostMetricsError = null;
        state.removePostMetricsMessage = null;
        state.errorCode = null;
      })
      .addCase(removePostMetrics.fulfilled, (state, payload) => {
        state.removePostMetricsLoading = false;
        state.removePostMetricsMessage = payload?.payload?.data?.message;
        state.removePostMetricsError = null;
        state.errorCode = null;
      })
      .addCase(removePostMetrics.rejected, (state, payload) => {
        state.removePostMetricsLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.removePostMetricsError = payload?.response?.data?.message;
        } else {
          state.removePostMetricsError = payload?.message;
        }
      });
    builder
      .addCase(getPostMetricsById.pending, (state) => {
        state.getPostMetricsByIdLoading = true;
        state.getPostMetricsByIdError = null;
        state.errorCode = null;
      })
      .addCase(getPostMetricsById.fulfilled, (state, payload) => {
        state.getPostMetricsByIdLoading = false;
        state.getPostMetricsById = payload?.data?.data;
        state.getPostMetricsByIdError = null;
        state.errorCode = null;
      })
      .addCase(getPostMetricsById.rejected, (state, payload) => {
        state.getPostMetricsByIdLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getPostMetricsByIdError = payload?.response?.data?.message;
        } else {
          state.getPostMetricsByIdError = payload?.message;
        }
      });
  },
});

export const {
  resetGetPostMetricsData,
  resetAddPostMetricsData,
  resetUpdatePostMetricsData,
  resetRemovePostMetricsData,
  resetGetPostMetricsByIdData,
} = postmetricsSlice.actions;
export default postmetricsSlice.reducer;
