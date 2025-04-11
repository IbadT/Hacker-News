'use client';

import React from 'react';
import { ReduxProvider } from './ReduxProvider';

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
}; 