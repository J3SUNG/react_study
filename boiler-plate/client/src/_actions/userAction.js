import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userAction = createAsyncThunk(
  "user/login",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", dataToSubmit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);
