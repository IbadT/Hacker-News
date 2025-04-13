'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchNews } from '@/app/store/slices/newsSlice';
import { NewsListView } from '@/views/news/NewsListView';

const NewsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error } = useSelector((state: RootState) => state.news);

  // Check if user is authenticated
  useEffect(() => {
    // TODO: Replace with actual auth check
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);
  
  // Load news if not already loaded
  useEffect(() => {
    if (!news || news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>
      <NewsListView />
    </div>
  );
};

export default NewsPage; 