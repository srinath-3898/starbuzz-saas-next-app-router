import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/signup`, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/signin`, { email, password });
      if (response?.data?.status === true) {
        localStorage.setItem("token", response?.data?.data?.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.get(`/user/profile`);
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify({
          user: response?.data?.data?.user,
          organisation: response?.data?.data?.organisation,
          isAdmin: response?.data?.data?.isAdmin,
          subscription: response?.data?.data?.subscription,
        })
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/mail/verify-email`, { email });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendForgotPasswordEmail = createAsyncThunk(
  "auth/sendForgotPasswordEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/mail/reset-password`, {
        email,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post("/user/profile/update-password", {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editprofile = createAsyncThunk(
  "auth/updateProfile",
  async ({ fullName, email, phone, city, country }, { rejectWithValue }) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/profile`, {
        fullName,
        email,
        phone,
        city,
        country,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAppTour = createAsyncThunk(
  "auth/updateAppTour",
  async (rejectWithValue) => {
    try {
      api.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      const response = await api.post(`/user/profile/update-app-tour`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
