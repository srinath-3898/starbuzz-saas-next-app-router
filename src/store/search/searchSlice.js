import { createSlice } from "@reduxjs/toolkit";
import { getCitiesById, searchCitiesByName } from "./searchActions";

const initialState = {
  loading: false,
  cities: null,
  error: null,
  errorCode: null,
  getCitiesByIdLoading: false,
  citiesById: null,
  citiesByIdError: null,
  citiesByIdErrorCode: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetCitiesData: (state) => {
      (state.loading = false),
        (state.cities = null),
        (state.error = null),
        (state.errorCode = null);
    },
    resetCitiesByIdData: (state) => {
      state.getCitiesByIdLoading = false;
      state.citiesById = null;
      state.citiesByIdError = null;
      state.citiesByIdErrorCode = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchCitiesByName.pending, (state) => {
        state.loading = true;
        state.cities = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(searchCitiesByName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload?.data?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(searchCitiesByName.rejected, (state, { payload }) => {
        state.loading = false;
        state.cities = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
    builder
      .addCase(getCitiesById.pending, (state) => {
        state.getCitiesByIdLoading = true;
        state.cities = null;
        state.citiesByIdError = null;
        state.citiesByIdErrorCode = null;
      })
      .addCase(getCitiesById.fulfilled, (state, { payload }) => {
        state.getCitiesByIdLoading = false;
        state.cities = payload?.data?.data;
        state.citiesByIdError = null;
        state.citiesByIdErrorCode = null;
      })
      .addCase(getCitiesById.rejected, (state, { payload }) => {
        state.getCitiesByIdLoading = false;
        state.cities = null;
        state.citiesByIdErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.citiesByIdError = payload?.response?.data?.message;
        } else {
          state.citiesByIdError = payload?.message;
        }
      });
  },
});

export default searchSlice.reducer;
export const { resetCitiesData, resetCitiesByIdData } = searchSlice.actions;
