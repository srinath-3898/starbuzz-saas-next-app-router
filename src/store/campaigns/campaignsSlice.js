import { createSlice } from "@reduxjs/toolkit";
import { getCampaigns } from "./campaignsActions";

const initialState = {
  loading: false,
  campaigns: null,
  error: null,
  errorCode: null,
};

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    resetCampaignsData: (state) => {
      state.loading = false;
      state.campaigns = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    //getCampaigns
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getCampaigns.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.campaigns = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getCampaigns.rejected, (state, { payload }) => {
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

export default campaignsSlice.reducer;
export const { resetCampaignsData } = campaignsSlice.actions;
