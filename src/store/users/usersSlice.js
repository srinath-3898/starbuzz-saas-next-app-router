import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchUserByName } from "./usersActions";

const initialState = {
  loading: false,
  users: null,
  error: null,
  searchedusersLoading: false,
  searchedUsers: null,
  errorCode: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersData: (state) => {
      state.loading = false;
      state.users = null;
      state.error = null;
      state.errorCode = null;
    },
    resetSearchedUsersData: (state) => {
      state.searchedusersLoading = false;
      state.searchedUsers = null;
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.users = null;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      })
      .addCase(fetchUserByName.pending, (state) => {
        state.searchedusersLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserByName.fulfilled, (state, { payload }) => {
        state.searchedusersLoading = false;
        state.searchedUsers = payload?.data?.data;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchUserByName.rejected, (state, { payload }) => {
        state.searchedusersLoading = false;
        state.errorCode = payload?.response?.status;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default usersSlice.reducer;
export const { resetUsersData, resetSearchedUsersData } = usersSlice.actions;
