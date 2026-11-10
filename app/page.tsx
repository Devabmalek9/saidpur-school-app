'use client';

import React from 'react';
import HeroSection from './hero-section';
import SchoolGallery from './school-gallery';
import AboutUs from './about-us';

export default function Home() {
  return (
    <div className="custom-body" style={{ padding: '0 20px 20px 20px', backgroundColor: '#f8fafc' }}>
      <main style={{ maxWidth: '1200px', margin: '30px auto' }}>
        {/* ১. প্রিমিয়াম হিরো সেকশন ব্যানার মডিউল */}
        <HeroSection />

        {/* 📸 ২. লাইভ স্কুল ফটো গ্যালারি */}
        <SchoolGallery />

        {/* ৩. বিদ্যালয়ের ইতিহাস ও প্রধান শিক্ষকের বাণী */}
        <AboutUs />
      </main>
    </div>
  );
}
