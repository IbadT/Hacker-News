import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewsItem } from '@/shared/types/news';
import { fetchNews, fetchNewsItem } from '@/shared/api/client';

interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

export const fetchNewsList = createAsyncThunk(
  'news/fetchNewsList',
  async (_, { dispatch }) => {
    const newsIds = await fetchNews();
    const newsItems = await Promise.all(
      newsIds.slice(0, 100).map(async (id) => {
        try {
          return await fetchNewsItem(id);
        } catch (error) {
          return null;
        }
      })
    );
    return newsItems.filter((item): item is NewsItem => item !== null);
  }
);

export const fetchNewsItemById = createAsyncThunk(
  'news/fetchNewsItem',
  async (id: number) => {
    return await fetchNewsItem(id);
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsList.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer; 