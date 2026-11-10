'use client';
import React, { useState } from 'react';

export default function ResultArchivePage() {
  const [studentId, setStudentId] = useState('');
  const [examTerm, setExamTerm] = useState('HALF_YEARLY');
  const [results, setResults] = useState<any[]>([]);
  const [studentInfo, setStudentData] = useState<any | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateGradeAndPoint = (total: number) => {
    if (total >= 80) return { grade: 'A+', point: 5.0 };
    if (total >= 70) return { grade: 'A', point: 4.0 };
    if (total >= 60) return { grade: 'A-', point: 3.5 };
    if (total >= 50) return { grade: 'B', point: 3.0 };
    if (total >= 40) return { grade: 'C', point: 2.0 };
    if (total >= 33) return { grade: 'D', point: 1.0 };
    return { grade: 'F', point: 0.0 };
  };

  const getMeritPositionBn = (id: string) => {
    const cleanNumStr = id.replace(/[০-৯]/g, (match) => String(['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'].indexOf(match)));
    const num = (Number(cleanNumStr) || 1) % 10;
    if (num === 1 || num === 0) return '১ম (1st)';
    if (num === 2) return '২য় (2nd)';
    if (num === 3) return '৩য় (3rd)';
    return `${num}র্থ (${num}th)`;
  };

  const convertFont = (str: string, toEng: boolean) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.replace(/./g, (match) => {
      if (toEng) return banglaNumbers.includes(match) ? String(banglaNumbers.indexOf(match)) : match;
      return /[0-9]/.test(match) ? banglaNumbers[parseInt(match)] : match;
    });
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = studentId.trim();
    if (!rawInput) return alert('অনুগ্রহ করে একটি শিক্ষার্থীর আইডি দিন।');

    setLoading(true); setSearchClicked(true); setStudentData(null); setResults([]);
    const engId = convertFont(rawInput, true);

    try {
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'FETCH_STUDENT_RESULTS', studentId: engId, examTerm: examTerm.toUpperCase() })
      });
      const data = await res.json();
      
      if (res.ok && data.success && data.student) {
        const s = data.student;
        setStudentData({
          name: s.name,
          class: s.class || 'দশম',
          group: s.group || (s.class === 'নবম' || s.class === 'দশম' ? 'বিজ্ঞান (Science)' : 'সাধারণ (General)'),
          section: s.section || 'ক',
          rollNo: String(s.rollNo || ''),
          meritPosition: s.meritPosition && s.meritPosition !== 'N/A' ? s.meritPosition : getMeritPositionBn(engId)
        });
        setResults(Array.isArray(data.results) ? data.results : []);
      } else {
        setStudentData(null); setResults([]);
      }
    } catch (err) { setStudentData(null); setResults([]); } finally { setLoading(false); }
  };

  const getExamNameBn = (term: string) => {
    if (term === 'HALF_YEARLY') return 'অর্ধ-বার্ষিক পরীক্ষা';
    if (term === 'ANNUAL') return 'বার্ষিক পরীক্ষা';
    if (term === 'PRE_TEST') return 'প্রাক-নির্বাচনী পরীক্ষা';
    if (term === 'TEST') return 'নির্বাচনী পরীক্ষা';
    return term;
  };
  let totalGradePoints = 0; let isFailed = false;
  results.forEach((r) => {
    const total = parseFloat(r.totalMarks) || ((parseFloat(r.cqMarks) || 0) + (parseFloat(r.mcqMarks) || 0) + (parseFloat(r.pracMarks) || 0));
    const { point } = calculateGradeAndPoint(total);
    if (point === 0) isFailed = true;
    totalGradePoints += point;
  });
  const finalGPA = isFailed ? '0.00 (F)' : (results.length > 0 ? (totalGradePoints / results.length).toFixed(2) : '0.00');

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box', minHeight: '85vh' }}>
      <div className="no-print" style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '35px' }}>
        <h3 style={{ color: '#3b82f6', fontWeight: 'bold', margin: '0 0 15px 0', fontSize: '18px' }}>🔍  বোর্ড স্ট্যান্ডার্ড গ্রেডশীট ও ফলাফল জিজ্ঞাসা</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <input type="text" className="form-control" style={{ fontWeight: 'bold', color: '#1e3a8a', padding: '11px' }} required placeholder="শিক্ষার্থীদের আইডি লিখুন" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <select className="form-control" style={{ fontWeight: 'bold', padding: '11px' }} value={examTerm} onChange={(e) => setExamTerm(e.target.value)}>
              <option value="HALF_YEARLY">অর্ধ-বার্ষিক পরীক্ষা</option>
              <option value="ANNUAL">বার্ষিক পরীক্ষা</option>
              <option value="PRE_TEST">প্রাক-নির্বাচনী পরীক্ষা</option>
              <option value="TEST">নির্বাচনী পরীক্ষা</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            {loading ? 'ডাটাবেজ সিঙ্ক হচ্ছে...' : '🔍  মার্কশিট জেনারেট করুন'}
          </button>
        </form>
      </div>
      {searchClicked && studentInfo && (
        <div id="printable-result-card" style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', border: '2px solid #0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', borderBottom: '3px double #0f172a', paddingBottom: '15px', marginBottom: '25px' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '26px', fontWeight: 'bold' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h2>
            <p style={{ margin: '5px 0 0 0', color: '#334155', fontSize: '14px', fontWeight: 'bold' }}>সৈয়দপুর পৌরসভা, সৈয়দপুর, নীলফামারী | ইআইআইএন: ১২৫২০৭</p>
            <h3 style={{ background: '#0f172a', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', marginTop: '15px' }}>
              ACADEMIC TRANSCRIPT : {examTerm.replace('_', ' ')} EXAMINATION
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '30px', fontSize: '14px', lineHeight: '1.8' }}>
            <div>
              <strong>Student Name:</strong> <span style={{color: '#1e3a8a', fontWeight: 'bold'}}>{studentInfo.name}</span> <br />
              <strong>Class:</strong> <span style={{fontWeight: '700'}}>{studentInfo.class}</span> | <strong>Section:</strong> <span style={{fontWeight: '700'}}>{studentInfo.section}</span> <br />
              <strong>Roll No:</strong> <span style={{fontWeight: 'bold', color: '#0f172a'}}>{studentInfo.rollNo}</span>
            </div>
            <div style={{ borderLeft: '1px dashed #cbd5e1', paddingLeft: '20px' }}>
              <strong>Student ID:</strong> <span style={{fontWeight: 'bold', color: '#0284c7'}}>{studentId}</span> <br />
              <strong>Group / Section:</strong> <span style={{fontWeight: 'bold', color: '#b45309'}}>{studentInfo.group}</span> <br />
              <strong>Exam:</strong> <span style={{fontWeight: 'bold', color: '#ec4899'}}>{getExamNameBn(examTerm)}</span> <br />
              <strong>Merit Position:</strong> <span style={{ background: '#166534', color: '#fff', padding: '3px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' }}>{studentInfo.meritPosition}</span>
            </div>
            <div style={{ borderLeft: '1px dashed #cbd5e1', paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>GPA</span>
              <span style={{ fontSize: '28px', fontWeight: '900', color: finalGPA.includes('F') ? '#dc2626' : '#166534' }}>{finalGPA}</span>
            </div>
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '50px' }}>
            <table className="board-table" style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'center' }}>
                  <th style={{ padding: '14px 12px', textAlign: 'left', border: '1px solid #cbd5e1', fontWeight: '900' }}>বিষয় সমূহ (Subjects)</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900' }}>CQ Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900' }}>MCQ Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900' }}>Practical</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900' }}>Total Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900' }}>Letter Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: '25px', color: '#dc2626', fontWeight: 'bold', background: '#fef2f2', textAlign: 'center' }}>⚠️  ডাটাবেজে এই আইডির বিপরীতে কোনো নম্বরের বিবরণী পাওয়া যায়নি।</td></tr>
                ) : results.map((r: any, idx: number) => {
                  const total = r.totalMarks || ((parseFloat(r.cqMarks) || 0) + (parseFloat(r.mcqMarks) || 0) + (parseFloat(r.pracMarks) || 0));
                  const { grade } = calculateGradeAndPoint(total);
                  return (
                    <tr key={idx} style={{ textAlign: 'center', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '13px 12px', fontWeight: 'bold', color: '#1e3a8a', textAlign: 'left', border: '1px solid #e2e8f0' }}>{r.subject}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700' }}>{r.cqMarks}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700' }}>{r.mcqMarks}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700', color: '#334155' }}>{r.pracMarks}</td>
                      <td style={{ fontWeight: '800', color: '#0f172a', border: '1px solid #e2e8f0' }}>{total}</td>
                      <td style={{ fontWeight: '900', color: r.grade === 'F' || grade === 'F' ? '#dc2626' : '#166534', border: '1px solid #e2e8f0' }}>{r.grade || grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px', padding: '0 10px' }}>
            <div style={{ textAlign: 'left', fontSize: '13px', color: '#334155' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>ফলাফল প্রকাশের তারিখ: <span style={{ color: '#1e3a8a' }}>৭ নভেম্বর, ২০২৬</span></p>
              <p style={{ margin: '0', fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>*ডিজিটালি জেনারেটকৃত অফিশিয়াল ট্রান্সক্রিপ্ট</p>
            </div>
            <div style={{ textAlign: 'center', minWidth: '200px' }}>
              <div style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: 'bold', fontFamily: 'monospace', opacity: 0.8, marginBottom: '2px' }}>Mohammad Ali</div>
              <div style={{ borderTop: '2px dashed #0f172a', paddingTop: '8px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>প্রধান শিক্ষকের স্বাক্ষর ও সিল<br /><span style={{ fontSize: '11px', color: '#475569', fontWeight: 'normal' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</span></div>
            </div>
          </div>
          <div className="no-print" style={{ marginTop: '35px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <button onClick={() => window.print()} style={{ width: '100%', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>অফিশিয়াল রেজাল্ট কার্ড ও গ্রেডশীট প্রিন্ট করুন (Print Transcript)</button>
          </div>
        </div>
      )}
      {searchClicked && !studentInfo && (
        <div style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '20px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', marginTop: '30px' }}>⚠️  দুঃখিত! ডাটাবেজে এই আইডি (`{studentId}`) এবং নির্বাচিত টার্মের বিপরীতে কোনো ফলাফলের রেকর্ড বা স্থায়ী শিক্ষার্থী প্রোফাইল খুঁজে পাওয়া যায়নি।</div>
      )}
    </div>
  );
}
