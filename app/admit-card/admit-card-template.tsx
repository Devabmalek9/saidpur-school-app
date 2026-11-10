'use client';
import React from 'react';

export default function AdmitCardTemplate({ student, examTerm, termNames }: any) {
  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '25px', border: '3px double #1e3a8a', background: '#fff', borderRadius: '8px', position: 'relative' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #1e3a8a', paddingBottom: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: '0', color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</h2>
        <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#475569', fontWeight: '600' }}>সৈয়দপুর, নীলফামারী | EIIN: ১২৫২০৭</p>
        <h3 style={{ margin: '10px 0 0 0', background: '#1e3a8a', color: 'white', display: 'inline-block', padding: '4px 15px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>প্রবেশপত্র (ADMIT CARD)</h3>
        <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '13px', color: '#dc2626' }}>{termNames[examTerm] || ''}</p>
      </div>

      <table className="board-table" style={{ width: '100%', fontSize: '14px', textAlign: 'left', marginBottom: '20px' }}>
        <tbody>
          <tr><td style={{ fontWeight: 'bold', width: '25%' }}>শিক্ষার্থীর নাম:</td><td colSpan={3} style={{ fontWeight: 'bold', color: '#1e3a8a', textTransform: 'uppercase' }}>{student.name}</td></tr>
          <tr><td style={{ fontWeight: 'bold' }}>শ্রেণী / শাখা:</td><td>{student.class} / {student.section}</td><td style={{ fontWeight: 'bold', width: '15%' }}>রোল নম্বর:</td><td style={{ fontWeight: 'bold' }}>{student.rollNo}</td></tr>
          <tr><td style={{ fontWeight: 'bold' }}>স্টুডেন্ট আইডি:</td><td style={{ color: '#1e3a8a', fontWeight: 'bold' }}>{student.studentId}</td><td style={{ fontWeight: 'bold' }}>অবস্থা:</td><td style={{ color: 'green', fontWeight: 'bold' }}>REGULAR</td></tr>
        </tbody>
      </table>

      <div style={{ border: '1px solid #cbd5e1', padding: '10px', background: '#f8fafc', borderRadius: '6px', fontSize: '11px', color: '#475569', lineHeight: '1.6' }}>
        📌 <strong>পরীক্ষার্থীদের জন্য জরুরি নির্দেশনাবলী:</strong><br/>
        ১. পরীক্ষা শুরুর ন্যূনতম ১৫ মিনিট পূর্বে অবশ্যই পরীক্ষা কক্ষে আসন গ্রহণ করতে হবে।<br/>
        ২. পরীক্ষা কক্ষে এই প্রবেশপত্র (Admit Card) অবশ্যই সাথে আনতে হবে এবং পরিদর্শক চাইলে প্রদর্শন করতে হবে।<br/>
        ৩. মোবাইল ফোন বা যেকোনো প্রকার ডিজিটাল ডিভাইস পরীক্ষা কক্ষে আনা সম্পূর্ণ নিষিদ্ধ।
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
        <div style={{ textAlign: 'center', width: '40%' }}><div style={{ borderBottom: '1px dashed #475569', width: '120px', margin: '0 auto' }}></div><p style={{ fontSize: '12px', fontWeight: 'bold', margin: '5px 0 0 0' }}>শ্রেণী শিক্ষকের স্বাক্ষর</p></div>
        <div style={{ textAlign: 'center', width: '40%' }}><div style={{ borderBottom: '1px dashed #475569', width: '120px', margin: '0 auto' }}></div><p style={{ fontSize: '12px', fontWeight: 'bold', margin: '5px 0 0 0' }}>প্রধান শিক্ষকের স্বাক্ষর</p></div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '25px' }} className="no-print">
        <button onClick={() => window.print()} style={{ background: '#059669', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ প্রবেশপত্র প্রিন্ট করুন</button>
      </div>
    </div>
  );
}
