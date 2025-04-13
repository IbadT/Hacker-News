'use client';

import React from 'react';

const NewsSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="ascii-card p-4 mb-4 border border-gray-700 rounded animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-12"></div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="h-4 bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton; 