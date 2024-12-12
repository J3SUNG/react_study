import { createSlice } from "@reduxjs/toolkit";
import { authUser, loginUser, registerUser } from "../_actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginSuccess: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginSuccess = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginSuccess = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginSuccess = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
