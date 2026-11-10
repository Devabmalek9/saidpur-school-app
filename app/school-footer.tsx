'use client';
import React from 'react';

export default function SchoolFooter() {
  return (
    <footer className="no-print" style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '50px', paddingBottom: '20px', marginTop: '40px', borderTop: '5px solid #3b82f6', borderRadius: '12px 12px 0 0', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        {/* কলাম ১: স্কুলের সংক্ষিপ্ত পরিচিতি */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#3b82f6', width: '45px', height: '45px', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>SM</div>
            <h3 style={{ color: '#ffffff', fontSize: '18px', margin: '0', fontWeight: 'bold' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h3>
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94a3b8' }}>স্থাপিত ১৯৫১ খ্রিষ্টাব্দ। নীলফামারী জেলার সৈয়দপুর শহরের অন্যতম শীর্ষস্থানীয় ও ঐতিহ্যবাহী নৈতিক ও আধুনিক শিক্ষাপ্রতিষ্ঠান। আমরা শিক্ষার্থীদের মেধা ও নৈতিকতার সমন্বয়ে যোগ্য নাগরিক হিসেবে গড়ে তুলতে প্রতিশ্রুতিবদ্ধ।</p>
        </div>

        {/* কলাম ২: কুইক লিংক */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '18px', borderBottom: '2px solid #3b82f6', paddingBottom: '8px', display: 'inline-block' }}>📋 কুইক লিংক</h4>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>🏠 হোম পেজ</a></li>
            <li><a href="/notice" style={{ color: '#94a3b8', textDecoration: 'none' }}>📢 নোটিশ বোর্ড</a></li>
            <li><a href="/result-archive" style={{ color: '#94a3b8', textDecoration: 'none' }}>📊 ফলাফল আর্কাইভ</a></li>
            <li><a href="/admission" style={{ color: '#94a3b8', textDecoration: 'none' }}>📝 অনলাইন ভর্তি ফরম</a></li>
          </ul>
        </div>

        {/* কলাম ৩: যোগাযোগের তথ্য */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '18px', borderBottom: '2px solid #3b82f6', paddingBottom: '8px', display: 'inline-block' }}>📞 যোগাযোগ করুন</h4>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
            <li>📍 <strong>ঠিকানা:</strong> সৈয়দপুর, নীলফামারী, রংপুর বিভাগ, বাংলাদেশ।</li>
            <li>📞 <strong>মোবাইল:</strong> +৮৮০ ১৭৯৪৯৭৪০৬৪ (অফিস)</li>
            <li>📧 <strong>ইমেইল:</strong> muslim.school.1951@gmail.com</li>
            <li>🆔 <strong>EIIN:</strong> ১২৫২০৭</li>
          </ul>
        </div>

        {/* কলাম ৪: সোশ্যাল লিংক */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '18px', borderBottom: '2px solid #3b82f6', paddingBottom: '8px', display: 'inline-block' }}>🌐 সামাজিক যোগাযোগ</h4>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>বিদ্যালয়ের সর্বশেষ আপডেট, ফটো ও ভিডিও দেখতে আমাদের ফেসবুক পেজে যুক্ত থাকুন।</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ background: '#3b82f6', color: '#fff', padding: '8px 15px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>🔵 ফেসবুক</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ background: '#dc2626', color: '#fff', padding: '8px 15px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>🔴 ইউটিউব</a>
          </div>
        </div>

      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '20px 20px 0 20px', borderTop: '1px solid #334155', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        © ২০২৬ সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়, সৈয়দপুর, নীলফামারী। সর্বস্বত্ব সংরক্ষিত। 
        <br />
        <span style={{ fontSize: '11px', opacity: 0.7 }}>Developed by: AM IT Solutions</span>
      </div>
    </footer>
  );
}
