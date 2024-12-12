import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../_actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginSuccess: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const loginHandlers = createAsyncHandlers(loginUser);
    const registerHandlers = createAsyncHandlers(registerUser);

    builder
      .addCase(loginUser.pending, loginHandlers.pending)
      .addCase(loginUser.fulfilled, loginHandlers.fulfilled)
      .addCase(loginUser.rejected, loginHandlers.rejected);

    builder
      .addCase(registerUser.pending, registerHandlers.pending)
      .addCase(registerUser.fulfilled, registerHandlers.fulfilled)
      .addCase(registerUser.rejected, registerHandlers.rejected);
  },
});

function createAsyncHandlers(asyncThunk) {
  return {
    pending: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fulfilled: (state, action) => {
      state.status = "succeeded";
      state.loginSuccess = action.payload;
    },
    rejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  };
}

export default userSlice.reducer;
