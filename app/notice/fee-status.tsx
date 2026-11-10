'use client';
import React, { useState } from 'react';

export default function FeeStatus() {
  const [studentId, setStudentId] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleCheckFees = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;
    setLoading(true); setSearched(true);
    try {
      const res = await fetch(`/api/fees?studentId=${studentId.trim()}`);
      const data = await res.json();
      if (data.success) setHistory(data.history);
    } catch (err) {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const feeTypeNames: Record<string, string> = {
    'TUITION': 'মাসিক বেতন', 'ADMISSION': 'ভর্তি ফি', 'EXAM': 'পরীক্ষা ফি',
    'SESSION': 'সেশন ফি', 'DEVELOPMENT': 'উন্নয়ন ফি', 'SPORTS': 'খেলাধুলা ফি'
  };

  return (
    <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
      <h3 style={{ color: '#0284c7', fontWeight: 'bold', margin: '0 0 10px 0', fontSize: '18px' }}>💳 শিক্ষার্থী বেতন ও ফি পরিশোধের ইতিহাস</h3>
      <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>শিক্ষার্থীর ইউনিক আইডি (Student ID) ইনপুট দিয়ে পরিশোধিত রসিদের ডাটাবেজ ইতিহাস দেখে নিন।</p>

      <form onSubmit={handleCheckFees} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" className="form-control" style={{ flex: 1, minWidth: '200px', padding: '10px' }} required placeholder="শিক্ষার্থীর আইডি লিখুন (উদাঃ 1025)" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <button type="submit" style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'ডাটাবেজ সার্চ হচ্ছে...' : '🔍 চেক করুন'}
        </button>
      </form>

      {searched && (
        <div style={{ overflowX: 'auto' }}>
          <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th>তারিখ</th>
                <th>শিক্ষার্থীর নাম</th>
                <th>শ্রেণী</th>
                <th>ফি এর বিবরণ</th>
                <th>পরিশোধিত টাকা</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '15px', color: '#64748b', textAlign: 'center' }}>এই আইডির বিপরীতে কোনো ফি পরিশোধের রেকর্ড ডাটাবেজে পাওয়া যায়নি।</td></tr>
              ) : history.map((item) => (
                <tr key={item.id}>
                  <td>📆 {item.date}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.studentName}</td>
                  <td>{item.class}</td>
                  <td>{feeTypeNames[item.feeType]} {item.feeType === 'TUITION' ? `[${item.monthName}]` : ''}</td>
                  <td style={{ fontWeight: 'bold', color: '#166534' }}>{item.amount}/- টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
