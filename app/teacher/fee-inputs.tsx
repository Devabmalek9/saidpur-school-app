'use client';
import React from 'react';

export default function FeeInputs({
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
        <input type="checkbox" id="tuition" checked={isTuitionChecked} onChange={() => setIsTuitionChecked(!isTuitionChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="tuition" style={{ width: '180px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>মাসিক বেতন (Tuition)</label>
        <select className="form-control" style={{ width: '110px', padding: '5px' }} disabled={!isTuitionChecked} value={monthName} onChange={(e) => setMonthName(e.target.value)}>
          {months.map((m: string) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input type="text" className="form-control" style={{ flex: 1, padding: '6px' }} disabled={!isTuitionChecked} placeholder={isTuitionChecked ? "টাকার পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={tuitionAmount} onChange={(e) => setTuitionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ২. নতুন ভর্তি ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="admission" checked={isAdmissionChecked} onChange={() => setIsAdmissionChecked(!isAdmissionChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="admission" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>নতুন ভর্তি ফি (Admission Fee)</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isAdmissionChecked} placeholder={isAdmissionChecked ? "পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={admissionAmount} onChange={(e) => setAdmissionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৩. পরীক্ষা ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="exam" checked={isExamChecked} onChange={() => setIsExamChecked(!isExamChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="exam" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>পরীক্ষা ফি (Exam Fee)</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isExamChecked} placeholder={isExamChecked ? "পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={examAmount} onChange={(e) => setExamAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৪. বার্ষিক সেশন ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="session" checked={isSessionChecked} onChange={() => setIsSessionChecked(!isSessionChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="session" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>বার্ষিক সেশন ফি (Session Fee)</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isSessionChecked} placeholder={isSessionChecked ? "পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={sessionAmount} onChange={(e) => setSessionAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৫. বিদ্যালয় উন্নয়ন ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="development" checked={isDevChecked} onChange={() => setIsDevChecked(!isDevChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="development" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>বিদ্যালয় উন্নয়ন ফি (Development)</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isDevChecked} placeholder={isDevChecked ? "পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={devAmount} onChange={(e) => setDevAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

      {/* ৬. খেলাধুলা ও সাংস্কৃতিক ফি */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
        <input type="checkbox" id="sports" checked={isSportsChecked} onChange={() => setIsSportsChecked(!isSportsChecked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        <label htmlFor="sports" style={{ flex: 1, fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>খেলাধুলা ও সাংস্কৃতিক ফি (Sports)</label>
        <input type="text" className="form-control" style={{ width: '150px', padding: '6px' }} disabled={!isSportsChecked} placeholder={isSportsChecked ? "পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={sportsAmount} onChange={(e) => setSportsAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>

    
    </> 
  );
}
