import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchNews } from '@/app/store/slices/newsSlice';
import { NewsListView } from '@/views/news/NewsListView';
import { Header } from '@/widgets/Header';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Fetch news if not already loaded
    if (news.length === 0) {
      dispatch(fetchNews() as any);
    }
  }, [dispatch, news.length, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        <NewsListView />
      </main>
    </div>
  );
};

export default DashboardPage; 