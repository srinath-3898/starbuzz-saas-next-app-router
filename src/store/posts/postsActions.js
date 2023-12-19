import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

//get posts by campaign
export const fetchPostsByCampaign = createAsyncThunk(
  "posts/fetchPostsByCampaign",
  async ({ brandId, campaignId, size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/campaign/${campaignId}/posts?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get posts by campaign influencer
export const fetchPostsByCampaignInfluencer = createAsyncThunk(
  "posts/fetchPostsByCampaignInfluencer",
  async (
    { brandId, campaignId, username, size, page },
    { rejectWithValue }
  ) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/campaign/${campaignId}/influencer/${username}/posts?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//add post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (
    { brandId, campaignId, username, title, link, postDate, postType },
    { rejectWithValue }
  ) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/campaign/${campaignId}/influencer/${username}/post`,
        {
          title,
          link,
          postDate,
          postType,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get post by id
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/campaign/${params.id}/post/${params.postId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//remove post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ brandId, campaignId, postId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${brandId}/campaign/${campaignId}/post/${postId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update post by campaign influencer
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    { brandId, campaignId, username, id, title, link, postDate, postType },
    { rejectWithValue }
  ) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.put(
        `/user/brand/${brandId}/campaign/${campaignId}/influencer/${username}/post/${id}`,
        {
          title,
          link,
          postDate,
          postType,
        }
      );
      console.log(postType);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
