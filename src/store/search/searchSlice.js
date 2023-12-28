import { createSlice } from "@reduxjs/toolkit";
import { searchCitiesByName } from "./searchActions";

const initialState = {
  loading: false,
  cities: null,
  error: null,
  errorCode: null,
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
  },
});
export default searchSlice.reducer;
export const { resetCitiesData } = searchSlice.actions;
