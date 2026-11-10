'use client';
import React from 'react';

export default function StaffPage() {
  // 🎯 বিদ্যালয়ের শিক্ষক ও কর্মচারীদের অফিশিয়াল ডেমো ডাটাবেজ তালিকা
  const staffList = [
    { name: 'মোঃ সামসুল হক', designation: 'প্রধান শিক্ষক (Headmaster)', mobile: '+৮৮০ ১৭১২-৩৪৫৬৭৮', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ আব্দুল মাজিদ প্ররামণিক', designation: 'সহকারী প্রধান শিক্ষক', mobile: '+৮৮০ ১৭১১-২২৩৩৪৪', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ মামুনুর রহমান', designation: 'সিনিয়র শিক্ষিকা (তথ্য ও যোগাযোগ প্রযুক্তি)', mobile: '+৮৮০ ১৭১৩-৫৫৬৬৭৭', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ জহুরুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', mobile: '+৮৮০ ১৭১৫-৮৮৯৯০০', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ আব্দুল মালেক', designation: 'সহকারী শিক্ষক (বিজ্ঞান)', mobile: '+৮৮০ ১৭১৬-১১২২৩৩', img: 'https://unsplash.com', category: 'TEACHER' },
    { name: 'মোঃ বশিয়ার', designation: 'প্রধান অফিস সহকারী (Clerk)', mobile: '+৮৮০ ১৭৯৯-৯৯৯৯৯৯', img: 'https://unsplash.com', category: 'STAFF' },
    { name: 'মোঃ বশিয়ার', designation: 'প্রধান অফিস সহকারী (Clerk)', mobile: '+৮৮০ ১৭৯৯-৯৯৯৯৯৯', img: 'https://unsplash.com', category: 'STAFF' },
    { name: 'মোঃ বশিয়ার', designation: 'প্রধান অফিস সহকারী (Clerk)', mobile: '+৮৮০ ১৭৯৯-৯৯৯৯৯৯', img: 'https://unsplash.com', category: 'STAFF' },
    { name: 'মোঃ নয়ন ইসলাম', designation: 'অফিস সহায়ক (MLSS)', mobile: '+৮৮০ ১৭১১-০০১১২২', img: 'https://unsplash.com', category: 'STAFF' }
  ];

  const teachers = staffList.filter(s => s.category === 'TEACHER');
  const officeStaff = staffList.filter(s => s.category === 'STAFF');
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '80vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '26px', margin: '0' }}>👨‍🏫 শিক্ষক ও কর্মচারী (স্টাফ পরিচিতি)</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়ের সম্মানিত শিক্ষক শিক্ষিকা ও অফিস স্টাফবৃন্দের অফিশিয়াল তালিকা</p>
        </div>

        {/* 🎓 সেকশন ১: শিক্ষক মণ্ডলী প্যানেল */}
        <h3 style={{ color: '#1e3a8a', borderBottom: '3px solid #8b5cf6', paddingBottom: '8px', marginBottom: '25px', fontSize: '20px', fontWeight: 'bold' }}>📖 সম্মানিত শিক্ষক মণ্ডলী</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '5px' }}>
          {teachers.map((t, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', border: '3px solid #8b5cf6' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '16px' }}>{t.name}</h4>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 10px 0', fontWeight: '600' }}>{t.designation}</p>
              <div style={{ background: '#f1f5f9', padding: '6px', borderRadius: '6px', fontSize: '12px', color: '#334155', fontWeight: 'bold' }}>📞 {t.mobile}</div>
            </div>
          ))}
        </div>

        {/* 💼 সেকশন ২: অফিস কর্মচারী প্যানেল */}
        <h3 style={{ color: '#1e3a8a', borderBottom: '3px solid #059669', paddingBottom: '8px', marginBottom: '25px', marginTop: '50px', fontSize: '20px', fontWeight: 'bold' }}>💼 অফিস ও অন্যান্য কর্মচারী</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          {officeStaff.map((s, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', border: '3px solid #059669' }}>
                <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '16px' }}>{s.name}</h4>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 10px 0', fontWeight: '600' }}>{s.designation}</p>
              <div style={{ background: '#f1f5f9', padding: '6px', borderRadius: '6px', fontSize: '12px', color: '#334155', fontWeight: 'bold' }}>📞 {s.mobile}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
