'use client';

import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/widgets/Header';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Hacker News',
//   description: 'Hacker News Clone',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="hn-container py-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
