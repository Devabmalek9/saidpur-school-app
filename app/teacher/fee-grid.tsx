'use client';
import React from 'react';

export default function FeeGrid({
  isTuitionChecked, setIsTuitionChecked, tuitionAmount, setTuitionAmount, monthName, setMonthName, months,
  isAdmissionChecked, setIsAdmissionChecked, admissionAmount, setAdmissionAmount,
  isExamChecked, setIsExamChecked, examAmount, setExamAmount,
  isSessionChecked, setIsSessionChecked, sessionAmount, setSessionAmount,
  isDevChecked, setIsDevChecked, devAmount, setDevAmount,
  isSportsChecked, setIsSportsChecked, sportsAmount, setSportsAmount
}: any) {
  return (
    <>
      {/* ১. মাসিক বেতন */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="tuition" checked={isTuitionChecked} onChange={() => setIsTuitionChecked(!isTuitionChecked)} />
        <label htmlFor="tuition" style={{ width: '180px', fontWeight: 'bold', fontSize: '13px' }}>মাসিক বেতন (Tuition)</label>
        <select className="form-control" style={{ width: '110px', padding: '5px' }} disabled={!isTuitionChecked} value={monthName} onChange={(e) => setMonthName(e.target.value)}>{months.map((m: string) => <option key={m} value={m}>{m}</option>)}</select>
        <input type="text" className="form-control" style={{ flex: 1, padding: '6px' }} disabled={!isTuitionChecked} placeholder="পরিমাণ" value={tuitionAmount} onChange={(e) => setTuitionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ২. নতুন ভর্তি ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="admission" checked={isAdmissionChecked} onChange={() => setIsAdmissionChecked(!isAdmissionChecked)} />
        <label htmlFor="admission" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px' }}>নতুন ভর্তি ফি</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isAdmissionChecked} placeholder="পরিমাণ" value={admissionAmount} onChange={(e) => setAdmissionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৩. পরীক্ষা ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="exam" checked={isExamChecked} onChange={() => setIsExamChecked(!isExamChecked)} />
        <label htmlFor="exam" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px' }}>পরীক্ষা ফি</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isExamChecked} placeholder="পরিমাণ" value={examAmount} onChange={(e) => setExamAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৪. বার্ষিক সেশন ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="session" checked={isSessionChecked} onChange={() => setIsSessionChecked(!isSessionChecked)} />
        <label htmlFor="session" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px' }}>বার্ষিক সেশন ফি</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isSessionChecked} placeholder="পরিমাণ" value={sessionAmount} onChange={(e) => setSessionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৫. বিদ্যালয় উন্নয়ন ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="dev" checked={isDevChecked} onChange={() => setIsDevChecked(!isDevChecked)} />
        <label htmlFor="dev" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px' }}>বিদ্যালয় উন্নয়ন ফি</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isDevChecked} placeholder="পরিমাণ" value={devAmount} onChange={(e) => setDevAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৬. খেলাধুলা ও সাংস্কৃতিক ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="sports" checked={isSportsChecked} onChange={() => setIsSportsChecked(!isSportsChecked)} />
        <label htmlFor="sports" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px' }}>খেলাধুলা ও সাংস্কৃতিক ফি</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isSportsChecked} placeholder="পরিমাণ" value={sportsAmount} onChange={(e) => setSportsAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
    </>
  );
}
