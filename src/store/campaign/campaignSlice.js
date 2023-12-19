import { createSlice } from "@reduxjs/toolkit";
import {
  createCampaign,
  getCampaign,
  updateCampaign,
  addInfluencerToCampaign,
  deleteInfluencerFromCampaign,
  getInfluencers,
  deleteCampaign,
  updateCampaignInfluencer,
  startCampaign,
  updateCampaignDetails,
} from "./campaignActions";

const initialState = {
  loading: false,
  error: null,
  campaign: null,
  cudCampaignLoading: false,
  cudCampaignMessage: null,
  cudCampaignError: null,
  addInfluencerToCampaignLoading: false,
  addInfluencerToCampaignMessage: null,
  addInfluencerToCampaignError: null,
  deleteInfluencerFromCampaignLoading: false,
  deleteInfluencerFromCampaignMessage: null,
  deleteInfluencerFromCampaignError: false,
  campaignStartLoading: false,
  campaignStartMessage: null,
  campaignStartError: null,

  updateCampaignInfluencerLoading: false,
  updateCampaignDetailsLoading: false,
  updateCampaignDetailsMessage: null,
  updateCampaignDetailsError: null,
  updateCampaignInfluencerMessage: null,
  updateCampaignInfluencerError: null,
  getInfluencersLoading: false,
  influencers: null,
  getInfluencersError: null,
  getInfluencersErrorCode: null,
  errorCode: null,
  is_automated: null,
};
export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    resetCampaignData: (state) => {
      state.campaign = null;
      state.influencers = null;
      state.errorCode = null;
    },
    resetCUDCampaignData: (state) => {
      state.cudCampaignLoading = false;
      state.cudCampaignMessage = null;
      state.cudCampaignError = null;
      state.errorCode = null;
    },
    resetAddInfluencerToCampaignData: (state) => {
      state.addInfluencerToCampaignLoading = false;
      state.addInfluencerToCampaignMessage = null;
      state.addInfluencerToCampaignError = false;
      state.errorCode = null;
    },
    resetDeleteInfluencerFromCampaignData: (state) => {
      state.deleteInfluencerFromCampaignLoading = false;
      state.deleteInfluencerFromCampaignError = false;
      state.deleteInfluencerFromCampaignMessage = null;
      state.errorCode = null;
    },
    resetGetInfluencersData: (state) => {
      state.getInfluencersLoading = false;
      state.influencers = null;
      state.error = null;
      state.errorCode = null;
    },
    resetUpdateCampaignInfluencerData: (state) => {
      state.updateCampaignInfluencerLoading = false;
      state.updateCampaignInfluencerMessage = null;
      state.updateCampaignInfluencerError = null;
      state.errorCode = null;
    },
    resetCampaignDetailsData: (state) => {
      state.updateCampaignDetailsLoading = false;
      state.updateCampaignDetailsMessage = null;
      state.updateCampaignDetailsError = null;
      state.errorCode = null;
    },
    resetCampaignStartData: (state) => {
      state.campaignStartLoading = false;
      state.campaignStartMessage = null;
      state.campaignStartError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    //Get Campaign
    builder
      .addCase(getCampaign.pending, (state) => {
        state.loading = true;
        state.campaign = null;
        state.is_automated = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getCampaign.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.campaign = payload?.data?.data;
        state.is_automated = payload?.data?.data?.is_automated;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getCampaign.rejected, (state, { payload }) => {
        state.loading = false;
        state.campaign = null;
        state.is_automated = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //Get influencers of a campaign
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

    //createCampaign
    builder
      .addCase(createCampaign.pending, (state) => {
        state.cudCampaignLoading = true;
        state.cudCampaignMessage = null;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(createCampaign.fulfilled, (state, { payload }) => {
        state.cudCampaignLoading = false;
        state.cudCampaignMessage = payload?.data?.message;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(createCampaign.rejected, (state, { payload }) => {
        console.log(payload);
        state.cudCampaignLoading = false;
        state.cudCampaignMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.errors) {
          state.cudCampaignError = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.cudCampaignError = payload?.response?.data?.message;
        } else {
          state.cudCampaignError = payload?.message;
        }
      });

    //Update Campaign
    builder
      .addCase(updateCampaign.pending, (state) => {
        state.cudCampaignLoading = true;
        state.cudCampaignMessage = null;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaign.fulfilled, (state, { payload }) => {
        state.cudCampaignLoading = false;
        state.cudCampaignMessage = payload?.data?.message;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaign.rejected, (state, { payload }) => {
        state.cudCampaignLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.errors) {
          state.cudCampaignError = payload?.response?.data?.errors[0].msg;
        } else if (payload?.response?.data?.message) {
          state.cudCampaignError = payload?.response?.data?.message;
        } else {
          state.cudCampaignError = payload?.message;
        }
      });

    //Remove Campaign
    builder
      .addCase(deleteCampaign.pending, (state) => {
        state.cudCampaignLoading = true;
        state.cudCampaignMessage = null;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, { payload }) => {
        state.cudCampaignLoading = false;
        state.cudCampaignMessage = payload?.data?.message;
        state.cudCampaignError = null;
        state.errorCode = null;
      })
      .addCase(deleteCampaign.rejected, (state, { payload }) => {
        state.cudCampaignLoading = false;
        state.cudCampaignMessage = null;
        state.errorCode = payload?.response?.status;

        if (payload?.response?.data?.message) {
          state.cudCampaignError = payload?.response?.data?.message;
        } else {
          state.cudCampaignError = payload?.message;
        }
      });

    //Add influencer to a campaign
    builder
      .addCase(addInfluencerToCampaign.pending, (state) => {
        state.addInfluencerToCampaignLoading = true;
        state.addInfluencerToCampaignMessage = null;
        state.addInfluencerToCampaignError = null;
        state.errorCode = null;
      })
      .addCase(addInfluencerToCampaign.fulfilled, (state, { payload }) => {
        state.addInfluencerToCampaignLoading = false;
        state.addInfluencerToCampaignMessage = payload?.data?.message;
        state.addInfluencerToCampaignError = null;
        state.errorCode = null;
      })
      .addCase(addInfluencerToCampaign.rejected, (state, { payload }) => {
        state.addInfluencerToCampaignLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.addInfluencerToCampaignError = payload?.response?.data?.message;
        } else {
          state.addInfluencerToCampaignError = payload?.message;
        }
      });

    //Delete influencer from campaign
    builder.addCase(deleteInfluencerFromCampaign.pending, (state) => {
      state.deleteInfluencerFromCampaignLoading = true;
      state.deleteInfluencerFromCampaignMessage = null;
      state.deleteInfluencerFromCampaignError = null;
      state.errorCode = null;
    });
    builder
      .addCase(deleteInfluencerFromCampaign.fulfilled, (state, { payload }) => {
        state.deleteInfluencerFromCampaignLoading = false;
        state.deleteInfluencerFromCampaignMessage = payload?.data?.message;
        state.deleteInfluencerFromCampaignError = null;
        state.errorCode = null;
      })
      .addCase(deleteInfluencerFromCampaign.rejected, (state, { payload }) => {
        state.deleteInfluencerFromCampaignLoading = false;
        state.deleteInfluencerFromCampaignMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.deleteInfluencerFromCampaignError =
            payload?.response?.data?.message;
        } else {
          state.deleteInfluencerFromCampaignError = payload?.message;
        }
      });

    //updateCampaignInfluencer
    builder
      .addCase(updateCampaignInfluencer.pending, (state) => {
        state.updateCampaignInfluencerLoading = true;
        state.updateCampaignInfluencerMessage = null;
        state.updateCampaignInfluencerError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaignInfluencer.fulfilled, (state, { payload }) => {
        state.updateCampaignInfluencerLoading = false;
        state.updateCampaignInfluencerMessage = payload?.data?.message;
        state.updateCampaignInfluencerError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaignInfluencer.rejected, (state, { payload }) => {
        state.updateCampaignInfluencerLoading = false;
        state.updateCampaignInfluencerMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.deleteInfluencerFromCampaignError =
            payload?.response?.data?.message;
        } else {
          state.deleteInfluencerFromCampaignError = payload?.message;
        }
      });

    //start campaign

    builder
      .addCase(startCampaign.pending, (state) => {
        state.campaignStartLoading = true;
        state.campaignStartMessage = null;
        state.campaignStartError = null;
        state.errorCode = null;
      })
      .addCase(startCampaign.fulfilled, (state, { payload }) => {
        state.campaignStartLoading = false;
        state.campaignStartMessage = payload?.data?.message;
        console.log(payload?.data?.message);
        console.log(payload);

        state.campaignStartError = null;
        state.errorCode = null;
      })
      .addCase(startCampaign.rejected, (state, { payload }) => {
        state.campaignStartLoading = false;
        state.campaignStartMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.campaignStartError = payload?.response?.data?.message;
        } else {
          state.campaignStartError = payload?.message;
        }
      });

    //update campaign
    builder
      .addCase(updateCampaignDetails.pending, (state) => {
        state.updateCampaignDetailsLoading = true;
        state.updateCampaignDetailsMessage = null;
        state.updateCampaignDetailsError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaignDetails.fulfilled, (state, { payload }) => {
        state.updateCampaignDetailsLoading = false;
        state.updateCampaignDetailsMessage = payload?.data?.message;
        console.log(payload?.data?.message);
        state.updateCampaignDetailsError = null;
        state.errorCode = null;
      })
      .addCase(updateCampaignDetails.rejected, (state, { payload }) => {
        state.updateCampaignDetailsLoading = false;
        state.updateCampaignDetailsMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.updateCampaignDetailsError = payload?.response?.data?.message;
        } else {
          state.updateCampaignDetailsError = payload?.message;
        }
      });
  },
});
export const {
  resetCampaignData,
  resetCUDCampaignData,
  resetAddInfluencerToCampaignData,
  resetDeleteInfluencerFromCampaignData,
  resetGetInfluencersData,
  resetUpdateCampaignInfluencerData,
  resetCampaignStartData,
  resetCampaignDetailsData,
} = campaignSlice.actions;
export default campaignSlice.reducer;
