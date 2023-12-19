import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBillingAddress = createAsyncThunk(
  "payment/addBillingAddress",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/organisation`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// fetch all States (1 - India)

export const getStates = createAsyncThunk(
  "payment/getStates",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get("/user/country/1/states");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const generateCheckoutUrl = createAsyncThunk(
  "payment/generateCheckoutUrl",
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/payment/cb/generate-checkout-url",
        body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const generateAddonCheckoutUrl = createAsyncThunk(
  "payment/generateAddonCheckoutUrl",
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/add-on-payment/stripe/checkout",
        body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
