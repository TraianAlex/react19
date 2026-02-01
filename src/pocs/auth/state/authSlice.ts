import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { loginUser, getUserProfile, fetchUsers } from '../services/authService';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialAuthToken = localStorage.getItem('authToken');

const initialState: AuthState = {
  isAuthenticated: !!initialAuthToken,
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Thunk to handle login
export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

// Thunk to handle fetching users
export const fetchUsersThunk = createAsyncThunk(
  'auth/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsers();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch users');
    }
  }
);

// Thunk to handle fetching user profile
export const getUserProfileThunk = createAsyncThunk(
  'auth/getUserProfile',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(id);
      return response;
    } catch (err: any) {
      console.error('getUserProfile error:', err);
      return rejectWithValue(
        err.response?.data || 'Failed to fetch user profile'
      );
    }
  }
);

// Thunk to handle logout
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('authToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<User & { token: string }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          localStorage.setItem('authToken', action.payload.token);
        }
      )
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserProfileThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
