'use client';

import React from 'react';

interface RefreshButtonProps {
  onClick?: () => void;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors hover:cursor-pointer"
    >
      Refresh
    </button>
  );
}; 