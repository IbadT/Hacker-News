'use client';

import React from 'react';
import Link from 'next/link';
import { NewsItem } from '@/app/store/slices/newsSlice';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const { id, title, score, by, time, url, descendants } = item;
  const date = new Date(time * 1000).toLocaleDateString();

  return (
    <div className="ascii-card p-4 mb-4 border border-gray-700 rounded">
      <div className="flex items-center justify-between">
        <Link href={url || `/news/${id}`} className="text-lg font-bold hover:text-blue-400">
          {title}
        </Link>
        <span className="text-sm text-gray-400">[{score}]</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span>by {by}</span>
        <span className="mx-2">|</span>
        <span>{date}</span>
        <span className="mx-2">|</span>
        <Link href={`/news/${id}`} className="hover:text-blue-400">
          {descendants} comments
        </Link>
      </div>
    </div>
  );
};

export default NewsCard; 