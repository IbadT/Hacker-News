import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear authentication status
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Logging out...</div>
    </div>
  );
};

export default LogoutPage; 