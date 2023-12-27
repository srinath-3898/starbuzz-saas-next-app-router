import {
  discoverInfluencers,
  discoverYoutubeInfluencers,
  getFreemiumInfluencers,
  getFreemiumYoutubeInfluencers,
  getRecentSearch,
} from "./discoveryActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  hasEnoughCredits: true,
  influencers: null,
  message: null,
  error: null,
  errorCode: null,
  youtubeInfluencersLoading: false,
  youtubeInfluencers: null,
  youtubeInfluencersMessage: null,
  youtubeInfluencersError: null,
  youtubeInfluencersErrorCode: null,
  getFreemiumInfluencersLoading: false,
  freemiumInfluencers: null,
  getFreemiumInfluencersError: null,
  getFreemiumInfluencersErrorCode: null,
  getFreemiumYoutubeInfluencersLoading: false,
  freemiumYoutubeInfluencers: null,
  getFreemiumYoutubeInfluencersError: null,
  getFreemiumYoutubeInfluencersErrorCode: null,
  recentSearchLoading: false,
  recentSearchInfluencers: null,
  recentSearchBody: null,
  recentSearchError: null,
  recentSearchErrorCode: null,
};

const discoverySlice = createSlice({
  name: "discovery",
  initialState: initialState,
  reducers: {
    resetDiscoverInfluencersData: (state) => {
      state.loading = false;
      state.hasEnoughCredits = true;
      state.influencers = null;
      state.error = null;
      state.errorCode = null;
    },
    resetDiscoverYoutubeInfluencerData: (state) => {
      state.youtubeInfluencersLoading = false;
      state.youtubeInfluencers = null;
      state.youtubeInfluencersMessage = null;
      state.youtubeInfluencersError = null;
      state.youtubeInfluencersErrorCode = null;
    },
    resetRecentSearchData: (state) => {
      state.recentSearchLoading = false;
      state.recentSearchInfluencers = null;
      state.recentSearchBody = null;
      state.recentSearchError = null;
      state.recentSearchErrorCode = null;
    },
    resetFreemiumInfluencersData: (state) => {
      state.getFreemiumInfluencersLoading = false;
      state.freemiumInfluencers = null;
      state.getFreemiumInfluencersError = null;
      state.getFreemiumInfluencersErrorCode = null;
    },
    resetFreemiumYoutubeInfluencersData: (state) => {
      state.getFreemiumYoutubeInfluencersLoading = false;
      state.freemiumYoutubeInfluencers = null;
      state.getFreemiumYoutubeInfluencersError = null;
      state.getFreemiumYoutubeInfluencersErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFreemiumInfluencers.pending, (state) => {
        state.getFreemiumInfluencersLoading = true;
        state.getFreemiumInfluencersError = null;
        state.getFreemiumInfluencersErrorCode = null;
      })
      .addCase(getFreemiumInfluencers.fulfilled, (state, { payload }) => {
        state.getFreemiumInfluencersLoading = false;
        state.freemiumInfluencers = payload?.data?.data;
        state.getFreemiumInfluencersError = null;
        state.getFreemiumInfluencersErrorCode = null;
      })
      .addCase(getFreemiumInfluencers.rejected, (state, { payload }) => {
        state.getFreemiumInfluencersLoading = false;
        state.freemiumInfluencers = null;
        state.getFreemiumInfluencersErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getFreemiumInfluencersError = payload?.response?.data?.message;
        } else {
          state.getFreemiumInfluencersError = payload?.message;
        }
      });

    builder
      .addCase(getFreemiumYoutubeInfluencers.pending, (state) => {
        state.getFreemiumYoutubeInfluencersLoading = true;
        state.getFreemiumYoutubeInfluencersError = null;
        state.getFreemiumYoutubeInfluencersErrorCode = null;
      })
      .addCase(
        getFreemiumYoutubeInfluencers.fulfilled,
        (state, { payload }) => {
          state.getFreemiumYoutubeInfluencersLoading = false;
          state.freemiumYoutubeInfluencers = payload?.data?.data;
          state.getFreemiumYoutubeInfluencersError = null;
          state.getFreemiumYoutubeInfluencersErrorCode = null;
        }
      )
      .addCase(getFreemiumYoutubeInfluencers.rejected, (state, { payload }) => {
        state.getFreemiumYoutubeInfluencersLoading = false;
        state.freemiumYoutubeInfluencers = null;
        state.getFreemiumYoutubeInfluencersErrorCode =
          payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getFreemiumYoutubeInfluencersError =
            payload?.response?.data?.message;
        } else {
          state.getFreemiumYoutubeInfluencersError = payload?.message;
        }
      });

    builder
      .addCase(discoverInfluencers.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.hasEnoughCredits = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(discoverInfluencers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.influencers = payload?.data?.data?.result;
        state.message = payload.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(discoverInfluencers.rejected, (state, { payload }) => {
        state.loading = false;
        state.influencers = null;
        state.message = null;
        state.hasEnoughCredits = true;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
          state.errorCode = payload?.response?.status;
        } else {
          state.error = payload?.message;
          state.errorCode = payload?.response?.status;
        }
      });

    builder
      .addCase(discoverYoutubeInfluencers.pending, (state) => {
        state.youtubeInfluencersLoading = true;
        state.hasEnoughCredits = true;
        state.youtubeInfluencersError = null;
        state.youtubeInfluencersErrorCode = null;
      })
      .addCase(discoverYoutubeInfluencers.fulfilled, (state, { payload }) => {
        state.youtubeInfluencersLoading = false;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.youtubeInfluencers = payload?.data?.data?.result;
        state.youtubeInfluencersMessage = payload.data?.message;
        state.youtubeInfluencersError = null;
        state.youtubeInfluencersErrorCode = null;
      })
      .addCase(discoverYoutubeInfluencers.rejected, (state, { payload }) => {
        state.youtubeInfluencersLoading = false;
        state.youtubeInfluencers = null;
        state.youtubeInfluencersMessage = null;
        state.hasEnoughCredits = true;
        state.youtubeInfluencersErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.youtubeInfluencersError = payload?.response?.data?.message;
        } else {
          state.youtubeInfluencersError = payload?.message;
        }
      });

    builder
      .addCase(getRecentSearch.pending, (state) => {
        state.recentSearchLoading = true;
        state.recentSearchInfluencers = null;
        state.recentSearchBody = null;
        state.recentSearchError = null;
        state.recentSearchErrorCode = null;
      })
      .addCase(getRecentSearch.fulfilled, (state, { payload }) => {
        state.recentSearchLoading = false;
        state.recentSearchBody = payload.data?.data?.body;
        state.recentSearchInfluencers = payload.data?.data?.result;
        state.recentSearchError = null;
        state.recentSearchErrorCode = null;
      })
      .addCase(getRecentSearch.rejected, (state, { payload }) => {
        state.recentSearchLoading = false;
        state.recentSearchInfluencers = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.recentSearchError = payload?.response?.data?.message;
          state.recentSearchErrorCode = null;
        } else {
          state.recentSearchError = payload?.message;
          state.recentSearchErrorCode = payload?.response?.status;
        }
      });
  },
});

export default discoverySlice.reducer;
export const {
  resetDiscoverInfluencersData,
  resetRecentSearchData,
  resetFreemiumInfluencersData,
  resetFreemiumYoutubeInfluencersData,
  resetDiscoverYoutubeInfluencerData,
} = discoverySlice.actions;
