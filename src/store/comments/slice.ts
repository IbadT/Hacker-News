import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '@/shared/types/news';
import { fetchComment, fetchNewsItem } from '@/shared/api/client';

interface CommentsState {
  comments: Record<number, Comment>;
  loading: boolean;
  error: string | null;
  commentIds: number[];
}

const initialState: CommentsState = {
  comments: {},
  loading: false,
  error: null,
  commentIds: [],
};

export const fetchNewsComments = createAsyncThunk(
  'comments/fetchNewsComments',
  async (newsId: number) => {
    console.log('Fetching news item with id:', newsId);
    const newsItem = await fetchNewsItem(newsId);
    console.log('Received news item:', newsItem);
    return newsItem.kids || [];
  }
);

export const fetchCommentById = createAsyncThunk(
  'comments/fetchComment',
  async (id: number) => {
    console.log('Fetching comment with id:', id);
    const response = await fetchComment(id);
    console.log('Received comment:', response);
    return response;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentIds = action.payload;
      })
      .addCase(fetchNewsComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news comments';
      })
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.log('Adding comment to state:', action.payload);
          state.comments[action.payload.id] = action.payload;
        }
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comment';
      });
  },
});

export default commentsSlice.reducer; 