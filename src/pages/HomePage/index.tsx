'use client'
import React from 'react';
import { NewsList } from '@/widgets/NewsList';
import { RefreshButton } from '@/widgets/RefreshButton';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hacker News</h1>
        <RefreshButton />
      </div>
      <NewsList />
    </div>
  );
}; 