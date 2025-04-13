'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommentView } from '@/views/news/CommentView';
import { RefreshButton } from '@/widgets/RefreshButton';
import { fetchNewsItem } from '@/shared/api/client';

interface NewsPageContentProps {
  id: string;
}

export const NewsPageContent: React.FC<NewsPageContentProps> = ({ id }) => {
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsItem(parseInt(id));
        setNewsItem(data);
      } catch (err) {
        setError('Failed to load news item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer ascii-nav-link"
          >
            ← Back to News
          </button>
          <RefreshButton />
        </div>
        <div className="ascii-loading">Loading...</div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer ascii-nav-link"
          >
            ← Back to News
          </button>
          <RefreshButton />
        </div>
        <div className="ascii-error">{error || 'News item not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-blue-500 hover:text-blue-700 hover:cursor-pointer ascii-nav-link"
        >
          ← Back to News
        </button>
        <RefreshButton />
      </div>
      
      <div className="ascii-card p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 ascii-title">{newsItem.title}</h1>
        {newsItem.url && (
          <a 
            href={newsItem.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-700 mb-4 block ascii-link"
          >
            {newsItem.url}
          </a>
        )}
        {newsItem.text && (
          <div className="mb-4 ascii-text" dangerouslySetInnerHTML={{ __html: newsItem.text }} />
        )}
        <div className="flex items-center text-sm text-gray-600 ascii-meta">
          <span>{newsItem.score} points</span>
          <span className="mx-2">•</span>
          <span>by {newsItem.by}</span>
          <span className="mx-2">•</span>
          <span>{new Date(newsItem.time * 1000).toLocaleDateString()}</span>
        </div>
      </div>

      <CommentView newsId={id} />
    </div>
  );
}; 