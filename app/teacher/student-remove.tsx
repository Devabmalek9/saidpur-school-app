'use client';
import React, { useState } from 'react';

export default function StudentRemove() {
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDirectRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = targetId.trim();
    if (!cleanId) return alert('অনুগ্রহ করে একটি শিক্ষার্থীর আইডি দিন।');

    const confirmAction = window.confirm(`⚠️ চূড়ান্ত প্রশাসনিক সতর্কতা!\n\nআপনি কি নিশ্চিত যে শিক্ষার্থী আইডি "${cleanId}" কে সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়ের ডাটাবেজ থেকে চিরতরে মুছে ফেলতে বা TC দিতে চান?\n\nএর ফলে শিক্ষার্থীর মূল প্রোফাইল, পরীক্ষার রেজাল্ট এবং পরিশোধিত বকেয়া ফি-র সকল রেকর্ড ডাটাবেজ থেকে স্থায়ীভাবে ডিলিট হয়ে যাবে!`);
    if (!confirmAction) return;

    setLoading(true);
    try {
      // ১. প্রথমে সম্পূর্ণ ভর্তি ও বরাদ্দকরণ তালিকা থেকে চেক করা
      const studentRes = await fetch(`/api/admission-list`);
      const studentData = await studentRes.json();
      const rawList = studentData?.applicants || studentData || [];
      
      // স্ট্রিং টাইপ কাস্টিং এরর মুক্ত সার্চ
      const found = rawList.find((s: any) => String(s.studentId).trim() === String(cleanId));

      // ২. ব্যাকএন্ড ডিলিট গেটওয়েতে রিকোয়েস্ট পাঠানো (প্রোফাইল না পেলেও ডিরেক্ট ডাটাবেজ কুয়েরি ফেইল-সেফ বাইপাস)
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'REMOVE_STUDENT', 
          id: found ? found.id : null, 
          studentId: cleanId 
        })
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message || '🚀 সফলভাবে শিক্ষার্থীকে ডাটাবেজ থেকে রিমুভ করা হয়েছে!');
        setTargetId('');
      } else {
        alert(`⚠️ এরর: ${result.error}`);
      }
    } catch (err) {
      alert('অভ্যন্তরীণ সার্ভার অপারেশনে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '550px', margin: '15px auto', background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
      <h3 style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>🛑 শিক্ষার্থী রিমুভ ও টিসি (TC) প্যানেল</h3>
      <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', marginBottom: '20px' }}>ভুল এন্ট্রি হওয়া অথবা বিদ্যালয় থেকে ট্রান্সফার সার্টিফিকেট (TC) নিয়ে চলে যাওয়া নতুন বা পুরাতন যেকোনো শিক্ষার্থীর ডাটা আইডি নম্বর দিয়ে সরাসরি ডাটাবেজ থেকে মুছে ফেলুন।</p>
      
      <form onSubmit={handleDirectRemove}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#334155' }}>শিক্ষার্থীর ইউনিক আইডি (Student ID):</label>
          <input type="text" className="form-control" style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc2626', letterSpacing: '1px', padding: '12px' }} required placeholder="মুছতে চাওয়া শিক্ষার্থীর আইডি দিন (উদাঃ 1001)" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
          {loading ? 'ডাটাবেজ থেকে প্রোফাইল ডিলিট হচ্ছে...' : '🗑️ ডাটাবেজ থেকে চিরতরে মুছে ফেলুন'}
        </button>
      </form>
    </div>
  );
}
