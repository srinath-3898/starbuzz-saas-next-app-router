import { createSlice } from "@reduxjs/toolkit";
import {
  fetchReportsByBrand,
  fetchReportsByUser,
  generateInstaReportPDF,
  generateYoutubeReportPDF,
} from "./reportsAction";

const initialState = {
  reportsByBrandLoading: false,
  reportsByBrand: null,
  reportsByBrandError: null,
  reportsByUserLoading: false,
  reportsByUser: null,
  reportsByUserError: null,
  generateInstaReportPDFLoading: false,
  pdfSource: null,
  generateInstaReportPDFMessage: null,
  generateInstaReportPDFError: null,
  fetchReportsByBrandErrorCode: null,
  fetchReportsByUserErrorCode: null,
  generateInstaReportPDFErrorCode: null,
  generateYoutubeReportPDFLoading: false,
  youtubePDFSource: null,
  generateYoutubeReportPDFMessage: null,
  generateYoutubeReportPDFError: null,
  generateYoutubeReportPDFErrorCode: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    resetGenerateInstaReportPDFData: (state) => {
      state.generateInstaReportPDFLoading = false;
      state.pdfSource = null;
      state.generateInstaReportPDFMessage = null;
      state.generateInstaReportPDFError = null;
      state.fetchReportsByBrandErrorCode = null;
    },
    resetGenerateYoutubeReportPDFData: (state) => {
      state.generateYoutubeReportPDFLoading = false;
      state.youtubePDFSource = null;
      state.generateYoutubeReportPDFMessage = null;
      state.generateYoutubeReportPDFError = null;
      state.generateYoutubeReportPDFErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsByBrand.pending, (state) => {
        state.reportsByBrandLoading = true;
        state.reportsByBrandError = null;
        state.fetchReportsByBrandErrorCode = null;
      })
      .addCase(fetchReportsByBrand.fulfilled, (state, { payload }) => {
        state.reportsByBrandLoading = false;
        state.reportsByBrand = payload?.data?.data;
        state.reportsByBrandError = null;
        state.fetchReportsByBrandErrorCode = null;
      })
      .addCase(fetchReportsByBrand.rejected, (state, { payload }) => {
        state.reportsByBrandLoading = false;
        state.fetchReportsByBrandErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.reportsByBrandError = payload?.response?.data?.message;
        } else {
          state.reportsByBrandError = payload?.message;
        }
      })
      .addCase(fetchReportsByUser.pending, (state) => {
        state.reportsByUserLoading = true;
        state.reportsByUserError = null;
        state.fetchReportsByUserErrorCode = null;
      })
      .addCase(fetchReportsByUser.fulfilled, (state, { payload }) => {
        state.reportsByUserLoading = false;
        state.reportsByUser = payload?.data?.data;
        state.reportsByUserError = null;
        state.fetchReportsByUserErrorCode = null;
      })
      .addCase(fetchReportsByUser.rejected, (state, { payload }) => {
        state.reportsByUserLoading = false;
        state.fetchReportsByUserErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      })

      .addCase(generateInstaReportPDF.pending, (state) => {
        state.generateInstaReportPDFLoading = true;
        state.pdfSource = null;
        state.generateInstaReportPDFError = null;
        state.generateInstaReportPDFMessage = null;
        state.generateInstaReportPDFErrorCode = null;
      })
      .addCase(generateInstaReportPDF.fulfilled, (state, { payload }) => {
        state.generateInstaReportPDFLoading = false;
        state.pdfSource = payload?.data?.data?.pdf_source;
        state.generateInstaReportPDFMessage = payload?.data?.message;
        state.generateInstaReportPDFError = null;
        state.generateInstaReportPDFErrorCode = null;
      })
      .addCase(generateInstaReportPDF.rejected, (state, { payload }) => {
        state.generateInstaReportPDFLoading = false;
        state.pdfSource = null;
        state.generateInstaReportPDFMessage = null;
        state.generateInstaReportPDFErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.generateInstaReportPDFError = payload?.response?.data?.message;
        } else {
          state.generateInstaReportPDFError = payload?.message;
        }
      });

    builder
      .addCase(generateYoutubeReportPDF.pending, (state) => {
        state.generateYoutubeReportPDFLoading = true;
        state.youtubePDFSource = null;
        state.generateYoutubeReportPDFMessage = null;
        state.generateYoutubeReportPDFError = null;
        state.generateYoutubeReportPDFErrorCode = null;
      })
      .addCase(generateYoutubeReportPDF.fulfilled, (state, { payload }) => {
        state.generateYoutubeReportPDFLoading = false;
        state.youtubePDFSource = payload?.data?.data?.pdf_source;
        state.generateYoutubeReportPDFMessage = payload?.data?.message;
        state.generateYoutubeReportPDFError = null;
        state.generateYoutubeReportPDFErrorCode = null;
      })
      .addCase(generateYoutubeReportPDF.rejected, (state, { payload }) => {
        state.generateYoutubeReportPDFLoading = false;
        state.youtubePDFSource = null;
        state.generateYoutubeReportPDFMessage = null;
        state.generateYoutubeReportPDFErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.generateYoutubeReportPDFError =
            payload?.response?.data?.message;
        } else {
          state.generateYoutubeReportPDFError = payload?.message;
        }
      });
  },
});

export const {
  resetGenerateInstaReportPDFData,
  resetGenerateYoutubeReportPDFData,
} = reportsSlice.actions;
export default reportsSlice.reducer;
