import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createList = createAsyncThunk(
  "list/createList",
  async ({ brandId, title, description }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand/${brandId}/list`, {
        title,
        description,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateList = createAsyncThunk(
  "list/updateList",
  async ({ brandId, listId, title, description }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand/${brandId}/list/${listId}`, {
        title,
        description,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async ({ brandId, listId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${brandId}/list/${listId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getList = createAsyncThunk(
  "list/getList",
  async ({ brandId, id }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/brand/${brandId}/list/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addInfluencerToList = createAsyncThunk(
  "list/addInfluencerToList",
  async ({ brandId, listId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/list/${listId}/influencer/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteInfluencerFromList = createAsyncThunk(
  "list/deleteInfluencerFromList",
  async ({ brandId, listId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${brandId}/list/${listId}/influencer/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInfluencers = createAsyncThunk(
  "list/getInfluencers",
  async ({ brandId, listId, size, page }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${brandId}/list/${listId}/influencers?size=${size}&page=${page}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
