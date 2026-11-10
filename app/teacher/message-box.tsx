'use client';
import React, { useState, useEffect } from 'react';

export default function MessageBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch (err) {} finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('🗑️ আপনি কি নিশ্চিত যে এই বার্তাটি ইনবক্স থেকে মুছে ফেলতে চান?')) return;
    try {
      // আমরা ইউনিভার্সাল অ্যাকশন এপিআই ব্যবহার করে বার্তা ডিলিট করব
      await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE_MESSAGE', id })
      });
      alert('🎉 বার্তাটি ইনবক্স থেকে মুছে ফেলা হয়েছে!');
      fetchMessages();
    } catch (err) { alert('মুছে ফেলা যায়নি।'); }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '20px' }}>⏳ ইনবক্স লোড হচ্ছে...</p>;

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#0284c7', fontWeight: 'bold', marginBottom: '15px' }}>📩 অভিভাবক ও দর্শনার্থীদের বার্তা ইনবক্স</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th>প্রেরকের নাম ও ইমেইল</th>
              <th>বিষয়</th>
              <th>বার্তার বিবরণ (Message)</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '20px', color: '#64748b', textAlign: 'center' }}>কোনো নতুন বার্তা জমা পড়েনি।</td></tr>
            ) : messages.map((msg: any) => (
              <tr key={msg.id}>
                <td style={{ textAlign: 'left', padding: '10px' }}>
                  <strong style={{ color: '#1e3a8a' }}>{msg.name}</strong> <br />
                  <span style={{ fontSize: '11px', color: '#64748b' }}>✉️ {msg.email}</span>
                </td>
                <td style={{ fontWeight: 'bold' }}>{msg.subject}</td>
                <td style={{ textAlign: 'left', color: '#334155', minWidth: '250px' }}>{msg.message}</td>
                <td>
                  <button onClick={() => handleDeleteMessage(msg.id)} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}>🗑️ ডিলিট</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
