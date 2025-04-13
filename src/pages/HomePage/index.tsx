'use client'
import React from 'react';
import { NewsListView } from '@/views/news/NewsListView';
import { RefreshButton } from '@/widgets/RefreshButton';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="hn-title text-2xl">Hacker News</h1>
        <RefreshButton />
      </div>
      <NewsListView />
    </div>
  );
}; 