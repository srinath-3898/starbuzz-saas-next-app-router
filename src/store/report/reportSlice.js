import { createSlice } from "@reduxjs/toolkit";
import {
  checkReportGenerated,
  getFreemiumReport,
  getReport,
  getYoutubeReport,
} from "./reportActions";

const initialState = {
  loading: false,
  isReportGenerated: null,
  report: null,
  hasEnoughCredits: true,
  reportMessage: null,
  error: null,
  errorCode: null,

  youtubeReportLoading: false,
  youtubeReport: null,
  youtubeReportError: null,
  youtubeReportErrorCode: null,
};

const reportSlice = createSlice({
  name: "influencerReport",
  initialState,
  reducers: {
    resetReportData: (state) => {
      state.loading = false;
      state.isReportGenerated = null;
      state.report = null;
      state.error = null;
      state.errorCode = null;
    },
    resetYoutubeReportData: (state) => {
      state.youtubeReportLoading = false;
      state.youtubeReport = null;
      state.youtubeReportErrorCode = null;
      state.youtubeReportError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReport.pending, (state) => {
        state.loading = true;
        state.report = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.report = payload?.data?.data?.result?.user;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.reportMessage = payload?.data.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getReport.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //freemium report
    builder
      .addCase(getFreemiumReport.pending, (state) => {
        state.loading = true;
        state.report = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getFreemiumReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.report = payload?.data?.data?.result?.user;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getFreemiumReport.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    builder
      .addCase(checkReportGenerated.pending, (state) => {
        state.loading = true;
        state.isReportGenerated = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(checkReportGenerated.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isReportGenerated = payload?.data?.data?.isReportGenerated;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(checkReportGenerated.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
    //youtube report download
    builder
      .addCase(getYoutubeReport.pending, (state) => {
        state.youtubeReportLoading = true;
        state.youtubeReport = null;
        state.youtubeReportError = null;
        state.youtubeReportErrorCode = null;
      })
      .addCase(getYoutubeReport.fulfilled, (state, { payload }) => {
        state.youtubeReportLoading = false;
        state.youtubeReport = payload?.data?.result?.report;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.reportMessage = payload?.data.message;
        state.youtubeReportError = null;
        state.youtubeReportErrorCode = null;
      })
      .addCase(getYoutubeReport.rejected, (state, { payload }) => {
        state.youtubeReportLoading = false;
        state.youtubeReport = null;
        state.youtubeReportErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.youtubeReportError = payload?.response?.data?.message;
        } else {
          state.youtubeReportError = payload?.message;
        }
      });
  },
});

export const { resetReportData } = reportSlice.actions;
export default reportSlice.reducer;
