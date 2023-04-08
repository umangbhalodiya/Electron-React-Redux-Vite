import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { setSession } from "../../helpers/authHelper";

const initialState = {
  user: {},
  isLoggedIn: false,
};
export const signUp = createAsyncThunk(
  "/authentication/signup",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/sign-up`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const logIn = createAsyncThunk("/authentication/login", async (body) => {
  try {
    const response = await axiosInstance.post(`userService/user/sign-in`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const verifyEmail = createAsyncThunk(
  "/authentication/verifyEmail",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/send-email`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "/authentication/verifyOtp",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/verify-otp`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "/authentication/forgotPassword",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/forgot-password`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const setSessionData = (token, userInfo) => {
  const sessionData = {
    access_token: token,
    userInfo: userInfo,
  };
  setSession(sessionData);
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const token = action?.payload?.data?.token;
        let userInfo = action?.payload?.data?.user;
        if (token) {
          state.isLoggedIn = true;
          state.user = userInfo;
          state.status = "succeeded";
          setSessionData(token, userInfo);
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
