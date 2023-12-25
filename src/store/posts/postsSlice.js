import { createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  fetchPostById,
  fetchPostsByCampaign,
  fetchPostsByCampaignInfluencer,
  deletePost,
  updatePost,
} from "./postsActions";

const initialState = {
  postsByCampaignLoading: false,
  postsByCampaign: null,
  postsByCampaignError: null,
  postsByCampaignInfluencerLoading: false,
  postsByCampaignInfluencer: null,
  postsByCampaignInfluencerError: null,
  addPostLoading: false,
  addPostMessage: null,
  addPostError: null,
  getPostLoading: false,
  getPost: null,
  getPostError: null,
  deletePostLoading: false,
  deletePostMessage: null,
  deletePostError: null,
  updatePostLoading: false,
  updatePostMessage: null,
  updatePostError: null,
  errorCode: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetFetchPostsByCampaignData: (state) => {
      state.postsByCampaignLoading = false;
      state.postsByCampaign = null;
      state.postsByCampaignError = null;
      state.errorCode = null;
    },
    resetFetchPostsByCampaignInfluencerData: (state) => {
      state.postsByCampaignInfluencerLoading = false;
      state.postsByCampaignInfluencer = null;
      state.postsByCampaignInfluencerError = null;
      state.errorCode = null;
    },
    resetAddPostData: (state) => {
      state.addPostLoading = false;
      state.addPostMessage = null;
      state.addPostError = null;
      state.errorCode = null;
    },
    resetUpdatePostData: (state) => {
      state.updatePostLoading = false;
      state.updatePostMessage = null;
      state.updatePostError = null;
      state.errorCode = null;
    },
    resetDeletPostData: (state) => {
      state.deletePostLoading = false;
      state.deletePostMessage = null;
      state.deletePostError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByCampaign.pending, (state) => {
        state.postsByCampaignLoading = true;
        state.postsByCampaignError = null;
        state.errorCode = null;
      })
      .addCase(fetchPostsByCampaign.fulfilled, (state, { payload }) => {
        state.postsByCampaignLoading = false;
        state.postsByCampaign = payload?.data?.data;
        state.postsByCampaignError = null;
        state.errorCode = null;
      })
      .addCase(fetchPostsByCampaign.rejected, (state, { payload }) => {
        state.postsByCampaignLoading = false;
        state.postsByCampaign = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.postsByCampaignError = payload?.response?.data?.message;
        } else {
          state.postsByCampaignError = payload?.message;
        }
      });

    builder
      .addCase(fetchPostsByCampaignInfluencer.pending, (state) => {
        state.postsByCampaignInfluencerLoading = true;
        state.postsByCampaignInfluencerError = null;
        state.errorCode = null;
      })
      .addCase(
        fetchPostsByCampaignInfluencer.fulfilled,
        (state, { payload }) => {
          state.postsByCampaignInfluencerLoading = false;
          state.postsByCampaignInfluencer = payload?.data?.data;
          state.postsByCampaignInfluencerError = null;
          state.errorCode = null;
        }
      )
      .addCase(
        fetchPostsByCampaignInfluencer.rejected,
        (state, { payload }) => {
          state.postsByCampaignInfluencerLoading = false;
          state.postsByCampaignInfluencer = null;
          state.errorCode = payload?.response?.status;
          if (payload?.response?.data?.message) {
            state.postsByCampaignInfluencerError =
              payload?.response?.data?.message;
          } else {
            state.postsByCampaignInfluencerError = payload?.message;
          }
        }
      );

    builder
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostMessage = null;
        state.addPostError = null;
        state.errorCode = null;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.addPostLoading = false;
        state.addPostMessage = payload?.data?.message;
        state.addPostError = null;
        state.errorCode = null;
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.addPostLoading = false;
        state.errorCode = payload?.response?.data?.status;
        if (payload?.response?.data?.errors) {
          state.addPostError = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.addPostError = payload?.response?.data?.message;
        } else {
          state.addPostError = payload?.message;
        }
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.getPostLoading = true;
        state.getPost = null;
        state.getPostError = null;
        state.errorCode = null;
      })
      .addCase(fetchPostById.fulfilled, (state, { payload }) => {
        state.getPostLoading = false;
        state.getPost = payload?.data?.data;
        state.getPostError = null;
        state.errorCode = null;
      })
      .addCase(fetchPostById.rejected, (state, { payload }) => {
        state.getPostLoading = false;
        state.getPost = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getPostError = payload?.response?.data?.message;
        } else {
          state.getPostError = payload?.message;
        }
      });

    //remove post
    builder
      .addCase(deletePost.pending, (state) => {
        state.deletePostLoading = true;
        state.deletePostMessage = null;
        state.deletePostError = null;
        state.errorCode = null;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.deletePostLoading = false;
        state.deletePostMessage = payload?.data?.message;
        state.deletePostError = null;
        state.errorCode = null;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.deletePostLoading = false;
        state.deletePostMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.deletePostError = payload?.response?.data?.message;
        } else {
          state.deletePostError = payload?.message;
        }
      });

    builder
      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostMessage = null;
        state.updatePostError = null;
        state.errorCode = null;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.updatePostLoading = false;
        state.updatePostMessage = payload?.data?.message;
        state.updatePostError = null;
        state.errorCode = null;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.updatePostLoading = false;
        state.updatePostMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.errors) {
          state.addPostError = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.updatePostError = payload?.response?.data?.message;
        } else {
          state.updatePostError = payload?.message;
        }
      });
  },
});

export const {
  resetFetchPostsByCampaignInfluencerData,
  resetAddPostData,
  resetUpdatePostData,
  resetFetchPostsByCampaignData,
  resetDeletPostData,
} = postsSlice.actions;
export default postsSlice.reducer;
