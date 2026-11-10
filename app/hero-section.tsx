'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', 
      color: '#ffffff', 
      borderRadius: '16px', 
      padding: '40px 30px', 
      marginBottom: '35px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      flexWrap: 'wrap',
      gap: '20px'
    }}>
      <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
        <span style={{ background: '#2563eb', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>🎓 ঐতিহ্য ও গৌরবমণ্ডিত শিক্ষার ৭৫ বছর</span>
        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '15px 0 10px 0', lineHeight: '1.3', color: '#fff' }}>জ্ঞানের আলোয় উদ্ভাসিত <br/><span style={{ color: '#38bdf8' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</span></h2>
        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', maxWidth: '550px', margin: '0 0 25px 0' }}>১৯৫১ সাল থেকে উত্তরবঙ্গের অন্যতম শীর্ষস্থানীয় নৈতিক ও আধুনিক শিক্ষার এক অপূর্ব সমন্বয়। সুশৃঙ্খল পরিবেশ, সুদক্ষ শিক্ষক মণ্ডলী এবং আধুনিক কম্পিউটার ল্যাব ও বিজ্ঞানাগারের মাধ্যমে আমরা গড়ে তুলছি আগামীর স্মার্ট নাগরিক।</p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/admission" style={{ textDecoration: 'none', background: '#059669', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 6px rgba(5, 150, 105, 0.3)' }}>📝 সরাসরি অনলাইনে ভর্তি হও</a>
          <a href="/notice" style={{ textDecoration: 'none', background: 'transparent', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', border: '2px solid #cbd5e1' }}>📋 আজকের নোটিশ বোর্ড</a>
        </div>
      </div>
      
      {/* 🏫 হিরো সেকশনের ডান পাশের স্কুলের ডাইনামিক স্ট্যাটাস কার্ডস */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', flex: '1', minWidth: '280px' }}>
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>৩৫০+</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>চলতি শিক্ষার্থী</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399' }}>১০০%</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>এসএসসি পাস রেট</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fbbf24' }}>১৩+</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>অভিজ্ঞ শিক্ষক</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>২টি</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>স্মার্ট ল্যাব ও লাইব্রেরি</div>
        </div>
      </div>
    </div>
  );
}
