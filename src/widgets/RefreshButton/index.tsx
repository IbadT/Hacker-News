'use client';

import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNewsList } from '@/store/news/slice';
import { fetchNewsComments } from '@/store/comments/slice';

interface RefreshButtonProps {
  newsId?: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ newsId }) => {
  const dispatch = useAppDispatch();
  const { loading: newsLoading } = useAppSelector((state) => state.news);
  const { loading: commentsLoading } = useAppSelector((state) => state.comments);

  const handleRefresh = () => {
    if (newsId) {
      // If newsId is provided, refresh comments for that news item
      dispatch(fetchNewsComments(parseInt(newsId)));
    } else {
      // Otherwise refresh the news list
      dispatch(fetchNewsList());
    }
  };

  const isLoading = newsId ? commentsLoading : newsLoading;

  return (
    <button
      onClick={handleRefresh}
      className="hn-button flex items-center gap-2 hover:cursor-pointer"
    >
      <ReloadOutlined className={isLoading ? 'animate-spin' : ''} />
      Refresh News
    </button>
  );
}; 