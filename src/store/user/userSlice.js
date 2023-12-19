import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, updateUser } from "./userActions";

const initialState = {
  cudUserloading: false,
  hasEnoughCredits: null,
  cudUserMessage: null,
  cudUsererror: null,
  cudUserErrorCode: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateUserData: (state) => {
      state.cudUserloading = false;
      state.hasEnoughCredits = null;
      state.cudUserMessage = null;
      state.cudUsererror = null;
      state.cudUserErrorCode = null;
    },
    resetCUDUserData: (state) => {
      state.cudUserloading = false;
      state.cudUserMessage = null;
      state.cudUsererror = null;
      state.hasEnoughCredits = null;
      state.cudUserErrorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.cudUserloading = true;
        state.cudUserMessage = null;
        state.cudUsererror = null;
        state.cudUserErrorCode = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.cudUserloading = false;
        state.hasEnoughCredits = payload?.data?.hadEnoughCredits;
        state.cudUserMessage = payload?.data?.message;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.cudUserloading = false;
        state.cudUserMessage = null;
        state.cudUserErrorCode = payload?.response?.status;
        if (payload?.response?.data?.errors?.length > 0) {
          state.cudUsererror = payload?.response?.data?.errors[0]?.msg;
        } else if (payload?.response?.data?.message) {
          state.cudUsererror = payload?.response?.data?.message;
        } else {
          state.cudUsererror = payload?.message;
        }
      });
    // update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.cudUserloading = true;
        state.cudUserMessage = null;
        state.cudUsererror = null;
        state.cudUserErrorCode = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.cudUserloading = false;
        state.cudUserMessage = payload?.data?.message;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.cudUserloading = false;
        state.cudUserErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.cudUsererror = payload?.response?.data?.message;
        } else {
          state.cudUsererror = payload?.message;
        }
      });

    //delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.cudUserloading = true;
        state.cudUserMessage = null;
        state.cudUsererror = null;
        state.cudUserErrorCode = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.cudUserloading = false;
        state.cudUserMessage = payload?.data?.message;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.cudUserloading = false;
        state.cudUserMessage = null;
        state.cudUserErrorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.cudUsererror = payload?.response?.data?.message;
        } else {
          state.cudUsererror = payload?.message;
        }
      });
  },
});

export default userSlice.reducer;
export const { resetCUDUserData } = userSlice.actions;
