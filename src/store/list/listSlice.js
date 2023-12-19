import { createSlice } from "@reduxjs/toolkit";
import {
  addInfluencerToList,
  createList,
  deleteInfluencerFromList,
  deleteList,
  getInfluencers,
  getList,
  updateList,
} from "./listActions";

const initialState = {
  loading: false,
  list: null,
  error: null,
  errorCode: null,
  getInfluencersLoading: false,
  influencers: null,
  getInfluencersError: null,
  getInfluencersErrorCode: null,
  cudListLoading: false,
  cudListMessage: null,
  cudListError: null,
  cudListErrorCode: null,
  addInfluencerToListLoading: false,
  addInfluencerToListMessage: null,
  addInfluencerToListError: null,
  addInfluencerToListErrorCode: null,
  deleteInfluencerFromListLoading: false,
  deleteInfluencerFromListMessage: null,
  deleteInfluencerFromListError: null,
  deleteInfluencerFromListErrorCode: null,
};
const listSlice = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    resetListsData: (state) => {
      state.loading = false;
      state.list = null;
      state.error = null;
      state.errorCode = null;
    },
    resetCUDListData: (state) => {
      state.cudListLoading = false;
      state.cudListMessage = null;
      state.cudListError = null;
      state.cudListErrorCode = null;
    },

    resetAddinfluencerToListData: (state) => {
      state.addInfluencerToListLoading = false;
      state.addInfluencerToListMessage = null;
      state.addInfluencerToListError = null;
      state.addInfluencerToListErrorCode = null;
    },
    resetDeleteInfluencerFromListData: (state) => {
      state.deleteInfluencerFromListLoading = false;
      state.deleteInfluencerFromListMessage = null;
      state.deleteInfluencerFromListError = null;
      state.deleteInfluencerFromListErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    //create list
    builder
      .addCase(createList.pending, (state) => {
        state.cudListLoading = true;
        state.cudListMessage = null;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(createList.fulfilled, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = payload?.data?.message;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(createList.rejected, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = null;
        state.cudListErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.cudListError = payload?.response?.data?.message;
        } else {
          state.cudListError = payload?.message;
        }
      });

    //update list
    builder
      .addCase(updateList.pending, (state) => {
        state.cudListLoading = true;
        state.cudListMessage = null;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(updateList.fulfilled, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = payload?.data?.message;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(updateList.rejected, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = null;
        state.cudListErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.cudListError = payload?.response?.data?.message;
        } else {
          state.cudListError = payload?.message;
        }
      });

    //delete list
    builder
      .addCase(deleteList.pending, (state) => {
        state.cudListLoading = true;
        state.cudListMessage = null;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(deleteList.fulfilled, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = payload?.data?.message;
        state.cudListError = null;
        state.cudListErrorCode = null;
      })
      .addCase(deleteList.rejected, (state, { payload }) => {
        state.cudListLoading = false;
        state.cudListMessage = null;
        state.cudListErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.cudListError = payload?.response?.data?.message;
        } else {
          state.cudListError = payload?.message;
        }
      });

    //get list
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
        state.list = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload.data.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getList.rejected, (state, { payload }) => {
        state.loading = false;
        state.list = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //getInfluencers
    builder
      .addCase(getInfluencers.pending, (state) => {
        state.getInfluencersLoading = true;
        state.influencers = null;
        state.getInfluencersError = null;
        state.getInfluencersErrorCode = null;
      })
      .addCase(getInfluencers.fulfilled, (state, { payload }) => {
        state.getInfluencersLoading = false;
        state.influencers = payload?.data?.data;
        state.getInfluencersError = null;
        state.getInfluencersErrorCode = null;
      })
      .addCase(getInfluencers.rejected, (state, { payload }) => {
        state.getInfluencersLoading = false;
        state.influencers = null;
        state.getInfluencersErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getInfluencersError = payload?.response?.data?.message;
        } else {
          state.getInfluencersError = payload?.message;
        }
      });

    //add influencer to list
    builder
      .addCase(addInfluencerToList.pending, (state) => {
        state.addInfluencerToListLoading = true;
        state.addInfluencerToListMessage = null;
        state.addInfluencerToListError = null;
        state.addInfluencerToListErrorCode = null;
      })
      .addCase(addInfluencerToList.fulfilled, (state, { payload }) => {
        state.addInfluencerToListLoading = false;
        state.addInfluencerToListMessage = payload?.data?.message;
        state.addInfluencerToListError = null;
        state.addInfluencerToListErrorCode = null;
      })
      .addCase(addInfluencerToList.rejected, (state, { payload }) => {
        state.addInfluencerToListLoading = false;
        state.addInfluencerToListMessage = null;
        state.addInfluencerToListErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.addInfluencerToListError = payload?.response?.data?.message;
        } else {
          state.addInfluencerToListError = payload?.message;
        }
      });

    //delete influencer from list
    builder
      .addCase(deleteInfluencerFromList.pending, (state) => {
        state.deleteInfluencerFromListLoading = true;
        state.deleteInfluencerFromListMessage = null;
        state.deleteInfluencerFromListError = null;
        state.deleteInfluencerFromListErrorCode = null;
      })
      .addCase(deleteInfluencerFromList.fulfilled, (state, { payload }) => {
        state.deleteInfluencerFromListLoading = false;
        state.deleteInfluencerFromListMessage = payload?.data?.message;
        state.deleteInfluencerFromListError = null;
        state.deleteInfluencerFromListErrorCode = null;
      })
      .addCase(deleteInfluencerFromList.rejected, (state, { payload }) => {
        state.deleteInfluencerFromListLoading = false;
        state.deleteInfluencerFromListMessage = null;
        state.deleteInfluencerFromListErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.deleteInfluencerFromListError =
            payload?.response?.data?.message;
        } else {
          state.deleteInfluencerFromListError = payload?.message;
        }
      });
  },
});
export default listSlice.reducer;
export const {
  resetListsData,
  resetCUDListData,
  resetAddinfluencerToListData,
  resetDeleteInfluencerFromListData,
} = listSlice.actions;
