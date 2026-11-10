'use client';
import React, { useState } from 'react';

export default function AdmitCardPage() {
  const [studentId, setStudentId] = useState('');
  const [examTerm, setExamTerm] = useState('ANNUAL');
  const [studentData, setStudentData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const convertFontToEng = (str: string) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)));
  };

  const handleFetchAdmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = studentId.trim();
    const cleanId = convertFontToEng(rawInput);
    if (!cleanId) return alert('অনুগ্রহ করে একটি শিক্ষার্থী আইডি দিন।');

    setLoading(true); 
    setStudentData(null);
    setSearchClicked(true);

    try {
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'FETCH_STUDENT_RESULTS', 
          studentId: cleanId,
          examTerm: examTerm.toUpperCase()
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success && data.student) {
        // 🎯 [সিকিউরিটি গেটওয়ে ফিক্স]: আমরা ব্যাকএন্ড থেকে আসা ডেটা থেকে রেজাল্ট এরেটি ফ্রন্টএন্ডে পুরোপুরি ব্লক করে দিলাম
        const s = data.student;
        setStudentData({
          name: s.name,
          studentId: s.studentId,
          rollNo: s.rollNo,
          class: s.class,
          section: s.section,
          group: s.group,
          photo: s.photo || null
        });
      } else {
        setStudentData(null);
      }
    } catch (err) { 
      setStudentData(null);
    } finally { 
      setLoading(false); 
    }
  };

  const getExamNameBn = (term: string) => {
    if (term === 'HALF_YEARLY') return 'অর্ধ-বার্ষিক পরীক্ষা';
    if (term === 'ANNUAL') return 'বার্ষিক পরীক্ষা';
    if (term === 'PRE_TEST') return 'প্রাক-নির্বাচনী পরীক্ষা';
    if (term === 'TEST') return 'নির্বাচনী পরীক্ষা';
    return term;
  };
  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box', minHeight: '80vh' }}>
      
      {/* 🔍 প্রবেশপত্র অনুসন্ধান গেটওয়ে */}
      <div className="no-print" style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '35px' }}>
        <h3 style={{ color: '#7c3aed', fontWeight: 'bold', marginBottom: '15px', fontSize: '18px' }}>🎟️  অনলাইন প্রবেশপত্র (Admit Card) ডাউনলোড গেটওয়ে</h3>
        <form onSubmit={handleFetchAdmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <input type="text" className="form-control" style={{ fontWeight: 'bold', color: '#1e3a8a', padding: '11px' }} required placeholder="আপনার স্টুডেন্ট আইডি বা রোল দিন" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <select className="form-control" style={{ fontWeight: 'bold', padding: '11px' }} value={examTerm} onChange={(e) => setExamTerm(e.target.value)}>
              <option value="HALF_YEARLY">অর্ধ-বার্ষিক পরীক্ষা</option>
              <option value="ANNUAL">বার্ষিক পরীক্ষা</option>
              <option value="PRE_TEST">প্রাক-নির্বাচনী পরীক্ষা</option>
              <option value="TEST">নির্বাচনী পরীক্ষা</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            {loading ? 'যাচাই হচ্ছে...' : '🎟️  প্রবেশপত্র জেনারেট'}
          </button>
        </form>
      </div>

      {/* 📜 শিক্ষাবোর্ড স্ট্যান্ডার্ড অফিশিয়াল অনলাইন প্রবেশপত্র লেআউট */}
      {studentData ? (
        <div id="printable-result-card" style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', border: '2px dashed #7c3aed', boxSizing: 'border-box' }}>
          
          <div style={{ textAlign: 'center', borderBottom: '2px solid #7c3aed', paddingBottom: '15px', marginBottom: '25px' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '24px', fontWeight: 'bold' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h2>
            <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>সৈয়দপুর, নীলফামারী | অফিশিয়াল পরীক্ষা প্রবেশপত্র</p>
            <span style={{ display: 'inline-block', background: '#7c3aed', color: '#ffffff', padding: '4px 15px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
              OFFICIAL ADMIT CARD
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 2, fontSize: '14.5px', lineHeight: '2.4', color: '#1e293b' }}>
              <strong>শিক্ষার্থির নাম (Student Name):</strong> <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>{studentData.name}</span> <br />
              <strong>আইডি নম্বর (Student ID):</strong> <span style={{ fontWeight: 'bold', color: '#0284c7' }}>{studentData.studentId}</span> <br />
              <strong>রোল নম্বর (Roll No):</strong> <span style={{ fontWeight: 'bold' }}>{studentData.rollNo}</span> <br />
              <strong>শ্রেণী (Class):</strong> <span style={{ fontWeight: 'bold' }}>{studentData.class}</span> | <strong>শাখা (Section):</strong> <span style={{ fontWeight: 'bold' }}>{studentData.section}</span> <br />
              <strong>গ্রুপ / বিভাগ (Group):</strong> <span style={{ fontWeight: 'bold', color: '#b45309' }}>{studentData.group || (studentData.class === 'নবম' || studentData.class === 'দশম' ? 'বিজ্ঞান (Science)' : 'সাধারণ (General)')}</span> <br />
              <strong>পরীক্ষার নাম (Exam):</strong> <span style={{ color: '#ec4899', fontWeight: 'bold' }}>{getExamNameBn(examTerm)}</span>
            </div>

            {/* 📸 পাসপোর্ট সাইজ ছবি */}
            <div style={{ width: '110px', height: '130px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              {studentData.photo ? (
                <img src={studentData.photo} alt="Student Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#94a3b8', fontSize: '11px', textAlign: 'center', padding: '5px' }}>পাসপোর্ট সাইজ ছবি</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: '30px', background: '#faf5ff', padding: '18px', borderRadius: '6px', border: '1px solid #e9d5ff', fontSize: '12.5px', color: '#5b21b6', lineHeight: '1.7' }}>
            <strong style={{ display: 'block', marginBottom: '5px', fontSize: '13px' }}>⚠️  পরীক্ষার্থীদের জন্য জরুরি নির্দেশনাবলী:</strong>
            ১. পরীক্ষা শুরুর কমপক্ষে ১৫ মিনিট পূর্বে অবশ্যই পরীক্ষা কক্ষে আসন গ্রহণ করতে হবে। <br />
            ২. প্রবেশপত্র ব্যতিরেকে কোনো শিক্ষার্থীকে পরীক্ষা কক্ষে প্রবেশ করতে দেওয়া হবে না। <br />
            ৩. পরীক্ষা কক্ষে মোবাইল ফোন, ডিজিটাল ঘড়ি বা যেকোনো প্রকার ইলেকট্রনিক ডিভাইস আনা সম্পূর্ণ নিষিদ্ধ।
          </div>

          {/* 🖨️ প্রিন্ট বোতাম */}
          <div className="no-print" style={{ marginTop: '35px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <button onClick={() => window.print()} style={{ width: '100%', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '13px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}>
              🖨️  প্রবেশপত্র প্রিন্ট করুন (Print Admit Card)
            </button>
          </div>

        </div>
      ) : (
        searchClicked && (
          <div style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '20px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold' }}>
            ⚠️  দুঃখিত! ডাটাবেজে এই আইডি (`{studentId}`) নম্বরের কোনো শিক্ষার্থীর স্থায়ী প্রোফাইল খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি দিন।
          </div>
        )
      )}
    </div>
  );
}
