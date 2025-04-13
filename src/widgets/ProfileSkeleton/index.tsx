'use client';

import React from 'react';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="ascii-card p-4 m-4">
      <div className="space-y-4">
        {/* Username */}
        <div className="flex items-center space-x-4">
          <div className="h-8 bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
        </div>

        {/* Karma and Created */}
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-4 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>

        {/* About section */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton; 