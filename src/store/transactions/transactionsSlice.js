import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsByBrand } from "./transactionsActions";

const initialState = {
  loading: false,
  transactions: null,
  error: null,
  errorCode: null,
};
export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetTransactionsData: (state) => {
      state.loading = false;
      state.transactions = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getTransactionsByBrand.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getTransactionsByBrand.rejected, (state, { payload }) => {
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
export const { resetTransactionsData } = transactionsSlice.actions;
export default transactionsSlice.reducer;
