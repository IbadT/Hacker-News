'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const accessToken = localStorage.getItem('access_token');
    setIsAuthenticated(!!authStatus && !!accessToken);
  }, []);
  
  // Don't show header on login and register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('access_token');
    // localStorage.removeItem('username');
    window.location.href = '/login';
  };
  
  const renderLink = (path: string, text: string) => {
    const isActive = pathname === path;
    return (
      <Link 
        href={path} 
        className={`ascii-nav-link ${isActive ? '!text-white font-bold' : ''}`}
        style={isActive ? { color: 'white !important' } : undefined}
      >
        {isActive ? text : `[ ${text} ]`}
      </Link>
    );
  };

  return (
    <header className="ascii-header">
      <div className="hn-container">
        <nav className="ascii-nav">
          <Link href="/dashboard" className="ascii-logo h-full">
            <img src="/logo.png" alt="Hacker News" className="w-10 h-10" />
          </Link>

          <div className="flex gap-4">
                {renderLink('/dashboard', 'Dashboard')}
                {renderLink('/news', 'News')}
                {renderLink('/profile', 'Profile')}
              </div>
              <div className="flex-grow"></div>
              <button onClick={handleLogout} className="ascii-nav-link">
                {'[ Logout ]'}
              </button>


          {/* {isAuthenticated ? (
            <>
              <div className="flex gap-4">
                {renderLink('/dashboard', 'Dashboard')}
                {renderLink('/news', 'News')}
                {renderLink('/profile', 'Profile')}
              </div>
              <div className="flex-grow"></div>
              <button onClick={handleLogout} className="ascii-nav-link">
                {'[ Logout ]'}
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-4">
                {renderLink('/', 'new')}
                {renderLink('/', 'past')}
                {renderLink('/', 'comments')}
                {renderLink('/', 'ask')}
              </div>
              <div className="flex-grow"></div>
              {renderLink('/login', 'login')}
            </>
          )} */}
        </nav>
      </div>
    </header>
  );
}; 









// 'use client'
// import React from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

// export const Header: React.FC = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <header className="hn-header">
//       <div className="hn-container">
//         <nav className="hn-nav">
//           <Link href="/" className="hn-nav-link">
//             <img src="/logo.png" alt="Hacker News" className="w-8 h-8" />
//           </Link>
//           <Link href="/" className="hn-nav-link">new</Link>
//           <Link href="/" className="hn-nav-link">past</Link>
//           <Link href="/" className="hn-nav-link">comments</Link>
//           <Link href="/" className="hn-nav-link">ask</Link>
//           <div className="flex-grow"></div>
//           {isAuthenticated ? (
//             <button onClick={logout} className="hn-nav-link">logout</button>
//           ) : (
//             <Link href="/login" className="hn-nav-link">login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }; 