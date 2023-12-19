import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCampaign = createAsyncThunk(
  "campaign/getCampaign",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInfluencers = createAsyncThunk(
  "campaign/getInfluencers",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencers?size=${params.size}&page=${params.page}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async ({ brandId, data }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/brand/${brandId}/campaign`, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaign/update_campaign",
  async ({ brandId, campaignId, data }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/campaign/${campaignId}`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  "campaign/deleteCampaign",
  async ({ brandId, campaignId }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${brandId}/campaign/${campaignId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addInfluencerToCampaign = createAsyncThunk(
  "campaign/addInfluencerToCampaign",
  async ({ brandId, campaignId, username }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/campaign/${campaignId}/influencer/${username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteInfluencerFromCampaign = createAsyncThunk(
  "campaign/deleteInfluencerFromCampaign",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.delete(
        `/user/brand/${params.brandId}/campaign/${params.campaignId}/influencer/${params.username}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCampaignInfluencer = createAsyncThunk(
  "campaign/updateCampaignInfluencer",
  async (
    { status, budget, brandId, campaignId, username, notes },
    { rejectWithValue }
  ) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.put(
        `/user/brand/${brandId}/campaign/${campaignId}/influencer/${username}`,
        {
          status: status,
          budget: budget,
          notes: notes,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const startCampaign = createAsyncThunk(
  "campaign/startCampaign",
  async ({ brandId, campaignId, data }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/campaign/${campaignId}/start`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCampaignDetails = createAsyncThunk(
  "campaign/updateCampaignDetails",
  async ({ brandId, campaignId, data }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(
        `/user/brand/${brandId}/campaign/${campaignId}/update-details`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
