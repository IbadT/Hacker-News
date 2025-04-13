'use client'
import React, { useEffect } from 'react';
import { NewsCard } from '@/widgets/NewsCard';
import { fetchNewsList } from '@/store/news/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NewsItem } from '@/shared/types/news';
import { Skeleton, Card } from 'antd';

export const NewsListView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    // Only fetch news if there are no news items in the store
    if (news.length === 0) {
      dispatch(fetchNewsList());
    }
  }, [dispatch, news.length]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="w-full">
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>
    );
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