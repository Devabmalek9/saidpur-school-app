'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SchoolHeader() {
  const pathname = usePathname();
  const [latestNotice, setLatestNotice] = useState('🏫 সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়ের অফিশিয়াল স্মার্ট ওয়েব পোর্টালে আপনাকে স্বাগতম...');

  useEffect(() => {
    if (pathname === '/') {
      fetch('/api/notice')
        .then(res => res.json())
        .then((data: any) => {
          const list = data?.notices || data || [];
          if (Array.isArray(list) && list.length > 0 && list[0]?.title) {
            setLatestNotice(`📢 সর্বশেষ নোটিশ: ${list[0].title} — বিস্তারিত জানতে নোটিশ বোর্ডে ক্লিক করুন।`);
          } else if (list && typeof list === 'object' && list.title) {
            setLatestNotice(`📢 সর্বশেষ নোটিশ: ${list.title} — বিস্তারিত জানতে নোটিশ বোর্ডে ক্লিক করুন।`);
          }
        })
        .catch(() => {});
    }
  }, [pathname]);
  return (
    <header className="custom-header no-print" style={{ background: '#0f172a', padding: '15px 20px', borderBottom: '4px solid #3b82f6', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          
          {/* লোগো এরিয়া */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ backgroundColor: '#3b82f6', width: '52px', height: '52px', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}>SM</div>
            <div>
              <h1 style={{ color: '#ffffff', fontSize: '22px', margin: '0', fontWeight: 'bold', letterSpacing: '0.5px' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h1>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '3px 0 0 0', fontWeight: '600' }}>স্থাপিত: ১৯৫১ | ইআইআইএন: ১২৫২০৭ | সৈয়দপুর, নীলফামারী</p>
            </div>
          </div>
          
          {/* প্রিমিয়াম মিডনাইট গ্লাস থিম বাটন নেভিগেশন মেনুবার */}
          <nav style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { label: '🏠 হোম', path: '/' },
              { label: '📢 নোটিশ', path: '/notice' },
              { label: '📊 ফলাফল', path: '/result-archive' },
              // 🎯 [মেগা ইন্টিগ্রেশন]: আপনার কোনো কোড পরিবর্তন না করে এখানে খতিয়ান গেটওয়েটি যুক্ত করা হলো
              { label: '🎓 শিক্ষার্থী খতিয়ান', path: '/student' },
              { label: '🎟️ প্রবেশপত্র', path: '/admit-card' },
              { label: '👨‍🏫 স্টাফ', path: '/staff' },
              { label: '📝 ভর্তি ফরম', path: '/admission' },
              { label: '📞 যোগাযোগ', path: '/contact' },
              { label: '👨‍🏫 শিক্ষক লগইন', path: '/teacher' }
            ].map((btn, index) => (
              <a 
                key={index} 
                href={btn.path} 
                style={{ 
                  textDecoration: 'none', 
                  fontWeight: '700', 
                  color: '#e2e8f0', 
                  backgroundColor: 'rgba(51, 65, 85, 0.5)', 
                  padding: '9px 14px', 
                  borderRadius: '6px', 
                  fontSize: '12.5px', 
                  border: '1px solid rgba(71, 85, 105, 0.4)',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#38bdf8';
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
                  e.currentTarget.style.color = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              >
                {btn.label}
              </a>
            ))}
          </nav>
        </div>
        {/* কন্ডিশনাল নিউজ স্ক্রলার */}
        {pathname === '/' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', border: '1px solid rgba(51, 65, 85, 0.3)', width: '100%', boxSizing: 'border-box', minHeight: '32px' }}>
            {React.createElement('marquee', {
              behavior: 'scroll',
              direction: 'left',
              scrollamount: '5',
              onMouseOver: (e: any) => e.currentTarget.stop(),
              onMouseOut: (e: any) => e.currentTarget.start(),
              style: { color: '#38bdf8', fontWeight: '600', fontSize: '13px', margin: 0, padding: 0, cursor: 'pointer', width: '100%', display: 'block' }
            }, latestNotice)}
          </div>
        )}

      </div>
    </header>
  );
}
