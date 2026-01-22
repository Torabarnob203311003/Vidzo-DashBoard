import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  collapsed: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storUserData: (state, action) => {
      state.user = action.payload;
    },
    storToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    isCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { storToken, storUserData, setLoading, isCollapsed, logOut } =
  authSlice.actions;

export default authSlice.reducer;
