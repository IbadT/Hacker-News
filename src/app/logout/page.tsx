'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear authentication
    localStorage.removeItem('isAuthenticated');
    
    // Redirect to login
    router.push('/login');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="ascii-card p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 ascii-title">[ Logging Out ]</h2>
        <p className="ascii-text">Please wait while we log you out...</p>
      </div>
    </div>
  );
} 