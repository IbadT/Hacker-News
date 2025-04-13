'use client';

import ProfileSkeleton from '@/widgets/ProfileSkeleton';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  email: string;
  karma: number;
  created: string;
  about: string;
}

export const Profile: React.FC = () => {
  // const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const accessToken = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      
      if (!isAuthenticated || !accessToken) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:8000/api/?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const {data} = await response.json();
      setProfile(prev => ({ ...prev, email: data.email, created: data.CreatedAt, karma: 41, about: "Some About" }));
      setLoading(false);
      
      
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="ascii-card p-4 m-4">
        <div className="ascii-text text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="ascii-card p-4 m-4">
      <h1 className="ascii-title text-2xl mb-4">Profile</h1>
      <div className="ascii-tree">
        <div className="tree-node">
          <div className="tree-branch">
            <span className="tree-line">├─</span>
            <span className="tree-label">email:</span>
            <span className="tree-value">{profile.email}</span>
          </div>
        </div>
        
        <div className="tree-node">
          <div className="tree-branch">
            <span className="tree-line">├─</span>
            <span className="tree-label">karma:</span>
            <span className="tree-value">{profile.karma}</span>
          </div>
        </div>
        
        <div className="tree-node">
          <div className="tree-branch">
            <span className="tree-line">├─</span>
            <span className="tree-label">created:</span>
            <span className="tree-value">{new Date(profile.created).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="tree-node">
          <div className="tree-branch">
            <span className="tree-line">├─</span>
            <span className="tree-label">about:</span>
          </div>
          <div className="tree-content">
            <div className="tree-value whitespace-pre-wrap">{profile.about}</div>
          </div>
        </div>
        
        <div className="tree-node">
          <div className="tree-branch">
            <span className="tree-line">└─</span>
            <span className="tree-label">settings</span>
          </div>
          <div className="tree-content">
            <div className="tree-node">
              <div className="tree-branch">
                <span className="tree-line">├─</span>
                <span className="tree-label">theme:</span>
                <span className="tree-value">dark</span>
              </div>
            </div>
            <div className="tree-node">
              <div className="tree-branch">
                <span className="tree-line">└─</span>
                <span className="tree-label">notifications:</span>
                <span className="tree-value">enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};







// 'use client';

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/app/store';
// import { fetchUserProfile } from '@/app/store/slices/userSlice';
// import ProfileSkeleton from '@/widgets/ProfileSkeleton';

// export const Profile: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { profile, loading, error } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     if (!profile) {
//       dispatch(fetchUserProfile());
//     }
//   }, [dispatch, profile]);

//   if (loading) {
//     return <ProfileSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="ascii-card p-4 m-4">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="ascii-card p-4 m-4">
//         <div className="ascii-text">Profile not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="ascii-card p-4 m-4">
//       <div className="space-y-4">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-xl font-bold">{profile.id}</h1>
//           <span className="text-gray-400">({profile.karma} karma)</span>
//         </div>
//         <div className="text-gray-400">
//           Created {new Date(profile.created * 1000).toLocaleDateString()}
//         </div>
//         {profile.about && (
//           <div className="space-y-2">
//             <h2 className="text-lg font-bold">About</h2>
//             <div className="whitespace-pre-wrap">{profile.about}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };