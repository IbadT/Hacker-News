'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchNews } from '@/app/store/slices/newsSlice';
import NewsCard from '@/widgets/NewsCard';
import { Pagination } from '@/widgets/Pagination';
import NewsSkeleton from '@/widgets/NewsSkeleton';

export const NewsListView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news = [], loading, error } = useSelector((state: RootState) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!news || news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <NewsSkeleton />;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {currentItems.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};