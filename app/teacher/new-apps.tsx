'use client';
import React from 'react';

export default function NewApps({ pendingApplicants = [], handleStatusUpdate, loadingApplicants }: any) {
  if (loadingApplicants) return <p style={{ textAlign: 'center', fontWeight: 'bold', padding: '20px' }}>⏳ ডাটাবেজ থেকে নতুন আবেদন লোড হচ্ছে...</p>;

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#059669', fontWeight: 'bold', marginBottom: '15px' }}>📝 নতুন অনলাইন ভর্তি আবেদনসমূহ</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th>আবেদনকারীর নাম</th>
              <th>শ্রেণী</th>
              <th>পিতার নাম</th>
              <th>মোবাইল নম্বর</th>
              <th>স্ট্যাটাস</th>
              <th style={{ textAlign: 'center' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplicants.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '20px', color: '#64748b', textAlign: 'center', fontWeight: 'bold' }}>কোনো নতুন আবেদন জমা পড়েনি।</td></tr>
            ) : pendingApplicants.map((app: any) => (
              <tr key={app.id}>
                <td style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{app.name}</td>
                <td><span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{app.className}</span></td>
                <td>{app.fatherName}</td>
                <td style={{ fontWeight: 'bold' }}>{app.phone}</td>
                <td><span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>PENDING</span></td>
                {/* 🎯 HTML স্ট্যান্ডার্ড মেনে <div> এর বদলে <td> ট্যাগ ব্যবহার করে ফিক্স করা হলো */}
                <td style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button type="button" onClick={() => handleStatusUpdate(app.id, 'approved')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>✅ অনুমোদন (Approve)</button>
                    <button type="button" onClick={() => handleStatusUpdate(app.id, 'rejected')} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>❌ বাতিল</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
