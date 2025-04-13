import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  karma: number;
  created: number;
  about?: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    // В реальном приложении здесь был бы API запрос
    // Сейчас возвращаем моковые данные
    return {
      id: 'user123',
      karma: 42,
      created: Date.now() / 1000,
      about: 'This is a sample about text for the user profile.',
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      });
  },
});

export default userSlice.reducer; 