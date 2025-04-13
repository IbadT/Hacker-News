import React from 'react';
import Profile from '../Profile';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 ascii-header">[ Profile ]</h1>
      <Profile />
    </div>
  );
};

export default ProfilePage; 