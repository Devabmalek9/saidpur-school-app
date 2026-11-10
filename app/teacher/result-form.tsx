'use client';
import React from 'react';

export default function ResultForm({ handleMarksSubmit, status, error, studentId, setStudentId, examTerm, setExamTerm, subject, setSubject, cqMarks, setCqMarks, mcqMarks, setMcqMarks, pracMarks, setPracMarks }: any) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ color: '#1e3a8a', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>🎯 প্রাতিষ্ঠানিক ফলাফল ইনপুট কাউন্টার</h3>
      
      {status === 'success' && <div style={{ background: '#ecfdf5', color: '#047857', padding: '10px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', marginBottom: '15px' }}>🎉 নম্বরটি ডাটাবেজে সফলভাবে সংরক্ষিত হয়েছে!</div>}
      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', marginBottom: '15px' }}>⚠️ {error}</div>}

      <form onSubmit={handleMarksSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>শিক্ষার্থীর আইডি (Student ID):</label>
            <input type="text" className="form-control" required placeholder="উদাঃ 1025" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>পরীক্ষারধরণ:</label>
            <select className="form-control" required value={examTerm} onChange={(e) => setExamTerm(e.target.value)}>
              <option value="">নির্বাচন করুন</option>
              <option value="half-yearly">অর্ধবার্ষিক পরীক্ষা</option>
              <option value="pre-test">প্রাক-নির্বাচনী পরীক্ষা</option>
              <option value="test">নির্বাচনী পরীক্ষা</option>
              <option value="annual">বার্ষিক পরীক্ষা</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>বিষয়ের নাম:</label>
          <select className="form-control" required value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">বিষয় নির্বাচন করুন</option>
            <option value="বাংলা ১ম পত্র">বাংলা ১ম পত্র</option>
            <option value="বাংলা ২য় পত্র">বাংলা ২য় পত্র</option>
            <option value="ইংরেজি ১ম পত্র">English 1st Paper</option>
            <option value="ইংরেজি ২য় পত্র">English 2nd Paper</option>
            <option value="গণিত">গণিত </option>
            <option value="সাধারণ বিজ্ঞান">সাধারণ বিজ্ঞান</option>
            <option value="বিজ্ঞান">বিজ্ঞান</option>
            <option value="তথ্য ও যোগাযোগ প্রযুক্তি ">তথ্য ও যোগাযোগ প্রযুক্তি </option>
            <option value="কৃষি ">কৃষি </option>
            <option value="শারীরিক শিক্ষা">শারীরিক শিক্ষা</option>
            <option value="ধর্ম ও নৈতিক শিক্ষা ">ধর্ম ও নৈতিক শিক্ষা </option> 
            <option value="পদার্থ বিজ্ঞান ">পদার্থ বিজ্ঞান</option>
            <option value="রসায়ন বিজ্ঞান">রসায়ন বিজ্ঞান </option>
            <option value="বাংলাদেশ ও বিশ্ব পরিচয় ">বাংলাদেশ ও বিশ্ব পরিচয় (Practical)</option>
            <option value="জীব বিজ্ঞান ">জীব বিজ্ঞান </option>
            <option value="পৌরোনীতি  ও নাগরিকতা">পৌরোনীতি  ও নাগরিকতা</option>
            <option value="ভূগোল ও পরিবেশ">ভূগোল ও পরিবেশ</option>
            <option value="বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা">বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা</option>
            <option value="অর্থনীতি">অর্থনীতি</option>
          </select>
        </div>

        {/* 🎯 কীবোর্ড আনলকড কাস্টম নাম্বার ফিল্ডস (নো স্পিনার তীর চিহ্ন জ্যাম) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>CQ (রচনামূলক):</label>
            <input type="text" className="form-control" placeholder="00" value={cqMarks} onChange={(e) => setCqMarks(e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>MCQ (নৈর্ব্যক্তিক):</label>
            <input type="text" className="form-control" placeholder="00" value={mcqMarks} onChange={(e) => setMcqMarks(e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Practical (ব্যবহারিক):</label>
            <input type="text" className="form-control" placeholder="0" value={pracMarks} onChange={(e) => setPracMarks(e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
        </div>

        <button type="submit" style={{ width: '100%', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
          📥 শিক্ষার্থীর নম্বর সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
}
