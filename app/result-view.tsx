'use client';

import React, { useState } from 'react';

interface ResultItem {
  id: string;
  subject: string;
  cqMarks: number;
  mcqMarks: number;
  mcqPass: number;
  pracMarks: number;
  totalMarks: number;
  grade: string;
  gpa: number;
}

interface StudentData {
  name: string;
  studentId: string;
  class: string;
  section: string;
  rollNo: number;
  meritPosition: string;
  character: string;
  finalGpa: string;
  results: ResultItem[];
}

export default function ResultView() {
  const [studentId, setStudentId] = useState('');
  const [examTerm, setExamTerm] = useState('');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const examNames: Record<string, string> = {
    'half-yearly': 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
    'pre-test': 'প্রাক-নির্বাচনী পরীক্ষা ২০২৬',
    'annual': 'বার্ষিক পরীক্ষা ২০২৬'
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStudentData(null);

    try {
      const response = await fetch(`/api/result?studentId=${studentId.trim()}&examTerm=${examTerm}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'ফলাফল পাওয়া যায়নি');
      setStudentData(data);
    } catch (err: any) {
      setError(err.message || 'সার্ভার সংযোগ ত্রুটি');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="result-section no-print">
        <h3 className="result-title">🎯 প্রাতিষ্ঠানিক ফলাফল আর্কাইভ পোর্টাল</h3>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>শিক্ষার্থীর আইডি / রোল:</label>
            <input type="text" className="form-control" placeholder="উদাঃ 1025" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>পরীক্ষা নির্বাচন করুন:</label>
            <select className="form-control" value={examTerm} onChange={(e) => setExamTerm(e.target.value)} required>
              <option value="">নির্বাচন করুন</option>
              <option value="half-yearly">অর্ধবার্ষিক পরীক্ষা</option>
              <option value="pre-test">প্রাক-নির্বাচনী পরীক্ষা</option>
              <option value="annual">বার্ষিক পরীক্ষা</option>
            </select>
          </div>
          <button type="submit" className="btn-search" disabled={loading}>{loading ? 'অনুসন্ধান চলছে...' : 'ফলাফল দেখুন'}</button>
        </form>
      </section>

      {error && <div className="error-msg no-print">⚠️ {error}</div>}

      {studentData && (
        <div className="board-transcript">
          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <table className="grade-sheet-index">
              <tbody>
                <tr><td>Letter Grade</td><td>Class Interval</td><td>Grade Point</td></tr>
                <tr><td>A+</td><td>80-100</td><td>5.0</td></tr>
                <tr><td>A</td><td>70-79</td><td>4.0</td></tr>
                <tr><td>A-</td><td>60-69</td><td>3.5</td></tr>
                <tr><td>B</td><td>50-59</td><td>3.0</td></tr>
                <tr><td>C</td><td>40-49</td><td>2.0</td></tr>
                <tr><td>D</td><td>33-39</td><td>1.0</td></tr>
                <tr><td>F</td><td>00-32</td><td>0.0</td></tr>
              </tbody>
            </table>

            <div className="board-header-zone" style={{ display: 'flex', alignItems: 'center', marginTop: '10px', gap: '15px' }}>
              <div className="board-logo-box">SM</div>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#1e3a8a' }}>SAIDPUR MUSLIM HIGH SCHOOL</h2>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '3px 0 0 0', color: '#475569', textTransform: 'uppercase' }}>
                  {examTerm ? examNames[examTerm] : 'ACADEMIC TRANSCRIPT'}
                </h3>
                <h4 style={{ fontSize: '12px', fontStyle: 'italic', margin: '3px 0 0 0', color: '#64748b', fontWeight: 'bold' }}>ESTD: 1965 | EIIN: 125207 | Saidpur, Nilphamari</h4>
              </div>
            </div>
          </div>

          <div style={{ clear: 'both', borderBottom: '2px solid #1e3a8a', margin: '15px 0' }}></div>

          <table className="board-table" style={{ textAlign: 'left', marginBottom: '25px' }}>
            <tbody>
              <tr>
                <td style={{ width: '18%', fontWeight: 'bold' }}>Student's Name</td>
                <td colSpan={5} style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#1e3a8a' }}>{studentData.name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Class / Section</td>
                <td style={{ width: '22%' }}>{studentData.class} / {studentData.section}</td>
                <td style={{ width: '12%', fontWeight: 'bold' }}>Roll No</td>
                <td style={{ width: '18%', fontWeight: 'bold' }}>{studentData.rollNo}</td>
                <td style={{ width: '15%', fontWeight: 'bold' }}>Student ID</td>
                <td style={{ color: '#1e3a8a', fontWeight: 'bold' }}>{studentData.studentId}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Merit Position</td>
                <td style={{ fontWeight: 'bold', color: '#0056B3' }}>{studentData.meritPosition}</td>
                <td style={{ fontWeight: 'bold' }}>Character</td>
                <td>{studentData.character}</td>
                <td style={{ fontWeight: 'bold' }}>Type</td>
                <td>REGULAR</td>
              </tr>
            </tbody>
          </table>

          <table className="board-table">
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={{ width: '8%' }}>SI. No.</th>
                <th style={{ textAlign: 'left', width: '37%' }}>Name of Subjects</th>
                <th style={{ width: '11%' }}>Creative (CQ)</th>
                <th style={{ width: '11%' }}>MCQ</th>
                <th style={{ width: '11%' }}>Practical</th>
                <th style={{ width: '11%' }}>Total Marks</th>
                <th style={{ width: '11%' }}>Letter Grade</th>
                <th style={{ width: '11%' }}>Grade Point (GP)</th>
              </tr>
            </thead>
            <tbody>
              {studentData.results && studentData.results.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}><strong>{item.subject}</strong></td>
                  <td>{item.cqMarks}</td>
                  <td>{item.mcqMarks || '0'}</td>
                  <td>{item.pracMarks || '0'}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.totalMarks}</td>
                  <td style={{ fontWeight: 'bold', color: item.grade === 'F' ? 'red' : '#059669' }}>{item.grade}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.gpa ? item.gpa.toFixed(2) : '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', border: '1px solid #1e3a8a', padding: '10px 15px', background: '#f8fafc' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e3a8a' }}>GPA (Grade Point Average)</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', backgroundColor: '#1e3a8a', color: '#fff', padding: '4px 20px', borderRadius: '4px' }}>
              {studentData.finalGpa}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '80px' }}>
            <div style={{ textAlign: 'center', width: '35%' }}>
              <p style={{ fontSize: '12px', color: '#475569', margin: '0' }}>Date of Publication</p>
              <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '5px 0 0 0' }}>29 October, 2026</p>
            </div>
            <div style={{ textAlign: 'center', width: '35%' }}>
              <div style={{ width: '140px', margin: '0 auto 5px auto', borderBottom: '1px solid #000' }}></div>
              <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '0' }}>Headmaster</p>
              <p style={{ fontSize: '11px', color: '#475569', margin: '0' }}>Saidpur Muslim High School</p>
            </div>
          </div>

          <div className="no-print" style={{ textAlign: 'center', marginTop: '35px' }}>
            <button onClick={() => window.print()} style={{ backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '12px 30px', fontSize: '14px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
              🖨️ Print Official Transcript
            </button>
          </div>

        </div>
      )}
    </>
  );
}
