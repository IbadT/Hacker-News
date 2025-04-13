'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchNewsList } from '@/store/news/slice';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface RefreshButtonProps {
  onClick?: () => void;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    // Always fetch fresh news data when the refresh button is clicked
    dispatch(fetchNewsList());
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      icon={<ReloadOutlined />}
      type="primary"
      className="flex items-center"
    >
      Refresh News
    </Button>
  );
}; 