import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import User from "../types/user";

const url = "http://localhost:5293/auth"; // Adjust the URL to your API endpoint

// get users
export const getUsers = createAsyncThunk('users/get', async(_, thunkApi) => {
  try {
    const response = await axios.get(url);
    return response.data as User[];
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// Add user
export const addUser = createAsyncThunk('users/add', async (user: Partial<User>, thunkApi) => {
  try {
    
    const response = await axios.post(url, user);
    return response.data as User;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// Delete user
export const deleteUser = createAsyncThunk('users/delete', async (userId: string, thunkApi) => {
  try {
    await axios.delete(`${url}/${userId}`);
    return userId;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [] as User[],
    loading: true,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load users";
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.error = null;
        state.list.push(action.payload); // Add the new user to the list
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = null;
        state.list = state.list.filter(user => user.id !== Number(action.payload)); // Remove the user from the list
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      });
  },
});
export const loginStatus: 'before' | 'after' = 'before';
export const selectUsers = (state: RootState) => state.user;
export const { actions } = userSlice;
export default userSlice.reducer;
