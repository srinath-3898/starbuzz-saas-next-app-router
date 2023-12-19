const { createSlice } = require("@reduxjs/toolkit");

const getInitialBrandId = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const localStorageBrandId = localStorage.getItem("brandId");
    return localStorageBrandId ? parseInt(localStorageBrandId) : null;
  }
};

const getInitialRoleId = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const localStorageRoleId = localStorage.getItem("roleId");
    return localStorageRoleId ? parseInt(localStorageRoleId) : null;
  }
};

const initialState = {
  brandId: getInitialBrandId(),
  roleId: getInitialRoleId(),
  features: null,
};

const globalVariablesSlice = createSlice({
  name: "globalVariables",
  initialState,
  reducers: {
    setBrandId: (state, { payload }) => {
      if (payload === undefined || payload === null) {
        state.brandId = null;
      } else {
        state.brandId = payload;
        localStorage.setItem("brandId", payload);
      }
    },
    setRoleId: (state, { payload }) => {
      state.roleId = payload;
      localStorage.setItem("roleId", payload);
    },
    setFeatures: (state, { payload }) => {
      state.features = payload;
    },
  },
});

export default globalVariablesSlice.reducer;
export const { setBrandId, setRoleId, setFeatures } =
  globalVariablesSlice.actions;
