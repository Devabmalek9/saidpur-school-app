'use client';
import React, { useState, useEffect } from 'react';

export default function NoticePage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [studentId, setStudentId] = useState('');
  const [feeHistory, setFeeHistory] = useState<any[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/notice').then(res => res.json()).then(data => { if (data.success) setNotices(data.notices || []); });
  }, []);

  const handleCheckHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return alert('শিক্ষার্থী আইডি দিন।');
    setLoading(true); setSearchClicked(true);
    try {
      const res = await fetch(`/api/fees?studentId=${studentId.trim()}`);
      const data = await res.json();
      if (data.success) setFeeHistory(data.history || []);
    } catch (err) { setFeeHistory([]); } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* নোটিশ বোর্ড লাইভ উইন্ডো */}
      <div style={{ background: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
        <h2 style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '22px', borderBottom: '3px solid #ec4899', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px' }}>📢 প্রাতিষ্ঠানিক নোটিশ বোর্ড</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {notices.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>⏳ কোনো নতুন নোটিশ প্রকাশিত হয়নি।</div>
          ) : notices.map((nt: any, i: number) => (
            <div key={nt.id || i} style={{ background: '#fff9fa', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ec4899', border: '1px solid #fee2e2', borderLeftWidth: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                <span>📌 অফিশিয়াল নোটিশ</span>
                <span>📆 তারিখ: {nt.date || new Date(nt.createdAt).toLocaleDateString('bn-BD')}</span>
              </div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '16px', fontWeight: 'bold' }}>{nt.title}</h4>
              <p style={{ margin: '0', color: '#334155', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{nt.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ফি পরিশোধের আর্কাইভ ট্র্যাকার */}
      <div style={{ background: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
        <h3 style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>🔍 শিক্ষার্থী বেতন ও ফি পরিশোধের ইতিহাস</h3>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>ইউনিক আইডি দিয়ে ডাটাবেজ থেকে রসিদের বিবরণ দেখে নিন।</p>
        <form onSubmit={handleCheckHistory} style={{ display: 'flex', gap: '10px', marginBottom: '20px', maxWidth: '450px' }}>
          <input type="text" className="form-control" style={{ fontWeight: 'bold', color: '#1e3a8a' }} required placeholder="আইডি নম্বর লিখুন" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <button type="submit" disabled={loading} style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'যাচাই হচ্ছে...' : '🔍 চেক করুন'}</button>
        </form>

        {searchClicked && (
          <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead><tr style={{ background: '#f1f5f9' }}><th>তারিখ</th><th>নাম</th><th>শ্রেণী</th><th>ফি এর বিবরণ</th><th>টাকা</th></tr></thead>
            <tbody>
              {feeHistory.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '15px', color: '#dc2626', fontWeight: 'bold', background: '#fef2f2' }}>⚠️ কোনো পরিশোধের রেকর্ড ডাটাবেজে পাওয়া যায়নি।</td></tr>
              ) : feeHistory.map((fee: any, idx: number) => (
                <tr key={fee.id || idx}><td>{fee.date}</td><td>{fee.studentName}</td><td>{fee.class}</td><td>{fee.feeType === 'TUITION' ? `মাসিক বেতন [${fee.monthName}]` : fee.feeType}</td><td style={{ fontWeight: 'bold', color: '#166534' }}>{fee.amount}/- টাকা</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
