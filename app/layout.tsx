import React from 'react';
import './globals.css';
import SchoolHeader from './school-header';
import SchoolFooter from './school-footer';

export const metadata = {
  title: 'সৈয়দপুর মুসলিম উচ্চ বিদ্যালয় - অফিশিয়াল ওয়েব পোর্টাল',
  description: 'স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম ৩.০',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body 
        suppressHydrationWarning={true} 
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0, backgroundColor: '#f8fafc' }}
      >
        
        {/* ১. গ্লোবাল হেডার */}
        <SchoolHeader />

        {/* 📊 ২. ডাইনামিক পেজের মেইন কন্টেন্ট এরিয়া */}
        <main style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
          {children}
        </main>

        {/* ৩. গ্লোবাল ফুটার */}
        <SchoolFooter />

      </body>
    </html>
  );
}
