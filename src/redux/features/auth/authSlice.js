import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  collapsed: false,
  loading: false,
  otpEmail:null,
  resetToken:null
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
    setResendOtpEmail:(state,action)=>{
      state.otpEmail = action.payload
    },
    setResetToken:(state,action)=>{
      state.resetToken = action.payload
    },
    logOut: (state) => {
      console.log("log")
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { storToken, storUserData, setLoading, isCollapsed,setResetToken, setResendOtpEmail,logOut } =
  authSlice.actions;

export default authSlice.reducer;
