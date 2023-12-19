import { createSlice } from "@reduxjs/toolkit";
import { fetchListsByBrand } from "./listsActions";

const initialState = {
  loading: false,
  lists: null,
  error: null,
  errorCode: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    resetListsData: (state) => {
      state.loading = false;
      state.lists = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListsByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchListsByBrand.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.lists = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchListsByBrand.rejected, (state, { payload }) => {
        state.loading = false;
        state.lists = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default listsSlice.reducer;
export const { resetListsData } = listsSlice.actions;
