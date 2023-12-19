import { createSlice } from "@reduxjs/toolkit";
import { searchInfluencersByUsername } from "./searchInfluencersActions";

const initialState = {
  loading: false,
  influencers: null,
  error: null,
  errorCode: null,
};

const searchInfluencersSlice = createSlice({
  name: "searchInfluencers",
  initialState: initialState,
  reducers: {
    resetSearchInfluencersData: (state) => {
      state.loading = false;
      state.influencers = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchInfluencersByUsername.pending, (state) => {
        state.loading = true;
        state.influencers = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(searchInfluencersByUsername.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.influencers = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(searchInfluencersByUsername.rejected, (state, { payload }) => {
        state.loading = false;
        state.influencers = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default searchInfluencersSlice.reducer;
export const { resetSearchInfluencersData } = searchInfluencersSlice.actions;
