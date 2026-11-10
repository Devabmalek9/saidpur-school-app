'use client';
import React, { useState, useEffect } from 'react';

export default function NoticePanel() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  // ডাটাবেজ থেকে লাইভ নোটিশ তালিকা রিফ্রেশ করার ফাংশন
  const loadNotices = () => {
    fetch('/api/notice')
      .then(res => res.json())
      .then(data => { if (data.success) setNotices(data.notices); });
  };

  useEffect(() => { loadNotices(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setSuccess(false);
    try {
      const res = await fetch('/api/notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true); setTitle(''); setContent(''); setCategory('General');
      loadNotices(); // তালিকা রিফ্রেশ
    } catch (err: any) {
      alert(`⚠️ এরর: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ ডাটাবেজ থেকে নোটিশ ডিলিট করার ওয়ান-ক্লিক লজিক
  const handleDelete = async (id: string) => {
    if (!window.confirm('⚠️ আপনি কি নিশ্চিত যে এই নোটিশটি চিরতরে ডিলিট করতে চান?')) return;
    try {
      const res = await fetch('/api/notice/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        alert('🎉 নোটিশটি সফলভাবে মুছে ফেলা হয়েছে!');
        loadNotices();
      }
    } catch (err) {
      alert('⚠️ ডিলিট করা সম্ভব হয়নি।');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* নোটিশ প্রকাশ ফরম */}
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
        <h3 style={{ color: '#1e3a8a', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>📢 ডিজিটাল নোটিশ বোর্ড কন্ট্রোল</h3>
        {success && <div style={{ background: '#ecfdf5', color: '#047857', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', border: '1px solid #a7f3d0' }}>🎉 নোটিশটি সফলভাবে ডাটাবেজে সংরক্ষিত ও প্রকাশিত হয়েছে।</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>নোটিশের শিরোনাম:</label><input type="text" className="form-control" required placeholder="শিরোনাম লিখুন..." value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="form-group" style={{ marginBottom: '15px' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>নোটিশের ধরণ:</label><select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}><option value="General">সাধারণ নোটিশ</option><option value="Exam">পরীক্ষা সংক্রান্ত</option><option value="Admission">ভর্তি সংক্রান্ত</option></select></div>
          <div className="form-group" style={{ marginBottom: '20px' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>বিস্তারিত বিবরণ:</label><textarea className="form-control" style={{ minHeight: '100px' }} required placeholder="বিস্তারিত তথ্য লিখুন..." value={content} onChange={(e) => setContent(e.target.value)}></textarea></div>
          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'সংরক্ষণ হচ্ছে...' : '🚀 নোটিশটি লাইভ প্রকাশ করুন'}</button>
        </form>
      </div>

      {/* 🛠️ প্রকাশিত নোটিশের তালিকা এবং ডিলিট কন্ট্রোল প্যানেল */}
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontWeight: 'bold' }}>📋 প্রকাশিত নোটিশ ম্যানেজমেন্ট তালিকা</h4>
        <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
          <thead><tr style={{ backgroundColor: '#f1f5f9' }}><th>তারিখ</th><th>ক্যাটাগরি</th><th>শিরোনাম</th><th>অ্যাকশন</th></tr></thead>
          <tbody>
            {notices.length === 0 ? <tr><td colSpan={4} style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>কোনো নোটিশ পাওয়া যায়নি।</td></tr> : notices.map((n) => (
              <tr key={n.id}>
                <td>{n.date}</td>
                <td><span style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{n.category}</span></td>
                <td style={{ fontWeight: 'bold', color: '#1e3a8a', textAlign: 'left' }}>{n.title}</td>
                <td><button type="button" onClick={() => handleDelete(n.id)} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>🗑️ ডিলিট</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
