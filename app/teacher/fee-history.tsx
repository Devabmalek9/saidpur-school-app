'use client';
import React from 'react';

export default function FeeHistory({ history = [], onDeleteLog }: any) {
  if (history.length === 0) return null;

  return (
    <div className="no-print" style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '20px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#dc2626', fontWeight: 'bold', fontSize: '14px' }}>🗑️ আদায়কৃত ফি রিফান্ড ও ডিলিট লগ প্যানেল</h4>
      <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th>তারিখ</th>
            <th>আদায়ের খাত</th>
            <th>টাকা</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h: any) => (
            <tr key={h.id}>
              <td>📆 {h.date}</td>
              <td style={{ fontWeight: '600' }}>
                {h.feeType === 'TUITION' ? `মাসিক বেতন [${h.monthName}]` : h.feeType === 'EXAM' ? 'পরীক্ষা ফি' : h.feeType === 'ADMISSION' ? 'নতুন ভর্তি ফি' : h.feeType === 'SESSION' ? 'বার্ষিক সেশন ফি' : h.feeType === 'DEVELOPMENT' ? 'উন্নয়ন ফি' : 'খেলাধুলা ফি'}
              </td>
              <td style={{ fontWeight: 'bold', color: '#b45309' }}>{h.amount}/-</td>
              <td>
                <button type="button" onClick={() => onDeleteLog(h.id)} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}>🗑️ ডিলিট</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
