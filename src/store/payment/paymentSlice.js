import { createSlice } from "@reduxjs/toolkit";
import {
  addBillingAddress,
  generateAddonCheckoutUrl,
  generateCheckoutUrl,
  getStates,
} from "./paymentActions";

const initialState = {
  addBillingAddressLoading: false,
  addBillingAddressMessage: null,
  addBillingAddressError: null,
  addBillingAddressErrorCode: null,
  generateCheckoutURLLoading: false,
  checkoutURL: null,
  generateCheckoutURLError: null,
  generateCheckoutURLErrorCode: null,
  generateAddonCheckoutUrlLoading: false,
  addonCheckoutURL: null,
  generateAddonCheckoutUrlError: null,
  generateAddonCheckoutUrlErrorCode: null,
  getStatesLoading: false,
  states: null,
  getStatesError: null,
  getStatesErrorCode: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetAddBillingAddressData: (state) => {
      state.addBillingAddressLoading = false;
      state.addBillingAddressMessage = null;
      state.addBillingAddressError = null;
      state.addBillingAddressErrorCode = null;
    },
    resetGenerateCheckoutURLData: (state) => {
      state.generateCheckoutURLLoading = false;
      state.checkoutURL = null;
      state.generateCheckoutURLError = null;
      state.generateCheckoutURLErrorCode = null;
    },
    resetGenerateAddonCheckoutUrlData: (state) => {
      state.generateAddonCheckoutUrlLoading = false;
      state.addonCheckoutURL = null;
      state.generateAddonCheckoutUrlError = null;
      state.generateAddonCheckoutUrlErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    // addBillingAddress
    builder
      .addCase(addBillingAddress.pending, (state) => {
        state.addBillingAddressLoading = true;
        state.addBillingAddressMessage = null;
        state.addBillingAddressError = null;
        state.addBillingAddressErrorCode = null;
      })
      .addCase(addBillingAddress.fulfilled, (state, { payload }) => {
        state.addBillingAddressLoading = false;
        state.addBillingAddressMessage = payload?.data?.message;
        state.addBillingAddressError = null;
        state.addBillingAddressErrorCode = null;
      })
      .addCase(addBillingAddress.rejected, (state, { payload }) => {
        state.addBillingAddressLoading = false;
        state.addBillingAddressMessage = null;
        state.addBillingAddressErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.addBillingAddressError = payload?.response?.data?.message;
        } else {
          state.addBillingAddressError = payload?.message;
        }
      });

    // generateCheckoutUrl

    builder
      .addCase(generateCheckoutUrl.pending, (state) => {
        state.generateCheckoutURLLoading = true;
        state.checkoutURL = null;
        state.generateCheckoutURLError = null;
        state.generateCheckoutURLErrorCode = null;
      })
      .addCase(generateCheckoutUrl.fulfilled, (state, { payload }) => {
        state.generateCheckoutURLLoading = false;
        state.checkoutURL = payload?.data?.data?.url;
        state.generateCheckoutURLError = null;
        state.generateCheckoutURLErrorCode = null;
      })
      .addCase(generateCheckoutUrl.rejected, (state, { payload }) => {
        state.generateCheckoutURLLoading = false;
        state.checkoutURL = null;
        state.generateCheckoutURLErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.generateCheckoutURLError = payload?.response?.data?.message;
        } else {
          state.generateCheckoutURLError = payload?.message;
        }
      });

    // generateAddonCheckoutUrl

    builder
      .addCase(generateAddonCheckoutUrl.pending, (state) => {
        state.generateAddonCheckoutUrlLoading = true;
        state.addonCheckoutURL = null;
        state.generateAddonCheckoutUrlError = null;
        state.generateAddonCheckoutUrlErrorCode = null;
      })
      .addCase(generateAddonCheckoutUrl.fulfilled, (state, { payload }) => {
        state.generateAddonCheckoutUrlLoading = false;
        state.addonCheckoutURL = payload?.data?.data?.url;
        state.generateAddonCheckoutUrlError = null;
        state.generateAddonCheckoutUrlErrorCode = null;
      })
      .addCase(generateAddonCheckoutUrl.rejected, (state, { payload }) => {
        state.generateAddonCheckoutUrlLoading = false;
        state.addonCheckoutURL = null;
        state.generateAddonCheckoutUrlErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.generateAddonCheckoutUrlError =
            payload?.response?.data?.message;
        } else {
          state.generateAddonCheckoutUrlError = payload?.message;
        }
      });

    //get states

    builder
      .addCase(getStates.pending, (state) => {
        state.getStatesLoading = true;
        state.getStatesError = null;
        state.getStatesErrorCode = null;
        state.states = null;
      })
      .addCase(getStates.fulfilled, (state, { payload }) => {
        state.getStatesLoading = false;
        state.states = payload?.data?.data;
        state.getStatesError = null;
        state.getStatesErrorCode = null;
      })
      .addCase(getStates.rejected, (state, { payload }) => {
        state.getStatesLoading = false;
        state.states = null;
        state.getStatesErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.getStatesError = payload?.response?.data?.message;
        } else {
          state.getStatesError = payload?.message;
        }
      });
  },
});

export default paymentSlice.reducer;
export const {
  resetAddBillingAddressData,
  resetGenerateCheckoutURLData,
  resetGenerateAddonCheckoutUrlData,
} = paymentSlice.actions;
