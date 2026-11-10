'use client';
import React from 'react';

export default function ApprovedList({ approvedApplicants = [], assignRollData, setAssignRollData, handleEnrollStudent, loadingApplicants }: any) {
  
  const handleRemoveStudent = async (id: string) => {
    if (!window.confirm('⚠️ এই শিক্ষার্থীর প্রোফাইলটি ডাটাবেজ থেকে চিরতরে ডিলিট/রিমুভ করতে চান?')) return;
    try {
      const res = await fetch('/api/admin-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'REMOVE_STUDENT', id }) });
      if (res.ok) { alert('🚀 শিক্ষার্থীর ডাটা সফলভাবে রিমুভ করা হয়েছে!'); window.location.reload(); }
    } catch (err) { alert('রিমুভ করা সম্ভব হয়নি।'); }
  };

  if (loadingApplicants) return <p style={{ textAlign: 'center', padding: '20px' }}>⏳ ডাটা লোড হচ্ছে...</p>;

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#d97706', fontWeight: 'bold', marginBottom: '15px', fontSize: '16px' }}>🎓 রোল ও শাখা বরাদ্দকরণ প্যানেল</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="board-table" style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th>শিক্ষার্থির নাম</th>
              <th>শ্রেণী</th>
              <th>আইডি বরাদ্দ</th>
              <th>রোল বরাদ্দ</th>
              <th>শাখা/গ্রুপ</th>
              <th>প্রশাসনিক অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {approvedApplicants.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>কোনো ডাটা পাওয়া যায়নি।</td></tr>
            ) : approvedApplicants.map((app: any) => (
              <tr key={app.id}>
                <td style={{ fontWeight: 'bold', color: '#1e3a8a', textAlign: 'left' }}>{app.name}</td>
                <td>{app.className}</td>
                <td><input type="text" placeholder="উদাঃ 1025" style={{ width: '80px', padding: '4px' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], studentId: e.target.value } })} /></td>
                <td><input type="text" placeholder="রোল নং" style={{ width: '60px', padding: '4px' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], rollNo: e.target.value } })} /></td>
                <td><input type="text" placeholder="শাখা" style={{ width: '70px', padding: '4px' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], section: e.target.value } })} /></td>
                <td>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button type="button" onClick={(e) => handleEnrollStudent(e, app.id)} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>💾 সেভ</button>
                    <button type="button" onClick={() => handleRemoveStudent(app.id)} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ রিমুভ</button>
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
