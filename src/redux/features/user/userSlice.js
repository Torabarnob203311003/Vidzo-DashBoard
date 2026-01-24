import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  step: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
