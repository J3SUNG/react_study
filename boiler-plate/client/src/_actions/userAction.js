import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
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

export const registerUser = createAsyncThunk(
  "user/register",
  async (dataToSubmit, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/register", dataToSubmit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "register failed");
    }
  }
);
