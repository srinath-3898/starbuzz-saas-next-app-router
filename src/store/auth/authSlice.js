import {
  changePassword,
  editprofile,
  getUserDetails,
  sendForgotPasswordEmail,
  signin,
  signup,
  verifyEmail,
  updateAppTour,
} from "./authActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  message: null,
  token: null,
  user: null,
  organisation: null,
  subscription: null,
  isAdmin: null,
  errorCode: null,
  error: null,
  verifyEmailLoading: false,
  verifyEmailMessage: null,
  verifyEmailError: null,
  sendForgotPasswordEmailLoading: false,
  sendForgotPasswordEmailMessage: null,
  sendForgotPasswordEmailError: null,
  changePasswordLoading: false,
  changePasswordMessage: null,
  changePasswordError: null,
  editProfileLoading: false,
  editProfileMessage: null,
  editProfileError: null,
  appTourLoading: false,
  appTourMessage: null,
  appTourError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.message = null;
      state.token = null;
      state.user = null;
      state.organisation = null;
      state.subscription = null;
      state.isAdmin = null;
      state.errorCode = null;
      state.error = null;
      state.verifyEmailLoading = false;
      state.verifyEmailMessage = null;
      state.verifyEmailError = null;
      state.sendForgotPasswordEmailLoading = false;
      state.sendForgotPasswordEmailMessage = null;
      state.sendForgotPasswordEmailError = null;
      state.changePasswordLoading = false;
      state.changePasswordMessage = null;
      state.changePasswordError = null;
      state.editProfileLoading = false;
      state.editProfileMessage = null;
      state.editProfileError = null;
      state.appTourLoading = false;
      state.appTourMessage = null;
      state.appTourError = null;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUserDetails: (state, { payload }) => {
      const { user, organisation, subscription, isAdmin } = payload;
      state.user = user;
      state.organisation = organisation;
      state.subscription = subscription;
      state.isAdmin = isAdmin;
    },
    resetUserDetails: (state) => {
      state.user = null;
      state.organisation = null;
      state.subscription = null;
      state.isAdmin = null;
    },

    resetAuthData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.errorCode = null;
    },
    resetVerifyEmailData: (state) => {
      state.verifyEmailLoading = false;
      state.verifyEmailMessage = null;
      state.verifyEmailError = null;
      state.errorCode = null;
    },
    resetSendForgotPasswordEmailData: (state) => {
      state.sendForgotPasswordEmailLoading = false;
      state.sendForgotPasswordEmailMessage = null;
      state.sendForgotPasswordEmailError = null;
      state.errorCode = null;
    },
    resetChangePasswordData: (state) => {
      state.changePasswordLoading = false;
      state.changePasswordMessage = null;
      state.changePasswordError = null;
      state.errorCode = null;
    },
    resetEditProfileData: (state) => {
      state.editProfileLoading = false;
      state.editProfileMessage = null;
      state.editProfileError = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    //signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.errors?.length > 0) {
          state.error = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //signin
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload?.data?.data?.token;
        state.message = payload?.data?.message;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //get user details
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.data?.data?.user;
        state.organisation = payload?.data?.data?.organisation;
        state.subscription = payload?.data?.data?.subscription;
        state.isAdmin = payload?.data?.data?.isAdmin;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //verify email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.verifyEmailMessage = null;
        state.verifyEmailError = null;
        state.errorCode = null;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.verifyEmailLoading = false;
        state.verifyEmailMessage = payload?.data?.message;
        state.verifyEmailError = null;
        state.errorCode = null;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.verifyEmailLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });

    //send forgot password email
    builder
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.sendForgotPasswordEmailLoading = true;
        state.sendForgotPasswordEmailMessage = null;
        state.sendForgotPasswordEmailError = null;
        state.errorCode = null;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, { payload }) => {
        state.sendForgotPasswordEmailLoading = false;
        state.sendForgotPasswordEmailMessage = payload?.data?.message;
        state.sendForgotPasswordEmailError = null;
        state.errorCode = null;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, { payload }) => {
        state.sendForgotPasswordEmailLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.sendForgotPasswordEmailError = payload?.response?.data?.message;
        } else {
          state.sendForgotPasswordEmailError = payload?.message;
        }
      });

    //change passowrd
    builder
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
        state.changePasswordMessage = null;
        state.changePasswordError = null;
        state.errorCode = null;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.changePasswordMessage = payload?.data?.message;
        state.changePasswordError = null;
        state.errorCode = null;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.changePasswordMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.changePasswordError = payload?.response?.data?.message;
        } else {
          state.changePasswordError = payload?.message;
        }
      });

    //edit profile
    builder
      .addCase(editprofile.pending, (state) => {
        state.editProfileLoading = true;
        state.editProfileMessage = null;
        state.editProfileError = null;
        state.errorCode = null;
      })
      .addCase(editprofile.fulfilled, (state, { payload }) => {
        state.editProfileLoading = false;
        state.editProfileMessage = payload?.data?.message;
        state.editProfileError = null;
        state.errorCode = null;
      })
      .addCase(editprofile.rejected, (state, { payload }) => {
        state.editProfileLoading = false;
        state.editProfileMessage = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.editProfileError = payload?.response?.data?.message;
        } else {
          state.editProfileError = payload?.message;
        }
      });

    //update app tour
    builder
      .addCase(updateAppTour.pending, (state) => {
        state.appTourLoading = true;
        state.appTourMessage = null;
        state.appTourError = null;
      })
      .addCase(updateAppTour.fulfilled, (state, { payload }) => {
        state.appTourLoading = false;
        state.appTourMessage = payload?.data?.message;
        state.appTourError = null;
      })
      .addCase(updateAppTour.rejected, (state, { payload }) => {
        state.appTourLoading = false;
        if (payload?.response?.data?.message) {
          state.appTourError = payload?.response?.data?.message;
        } else {
          state.appTourError = payload?.message;
        }
      });
  },
});

export default authSlice.reducer;
export const {
  resetAuthState,
  setToken,
  setUserDetails,
  resetUserDetails,
  resetVerifyEmailData,
  resetAuthData,
  resetSendForgotPasswordEmailData,
  resetChangePasswordData,
  resetEditProfileData,
} = authSlice.actions;
