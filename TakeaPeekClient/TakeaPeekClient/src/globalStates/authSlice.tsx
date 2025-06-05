import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../types/user";
import { RootState } from "./store";
import axiosInstance from "../hooks/axsiosInstance";

interface AuthState {
  token: string | null;
  user: User ;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: {Name: "John", Email: "", Password: "",CreatedAt: "", UpdatedAt: "",id: 5},
  loading: false,
  error: null,
};

// Async Thunk for Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { Email: string; Password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post<{ token: string; user: User }>("http://localhost:5293/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async Thunk for Register
export const register = createAsyncThunk(
  'auth/register',
  async (newUser: {Name:string,  Email: string; Password: string; }, thunkAPI) => {
    try {

      const response = await axiosInstance.post('http://localhost:5293/auth/register', {...newUser, roleName: 'Editor'});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user ={Name: "John", Email: "", Password: "",CreatedAt: "", UpdatedAt: "",id: 5};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      
        if (action.payload) {
          // אם השגיאה כוללת מידע
          const errorPayload = action.payload as any;  // אם השגיאה מכילה מידע, כמו תשובת ה־HTTP
          const status = errorPayload.response?.status;
          
          if (status === 401) {
            state.error = "משתמש לא קיים! בדוק את האימייל והסיסמה."; // טיפול בשגיאת 401
          } else {
            state.error = "שגיאה בהתחברות, אנא נסה שוב."; // טיפול בשגיאות אחרות
          }
        } else {
          state.error = "שגיאה כללית, נסה שוב מאוחר יותר."; // במקרה של שגיאה כלשהי ללא סטטוס ספציפי
        }
      })
      
      
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ token: string ,user:User}>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

