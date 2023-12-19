import { createSlice } from "@reduxjs/toolkit";
import {
  fetchReportsByBrand,
  fetchReportsByUser,
  generateReportPDF,
} from "./reportsAction";

const initialState = {
  reportsByBrandLoading: false,
  reportsByBrand: null,
  reportsByBrandError: null,
  reportsByUserLoading: false,
  reportsByUser: null,
  reportsByUserError: null,
  generateReportPDFLoading: false,
  pdfSource: null,
  generateReportPDFMessage: null,
  generateReportPDFError: null,
  fetchReportsByBrandErrorCode: null,
  fetchReportsByUserErrorCode: null,
  generateReportPDFErrorCode: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    resetGenerateReportPDFData: (state) => {
      state.generateReportPDFLoading = false;
      state.pdfSource = null;
      state.generateReportPDFMessage = null;
      state.generateReportPDFError = null;
      state.fetchReportsByBrandErrorCode = null;
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

      .addCase(generateReportPDF.pending, (state) => {
        state.generateReportPDFLoading = true;
        state.pdfSource = null;
        state.generateReportPDFError = null;
        state.generateReportPDFMessage = null;
        state.generateReportPDFErrorCode = null;
      })
      .addCase(generateReportPDF.fulfilled, (state, { payload }) => {
        state.generateReportPDFLoading = false;
        state.pdfSource = payload?.data?.data?.pdf_source;
        state.generateReportPDFMessage = payload?.data?.message;
        state.generateReportPDFError = null;
        state.generateReportPDFErrorCode = null;
      })
      .addCase(generateReportPDF.rejected, (state, { payload }) => {
        state.generateReportPDFLoading = false;
        state.pdfSource = null;
        state.generateReportPDFMessage = null;
        state.generateReportPDFErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.generateReportPDFError = payload?.response?.data?.message;
        } else {
          state.generateReportPDFError = payload?.message;
        }
      });
  },
});

export const { resetGenerateReportData, resetGenerateReportPDFData } =
  reportsSlice.actions;
export default reportsSlice.reducer;
