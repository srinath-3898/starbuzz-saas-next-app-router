import { createSlice } from "@reduxjs/toolkit";
import { getAllBrands, fetchBrandsbyName } from "./brandsActions";

const initialState = {
  loading: false,
  brands: null,
  error: null,
  searchedbrands: null,
  searchedbrandsLoading: false,
  searchedbrandsError: null,
  errorCode: null,
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    resetBrandsData: (state) => {
      state.loading = false;
      state.brands = null;
      state.error = null;
      state.errorCode = null;
    },
    resetSearchedBrandsData: (state) => {
      state.searchedbrands = null;
      state.searchedbrandsLoading = false;
      state.searchedbrandsError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.brands = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        let brands = localStorage.getItem("brands");
        if (brands === null && payload?.page === 1) {
          localStorage.setItem(
            "brands",
            JSON.stringify(payload?.response?.data?.data?.data)
          );
        } else if (brands !== null && payload?.page !== 1) {
          brands = [
            ...JSON.parse(brands),
            ...payload?.response?.data?.data?.data,
          ];
          localStorage.setItem("brands", JSON.stringify(brands));
        }
        state.brands = payload?.response?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getAllBrands.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
          state.errorCode = null;
        } else {
          state.error = payload?.message;
        }
      })
      .addCase(fetchBrandsbyName.pending, (state) => {
        state.searchedbrandsLoading = true;
        state.searchedbrands = null;
        state.searchedbrandsError = null;
        state.errorCode = null;
      })
      .addCase(fetchBrandsbyName.fulfilled, (state, { payload }) => {
        state.searchedbrandsLoading = false;
        state.searchedbrands = payload?.response?.data?.data;
        state.searchedbrandsError = null;
        state.errorCode = null;
      })
      .addCase(fetchBrandsbyName.rejected, (state, { payload }) => {
        state.searchedbrandsLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.searchedbrandsError = payload?.response?.data?.message;
          state.errorCode = null;
        } else {
          state.searchedbrandsError = payload?.message;
        }
      });
  },
});

export default brandsSlice.reducer;

export const { resetBrandsData, resetSearchedBrandsData } = brandsSlice.actions;
