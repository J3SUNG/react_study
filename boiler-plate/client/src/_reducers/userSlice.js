import { createSlice } from "@reduxjs/toolkit";
import { userAction } from "../_actions/userAction";

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
      .addCase(userAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginSuccess = action.payload;
      })
      .addCase(userAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
