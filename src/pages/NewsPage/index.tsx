'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CommentTree } from '@/widgets/CommentTree';
import { RefreshButton } from '@/widgets/RefreshButton';

interface NewsPageProps {
  id: string;
}

export const NewsPage: React.FC<NewsPageProps> = ({ id }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to News
        </button>
        <RefreshButton />
      </div>
      <CommentTree newsId={id} />
    </div>
  );
}; 