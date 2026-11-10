'use client';
import React, { useState } from 'react';

export default function StudentPortal() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [feeLogs, setFeeLogs] = useState<any[]>([]);
  const [searched, setCheck] = useState(false);

  const handleSearchHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/student-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studentId.trim() })
      });
      const data = await res.json();
      setFeeLogs(Array.isArray(data?.history) ? data.history : []);
      setCheck(true);
    } catch (err) {
      alert('সার্ভার কানেকশন জ্যাম রয়েছে!');
    } finally {
      // 🎯 [Turbopack Strict Fix]: এখানে বানান finally শতভাগ নিশ্চিত করা হলো
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 15px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', background: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(30, 58, 138, 0.05)', border: '1px solid #e2e8f0' }}>
        
        {/* লোগো ও প্রাতিষ্ঠানিক হেডার */}
        <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #3b82f6', paddingBottom: '15px' }}>
          <strong style={{ fontSize: '22px', color: '#1e3a8a', letterSpacing: '0.5px' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</strong><br />
          <span style={{ fontSize: '13px', background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', marginTop: '6px', display: 'inline-block' }}>🎓 অনলাইন শিক্ষার্থী বেতন ও ফি ট্র্যাকিং পোর্টাল</span>
        </div>

        {/* ইউনিক আইডি সার্চ গেটওয়ে */}
        <form onSubmit={handleSearchHistory} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input type="text" style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '14px', fontWeight: 'bold', outline: 'none' }} placeholder="শিক্ষার্থীর ইউনিক আইডি দিন (উদাঃ ১০০১ / ৭০১)" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          <button type="submit" disabled={loading} style={{ background: '#1e3a8a', color: '#ffffff', border: 'none', padding: '0 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            {loading ? 'অনুসন্ধান হচ্ছে...' : '🔍 ইতিহাস দেখুন'}
          </button>
        </form>

        {/* ডিজিটাল খতিয়ান হিস্ট্রি কার্ড */}
        {searched && (
          <div>
            <h4 style={{ color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', margin: '0 0 15px 0', fontSize: '15px' }}>📊 আপনার ফি পরিশোধের ডিজিটাল খতিয়ান বিবরণী:</h4>
            {feeLogs.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '20px', fontWeight: 'bold', background: '#f1f5f9', borderRadius: '8px' }}>⚠️ এই আইডির বিপরীতে কোনো ট্রানজেকশন ডাটাবেজে পাওয়া যায়নি।</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {feeLogs.map((log: any) => (
                  <div key={log.id} style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '15px', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#64748b', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                      <strong>🧾 রসিদ নম্বর: <span style={{ color: '#b45309', fontFamily: 'monospace' }}>{log.id.slice(-8).toUpperCase()}</span></strong>
                      <span>📅 {log.date}</span>
                    </div>
                    <div style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                      <strong>নাম:</strong> {log.studentName} | <strong>শ্রেণী:</strong> {log.class} <br />
                      <strong>ফি এর ধরণ:</strong> <span style={{ color: '#059669', fontWeight: 'bold' }}>{log.feeType === 'MULTIPLE_FEES' ? 'সমন্বিত মাল্টি-ফি' : log.feeType}</span> <br />
                      <strong>বেতন ব্যাপ্তি:</strong> {log.monthName || 'N/A'} <br />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #edf2f7' }}>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>collectedBy: {log.collectedBy}</span>
                        <strong style={{ fontSize: '16px', color: '#1e3a8a' }}>{log.amount} ৳</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
