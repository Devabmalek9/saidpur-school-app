'use client';
import React, { useState, useEffect } from 'react';

export default function DashboardStats() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [runningClassStats, setRunningClassStats] = useState({
    'ষষ্ঠ': 0, 'সপ্তম': 0, 'অষ্টম': 0, 'নবম': 0, 'দশম': 0
  });

  useEffect(() => {
    let isMounted = true;

    // 🎯 রিঅ্যাক্ট স্ট্যান্ডার্ড ফেইল-সেফ লাইভ ডাটা লোডার ইঞ্জিন
    const loadDashboardData = async () => {
      try {
        const res = await fetch('/api/admission-list');
        if (!res.ok) return;
        const data = await res.json();
        
        const rawList = data?.applicants || data || [];
        if (Array.isArray(rawList) && isMounted) {
          const stats = { 'ষষ্ঠ': 0, 'সপ্তম': 0, 'অষ্টম': 0, 'নবম': 0, 'দশম': 0 };
          let validTotal = 0;

          rawList.forEach((app: any) => {
            if (!app) return;
            const status = (app?.status || '').trim().toLowerCase();
            let cls = (app?.className || app?.class || '').trim();
            
            if (cls.includes('৬') || cls.toLowerCase().includes('six') || cls.includes('6')) cls = 'ষষ্ঠ';
            if (cls.includes('৭') || cls.toLowerCase().includes('seven') || cls.includes('7')) cls = 'সপ্তম';
            if (cls.includes('৮') || cls.toLowerCase().includes('eight') || cls.includes('8')) cls = 'অষ্টম';
            if (cls.includes('৯') || cls.toLowerCase().includes('nine') || cls.includes('9')) cls = 'নবম';
            if (cls.includes('১০') || cls.toLowerCase().includes('ten') || cls.includes('10')) cls = 'দশম';

            if (status !== 'rejected' && stats[cls as keyof typeof stats] !== undefined) {
              validTotal++;
              stats[cls as keyof typeof stats]++;
            }
          });

          setTotalStudents(validTotal);
          setRunningClassStats(stats);
        }
      } catch (err) {
        console.error("Admission list loading bypassed.");
      }

      try {
        const feeRes = await fetch('/api/fees');
        if (feeRes.ok) {
          const feeData = await feeRes.json();
          if (feeData.success && isMounted) {
            setTotalRevenue(feeData.totalCollected || 0);
          }
        }
      } catch (err) {
        console.error("Fee statistics loading bypassed.");
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false; // ব্রাউজার ইনফিনিট লুপ মেমোরি ব্রেক লক
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
      
      {/* 📊 স্কুলের প্রধান ৩টি ওভারভিউ ফান্ড কার্ড */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', opacity: 0.9 }}>👥 মোট চলমান শিক্ষার্থী</h4>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: '800' }}>{totalStudents} জন</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', opacity: 0.9 }}>👨‍🏫 নিবন্ধিত শিক্ষক প্যানেল</h4>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: '800' }}>১২ জন</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', opacity: 0.9 }}>💰 মোট আদায়কৃত ফান্ড</h4>
          <p style={{ margin: '10px 0 0 0', fontSize: '26px', fontWeight: '800' }}>{totalRevenue}/- টাকা</p>
        </div>
      </div>

      {/* 📝 শ্রেণীভিত্তিক রানিং শিক্ষার্থীর লাইভ ছক */}
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '14px', fontWeight: 'bold' }}>📊 প্রতি ক্লাসে মোট চলমান শিক্ষার্থী সংখ্যা:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {Object.entries(runningClassStats).map(([className, count]) => (
            <div key={className} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>{className} শ্রেণী</span>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#1e3a8a', marginTop: '5px' }}>
                {count} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>জন</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
