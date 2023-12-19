import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

//get post metrics
export const getPostMetrics = createAsyncThunk(
  "postmetrics/getPostMetrics",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/campaign/${Number(
          params.id
        )}/influencer/${params.username}/post/${params.postId}/metrics?size=${
          params.size
        }&page=${params.page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//add post metrics

export const addPostMetrics = createAsyncThunk(
  "postmetrics/addPostMetrics",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencer/${params.username}/post/${params.postId}/metrics`,
        {
          views: params.views,
          likes: params.likes,
          comments: params.comments,
          shares: params.shares,
          saves: params.saves,
          timestamp: params.timestamp,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update post metrics
export const updatePostMetrics = createAsyncThunk(
  "postmetrics/updatePostMetrics",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.put(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencer/${params.username}/post/${params.postId}/metrics/${params.metricsId}`,
        {
          views: params.views,
          likes: params.likes,
          comments: params.comments,
          shares: params.shares,
          saves: params.saves,
          timestamp: params.timestamp,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//remove post metrics
export const removePostMetrics = createAsyncThunk(
  "postmetrics/removePostMetrics",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencer/${params.username}/post/${params.postId}/metrics/${params.metricsId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get post metrics by id
export const getPostMetricsById = createAsyncThunk(
  "postmetrics/getPostMetricsById",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencer/${params.username}/post/${params.postId}/metrics/${params.metricsId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
