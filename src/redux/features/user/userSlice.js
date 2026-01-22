import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  decodeUser: null,
  token: "",
  step: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storUserData: (state, action) => {
      state.user = action.payload;
    },
    storDecodeUser: (state, action) => {
      state.decodeUser = action.payload;
    },
    storToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = "";
      state.decodeUser = null;
      localStorage.removeItem("token");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const {
  storUserData,
  setLoading,
  storToken,
  logOut,
  storDecodeUser,
  setStep,
} = userSlice.actions;

export default userSlice.reducer;
