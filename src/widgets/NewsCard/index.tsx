'use client';

import React from 'react';
import Link from 'next/link';

interface NewsCardProps {
  id: number;
  title: string;
  score: number;
  by: string;
  time: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ id, title, score, by, time }) => {
  return (
    <Link href={`/news/${id}`}>
      <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <span>{score} points</span>
          <span className="mx-2">•</span>
          <span>by {by}</span>
          <span className="mx-2">•</span>
          <span>{new Date(time * 1000).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}; 