'use client';
import React, { useState } from 'react';

export default function SchoolGallery() {
  // বিদ্যালয়ের বিভিন্ন প্রাতিষ্ঠানিক কার্যক্রমের প্রফেশনাল আনস্প্ল্যাশ ইমেজ সোর্স ম্যাপ
  const galleryItems = [
    { id: 1, title: 'প্রধান একাডেমিক ভবন ও ক্যাম্পাস', category: 'Campus', url: 'https://i.ibb.co.com/KzGv0YBy/Whats-App-Image-2026-09-09-at-3-19-03-PM.jpg' }, 
    { id: 2, title: 'আধুনিক কম্পিউটার ও আইসিটি ল্যাব', category: 'Lab', url: 'https://i.ibb.co.com/YF00Msnm/Modern-School-Computer-and-Science-Lab.png' },
    { id: 3, title: 'শিক্ষার্থীদের বার্ষিক বিজ্ঞান মেলা', category: 'Event', url: 'https://i.ibb.co.com/7tSv4JkR/rrrr.jpg' }, 
    { id: 4, title: 'মাল্টিমিডিয়া ডিজিটাল ক্লাসরুম', category: 'Class', url: 'https://i.ibb.co.com/XxfrvTBX/image.png' }, 
    { id: 5, title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও উৎসব', category: 'Sports', url: 'https://i.ibb.co.com/W4B0LMnh/480271834-2087621141691650-2451924073119144449-n.jpg' },
    { id: 6, title: 'বিদ্যালয়ের সুবৃহৎ কেন্দ্রীয় লাইব্রেরি', category: 'Library', url: 'https://i.ibb.co.com/9mK9mPkJ/Bright-Central-Library-Study-Hall.png' },
  ];

  const [activeImg, setActiveImg] = useState<any | null>(null);

  return (
    <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '40px' }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>📸 ফটো গ্যালারি (Photo Gallery)</h3>
      <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 25px 0' }}>বিদ্যালয়ের চমৎকার ক্যাম্পাস, আধুনিক ল্যাবরেটরি এবং বিভিন্ন উৎসব ও সহ-শিক্ষা কার্যক্রমের আলোকচিত্রসমূহ।</p>

      {/* 🖼️ ৩-কলাম বিশিষ্ট রেসপন্সিভ ইমেজ গ্রিড লেআউট */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {galleryItems.map((item) => (
          <div key={item.id} onClick={() => setActiveImg(item)} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: '#f8fafc', transition: 'all 0.2s ease-in-out', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
              <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(30, 58, 138, 0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>{item.category}</span>
            </div>
            <div style={{ padding: '12px', fontSize: '13px', fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center' }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 লাইভ ওয়ান-ক্লিক ফুল স্ক্রিন ইমেজ পপ-আপ মডাল উইন্ডো */}
      {activeImg && (
        <div onClick={() => setActiveImg(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box', cursor: 'zoom-out' }}>
          <div style={{ position: 'relative', maxWidth: '800px', width: '100%', textAlign: 'center' }}>
            <img src={activeImg.url} alt={activeImg.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
            <h4 style={{ color: '#fff', marginTop: '15px', fontSize: '18px', fontWeight: 'bold' }}>{activeImg.title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: '5px 0 0 0' }}>ফটো মোড বন্ধ করতে যেকোনো স্থানে ক্লিক করুন</p>
          </div>
        </div>
      )}
    </div>
  );
}
