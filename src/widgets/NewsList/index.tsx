'use client'
import React, { useEffect } from 'react';
import { NewsCard } from '../NewsCard';
import { fetchNewsList } from '@/store/news/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NewsItem } from '@/shared/types/news';

export const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsList());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {news.map((item: NewsItem) => (
        <NewsCard
          key={item.id}
          id={item.id}
          title={item.title}
          score={item.score}
          by={item.by}
          time={item.time}
        />
      ))}
    </div>
  );
}; 