import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './news/slice';
import commentsReducer from './comments/slice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
