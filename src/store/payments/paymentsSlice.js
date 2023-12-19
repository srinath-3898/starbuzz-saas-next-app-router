import { createSlice } from "@reduxjs/toolkit";
import { getAddonPayments, getPayments } from "./paymentsActions";

const initialState = {
  paymentsLoading: false,
  addonPaymentsLoading: false,
  payments: null,
  addonPayments: null,
  paymentsError: null,
  paymentsErrorCode: null,
  addonPaymentsError: null,
  addonPaymentsErrorCode: null,
};
export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    resetPaymentsData: (state) => {
      state.paymentsLoading = false;
      state.payments = null;
      state.paymentsError = null;
      state.paymentsErrorCode = null;
    },
    resetAddonPaymentsData: (state) => {
      state.addonPaymentsLoading = false;
      state.addonPayments = null;
      state.addonPaymentsError = null;
      state.addonPaymentsErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    //get all payments
    builder
      .addCase(getPayments.pending, (state) => {
        state.paymentsLoading = true;
        state.paymentsError = null;
        state.paymentsErrorCode = null;
      })
      .addCase(getPayments.fulfilled, (state, { payload }) => {
        state.paymentsLoading = false;
        state.payments = payload?.data?.data;
        state.paymentsError = null;
        state.paymentsErrorCode = null;
      })
      .addCase(getPayments.rejected, (state, { payload }) => {
        state.paymentsLoading = false;
        state.payments = null;
        state.paymentsErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.paymentsError = payload?.response?.data?.message;
        } else {
          state.paymentsError = payload?.message;
        }
      });

    builder
      .addCase(getAddonPayments.pending, (state) => {
        state.addonPaymentsLoading = true;
        state.addonPaymentsError = null;
        state.addonPaymentsErrorCode = null;
      })
      .addCase(getAddonPayments.fulfilled, (state, { payload }) => {
        state.addonPaymentsLoading = false;
        state.addonPayments = payload?.data?.data;
        state.addonPaymentsError = null;
        state.addonPaymentsErrorCode = null;
      })
      .addCase(getAddonPayments.rejected, (state, { payload }) => {
        state.addonPaymentsLoading = false;
        state.addonPayments = null;
        state.addonPaymentsErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.addonPaymentsError = payload?.response?.data?.message;
        } else {
          state.addonPaymentsError = payload?.message;
        }
      });
  },
});
export default paymentsSlice.reducer;
export const { resetPaymentsData, resetAddonPaymentsData } =
  paymentsSlice.actions;
