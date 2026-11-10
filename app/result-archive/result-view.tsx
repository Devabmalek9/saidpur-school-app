'use client';
import React from 'react';

export default function ResultView({ searchClicked, studentInfo, studentId, examTerm, results, calculateGradeAndPoint, getExamNameBn, finalGPA }: any) {
  return (
    <>
      {searchClicked && studentInfo && (
        <div id="printable-result-card" style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', border: '2px solid #0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
          
          <div style={{ textAlign: 'center', borderBottom: '3px double #0f172a', paddingBottom: '15px', marginBottom: '25px' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '26px', fontWeight: 'bold' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h2>
            <p style={{ margin: '5px 0 0 0', color: '#334155', fontSize: '14px', fontWeight: 'bold' }}>সৈয়দপুর পৌরসভা, সৈয়দপুর, নীলফামারী | ইআইআইএন: ১২৫২০৭</p>
            <h3 style={{ background: '#0f172a', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', marginTop: '15px' }}>
              ACADEMIC TRANSCRIPT : {examTerm.replace('_', ' ')} EXAMINATION
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '30px', fontSize: '14px', lineHeight: '1.8' }}>
            <div>
              <strong>Student Name:</strong> <span style={{color: '#1e3a8a', fontWeight: 'bold'}}>{studentInfo.displayName}</span> <br />
              <strong>Class:</strong> <span style={{fontWeight: '700'}}>{studentInfo.displayClass}</span> | <strong>Section:</strong> <span style={{fontWeight: '700'}}>{studentInfo.section}</span> <br />
              <strong>Roll No:</strong> <span style={{fontWeight: 'bold', color: '#0f172a'}}>{studentInfo.rollNo}</span>
            </div>
            <div style={{ borderLeft: '1px dashed #cbd5e1', paddingLeft: '20px' }}>
              <strong>Student ID:</strong> <span style={{fontWeight: 'bold', color: '#0284c7'}}>{studentId}</span> <br />
              <strong>Group / Section:</strong> <span style={{fontWeight: 'bold', color: '#b45309'}}>{studentInfo.displayGroup}</span> <br />
              <strong>Exam:</strong> <span style={{fontWeight: 'bold', color: '#ec4899'}}>{getExamNameBn(examTerm)}</span> <br />
              <strong>Merit Position:</strong> <span style={{ background: '#166534', color: '#fff', padding: '2px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' }}>{studentInfo.meritPosition}</span>
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
                  <th style={{ padding: '14px 12px', textAlign: 'left', border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>বিষয় সমূহ (Subjects)</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>CQ Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>MCQ Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>Practical</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>Total Marks</th>
                  <th style={{ border: '1px solid #cbd5e1', fontWeight: '900', fontSize: '14.5px' }}>Letter Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '25px', color: '#dc2626', fontWeight: 'bold', background: '#fef2f2', textAlign: 'center' }}>
                      ⚠️ ডাটাবেজে এই আইডির বিপরীতে কোনো নম্বরের বিবরণী পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : results.map((r: any, idx: number) => {
                  const cq = parseFloat(r.cqMarks) || 0;
                  const mcq = parseFloat(r.mcqMarks) || 0;
                  const prac = parseFloat(r.pracMarks) || 0;
                  const total = r.totalMarks || (cq + mcq + prac);
                  const { grade } = calculateGradeAndPoint(total);

                  return (
                    <tr key={idx} style={{ textAlign: 'center', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '13px 12px', fontWeight: 'bold', color: '#1e3a8a', textAlign: 'left', border: '1px solid #e2e8f0', fontSize: '14px' }}>{r.subject}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700', color: '#334155' }}>{r.cqMarks}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700', color: '#334155' }}>{r.mcqMarks}</td>
                      <td style={{ border: '1px solid #e2e8f0', fontWeight: '700', color: '#334155' }}>{r.pracMarks}</td>
                      <td style={{ fontWeight: '800', color: '#0f172a', border: '1px solid #e2e8f0', fontSize: '14.5px' }}>{total}</td>
                      <td style={{ fontWeight: '900', color: r.grade === 'F' || grade === 'F' ? '#dc2626' : '#166534', border: '1px solid #e2e8f0', fontSize: '16px' }}>{r.grade || grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px', padding: '0 10px' }}>
            <div style={{ textAlign: 'left', fontSize: '13px', color: '#334155' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                ফলাফল প্রকাশের তারিখ: <span style={{ color: '#1e3a8a' }}>৭ নভেম্বর, ২০২৬</span>
              </p>
              <p style={{ margin: '0', fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>*ডিজিটালি জেনারেটকৃত অফিশিয়াল ট্রান্সক্রিপ্ট</p>
            </div>
            <div style={{ textAlign: 'center', minWidth: '200px' }}>
              <div style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: 'bold', fontFamily: 'monospace', opacity: 0.8, marginBottom: '2px' }}>Mohammad Ali</div>
              <div style={{ borderTop: '2px dashed #0f172a', paddingTop: '8px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>
                প্রধান শিক্ষকের স্বাক্ষর ও সিল
                <br />
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: 'normal' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</span>
              </div>
            </div>
          </div>

          <div className="no-print" style={{ marginTop: '35px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <button onClick={() => window.print()} style={{ width: '100%', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              🖨️ অফিশিয়াল রেজাল্ট  কার্ড ও গ্রেডশীট প্রিন্ট করুন (Print Transcript)
            </button>
          </div>

        </div>
      )}
    </>
  );
}
