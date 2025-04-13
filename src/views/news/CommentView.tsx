'use client'
import React from 'react';
import { CommentTree } from '@/widgets/CommentTree';

interface CommentViewProps {
  newsId: string;
}

export const CommentView: React.FC<CommentViewProps> = ({ newsId }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <CommentTree newsId={newsId} />
    </div>
  );
}; 