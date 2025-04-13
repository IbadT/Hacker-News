'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNewsList } from '@/store/news/slice';
import { Header } from '@/widgets/Header';
import Link from 'next/link';

export const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { news, loading } = useAppSelector((state) => state.news);
  
  // Check if user is authenticated
  useEffect(() => {
    // TODO: Replace with actual auth check
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);
  
  // Load news in the background
  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNewsList());
    }
  }, [dispatch, news.length]);

  return (
    <div>
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="ascii-card p-6">
          <h1 className="text-2xl font-bold mb-4 ascii-title">[ Welcome to Hacker News ]</h1>
          <p className="mb-4 ascii-text">
            This is your dashboard. You can navigate to different sections using the menu above.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="ascii-card p-4">
              <h2 className="text-xl font-bold mb-2 ascii-title">[ News ]</h2>
              <p className="ascii-text">Browse the latest news from Hacker News.</p>
              <Link href="/news" className="text-blue-500 hover:text-blue-400 ascii-link mt-2 inline-block">
                [ View News ]
              </Link>
            </div>
            <div className="ascii-card p-4">
              <h2 className="text-xl font-bold mb-2 ascii-title">[ Profile ]</h2>
              <p className="ascii-text">Manage your profile and settings.</p>
              <Link href="/profile" className="text-blue-500 hover:text-blue-400 ascii-link mt-2 inline-block">
                [ View Profile ]
              </Link>
            </div>
            {/* <div className="ascii-card p-4">
              <h2 className="text-xl font-bold mb-2 ascii-title">[ Stats ]</h2>
              <p className="ascii-text">View your activity and statistics.</p>
              <p className="text-gray-400 mt-2">[ Coming Soon ]</p>
            </div> */}
            <div className="ascii-card p-4 relative overflow-hidden">
            <h2 className="text-xl font-bold mb-2 ascii-title">[ Stats ]</h2>
            <p className="ascii-text">View your activity and statistics.</p>
            <div className="mt-4 flex items-center">
              <span className="text-gray-400 mr-2">[ Coming Soon ]</span>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mx-1" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>

         </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 







// 'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { fetchNewsList } from '@/store/news/slice';
// import { Header } from '@/widgets/Header';
// import Link from 'next/link';

// export const Dashboard: React.FC = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { news, loading } = useAppSelector((state) => state.news);
  
//   // Check if user is authenticated
//   useEffect(() => {
//     // TODO: Replace with actual auth check
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//       router.push('/login');
//     }
//   }, [router]);
  
//   // Load news in the background
//   useEffect(() => {
//     if (news.length === 0) {
//       dispatch(fetchNewsList());
//     }
//   }, [dispatch, news.length]);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('email');
//     router.push('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8 ascii-title">[ Dashboard ]</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* News Card */}
//           <div 
//             className="ascii-card p-4 cursor-pointer hover:border-blue-500 transition-colors"
//             onClick={() => router.push('/news')}
//           >
//             <h2 className="text-xl font-bold mb-2 ascii-title">[ News ]</h2>
//             <p className="ascii-text">Browse the latest Hacker News stories.</p>
//           </div>

//           {/* Profile Card */}
//           <div 
//             className="ascii-card p-4 cursor-pointer hover:border-blue-500 transition-colors"
//             onClick={() => router.push('/profile')}
//           >
//             <h2 className="text-xl font-bold mb-2 ascii-title">[ Profile ]</h2>
//             <p className="ascii-text">View and edit your profile information.</p>
//           </div>

//           {/* Stats Card with Pulse Animation */}
//           <div className="ascii-card p-4 relative overflow-hidden">
//             <h2 className="text-xl font-bold mb-2 ascii-title">[ Stats ]</h2>
//             <p className="ascii-text">View your activity and statistics.</p>
//             <div className="mt-4 flex items-center">
//               <span className="text-gray-400 mr-2">[ Coming Soon ]</span>
//               <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
//               <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mx-1" style={{ animationDelay: '0.2s' }}></div>
//               <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <button
//             onClick={handleLogout}
//             className="ascii-button px-4 py-2"
//           >
//             [ Logout ]
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }; 