'use client';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert('🎉 সফল! আপনার বার্তাটি প্রধান শিক্ষকের দপ্তরে পাঠানো হয়েছে।');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      alert(`⚠️ এরর: ${err.message || 'বার্তা পাঠানো সম্ভব হয়নি।'}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '40px 0', minHeight: '70vh' }}>
      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          {/* কলাম ১: স্থায়ী ঠিকানা ব্লক (উচ্চতা সমানকরণ ফিক্সড) */}
          <div style={{ flex: '1 1 350px', background: '#0f172a', color: '#cbd5e1', padding: '30px', borderRadius: '12px', borderTop: '5px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <h3 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '20px', marginBottom: '15px', borderBottom: '2px solid #3b82f6', paddingBottom: '8px' }}>📞 যোগাযোগের ঠিকানা</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94a3b8', marginBottom: '25px' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয় সংক্রান্ত যেকোনো দাপ্তরিক যোগাযোগ, ভর্তি বা অন্য কোনো তথ্যের জন্য সরাসরি আমাদের প্রধান কার্যালয়ে যোগাযোগ করতে পারেন।</p>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
                <li>📍 <strong>স্থায়ী ঠিকানা:</strong> সৈয়দপুর পৌরসভা, সৈয়দপুর, নীলফামারী, রংপুর বিভাগ, বাংলাদেশ।</li>
                <li>📞 <strong>প্রধান শিক্ষক দপ্তর:</strong> +৮৮০ ১৭১২-৩৪৫৬৭৮</li>
                <li>📞 <strong>সহকারী অফিস সহকারী:</strong> +৮৮০ ১৭৯৯-৯৯৯৯৯৯</li>
                <li>📧 <strong>অফিশিয়াল ইমেইল:</strong> saidpur.muslim.1951@gmail.com</li>
                <li>🆔 <strong>EIIN কোড:</strong> ১২৫২০৭</li>
              </ul>
            </div>
            <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #334155', fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>
              ⏰ অফিস সময়: শনি - বৃহস্পতি (০৯:০০ টা - ০৪:০০ টা)
            </div>
          </div>

          {/* কলাম ২: ডিজিটাল বার্তা প্রেরণের ফরম উইন্ডো (উচ্চতা সমানকরণ ফিক্সড) */}
          <div style={{ flex: '1 1 450px', background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
            <h3 style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '20px', marginBottom: '5px' }}>✉️ সরাসরি বার্তা পাঠান</h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>নিচের ফরমে আপনার তথ্য লিখে সাবমিট করলে তা সরাসরি প্রধান শিক্ষকের কম্পিউটার ইনবক্সে পৌঁছে যাবে।</p>
            
            <form onSubmit={handleMessageSubmit} style={{ margin: '0' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>আপনার নাম:</label>
                <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>আপনার ইমেইল:</label>
                <input type="email" className="form-control" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>বার্তার বিষয় (Subject):</label>
                <input type="text" className="form-control" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="উদাঃ ভর্তি বা বেতন সংক্রান্ত জিজ্ঞাসা" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>বার্তার বিবরণ (Message):</label>
                <textarea className="form-control" style={{ minHeight: '90px', resize: 'none' }} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                {loading ? 'বার্তা প্রসেস হচ্ছে...' : '📥 প্রধান শিক্ষকের দপ্তরে বার্তা পাঠান'}
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
