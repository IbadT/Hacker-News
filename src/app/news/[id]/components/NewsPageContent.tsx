'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CommentView } from '@/views/news/CommentView';
import { RefreshButton } from '@/widgets/RefreshButton';

interface NewsPageContentProps {
  id: string;
}

export const NewsPageContent: React.FC<NewsPageContentProps> = ({ id }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
        >
          ← Back to News
        </button>
        <RefreshButton />
      </div>
      <CommentView newsId={id} />
    </div>
  );
}; 