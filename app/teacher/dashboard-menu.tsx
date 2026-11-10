'use client';
import React, { useState, useEffect } from 'react';
import FeeCounter from './fee-counter';

export default function DashboardMenu({ activeTab, userRole, handleMarysSubmit, studentId, setStudentId, examTerm, setExamTerm, subject, setSubject, cqMarks, setCqMarks, mcqMarks, setMcqMarks, pracMarks, setPracMarks, applicants, handleStatusUpdate, assignRollData, setAssignRollData, handleEnrollStudent }: any) {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('General');
  const [messages, setMessages] = useState<any[]>([]);
  const [promoId, setPromoId] = useState('');
  const [nextClass, setNextClass] = useState('সপ্তম');

  const fetchTeachersList = async () => {
    setLoadingTeachers(true);
    try {
      const res = await fetch('/api/admission-list');
      const data = await res.json();
      setTeachers(Array.isArray(data?.users) ? data.users : []);
    } catch (err) { setTeachers([]); } finally { setLoadingTeachers(false); }
  };

  const fetchInboxMessages = async () => {
    try {
      const res = await fetch('/api/admission-list');
      const data = await res.json();
      setMessages(Array.isArray(data?.messages) ? data.messages : []);
    } catch (err) { setMessages([]); }
  };

  useEffect(() => {
    if (activeTab === 'teachers') fetchTeachersList();
    if (activeTab === 'messages') fetchInboxMessages();
  }, [activeTab]);
  const handleGlobalAction = async (payload: any) => {
    try {
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) { alert(data.message || '🎉 সফল হয়েছে!'); return true; }
      alert(data.error || 'ব্যর্থ হয়েছে।'); return false;
    } catch (err) { alert('সার্ভার কানেকশন জ্যাম!'); return false; }
  };

  const handleTeacherAction = async (userId: string, actionType: 'APPROVE' | 'REJECT' | 'DELETE') => {
    if (!window.confirm('আপনি ki এই অ্যাকশনটি নিশ্চিত করতে চান?')) return;
    try {
      const res = await fetch('/api/admin-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'MANAGE_TEACHER', userId, status: actionType }) });
      const data = await res.json(); if (res.ok && data.success) { alert(data.message); fetchTeachersList(); }
    } catch (err) { alert('সার্ভার অপারেশন লক!'); }
  };

  if (activeTab === 'result') {
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#1e3a8a', margin: '0 0 15px 0', fontWeight: 'bold' }}>📝  পরীক্ষার নম্বর এন্ট্রি</h4>
        <form onSubmit={handleMarysSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" className="form-control" required placeholder="শিক্ষার্থী আইডি লিখুন" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <select className="form-control" value={examTerm} onChange={(e) => setExamTerm(e.target.value)}><option value="HALF_YEARLY">অর্ধ-বার্ষিক পরীক্ষা</option><option value="ANNUAL">বার্ষিক পরীক্ষা</option><option value="PRE_TEST">প্রাক-নির্বাচনী পরীক্ষা</option><option value="TEST">নির্বাচনী পরীক্ষা</option></select>
          
          <div className="form-group" style={{ marginTop: '0px' }}>
            <select className="form-control" required value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">বিষয় নির্বাচন করুন</option>
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

          <input type="text" className="form-control" placeholder="CQ নম্বর" value={cqMarks} onChange={(e) => setCqMarks(e.target.value)} />
          <input type="text" className="form-control" placeholder="MCQ নম্বর" value={mcqMarks} onChange={(e) => setMcqMarks(e.target.value)} />
          <input type="text" className="form-control" placeholder="Practical নম্বর" value={pracMarks} onChange={(e) => setPracMarks(e.target.value)} />
          <button type="submit" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>💾  নম্বর সংরক্ষণ করুন</button>
        </form>
      </div>
    );
  }
  if (activeTab === 'admission') {
    const pendings = applicants.filter((a: any) => a.status === 'PENDING');
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#2563eb', margin: '0 0 15px 0' }}>📝  ভর্তি ইচ্ছুক পেন্ডিং আবেদন তালিকা</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead><tr style={{ background: '#2563eb', color: 'white' }}><th style={{ padding: '8px', border: '1px solid #cbd5e1' }}>নাম</th><th style={{ border: '1px solid #cbd5e1' }}>শ্রেণী</th><th style={{ padding: '8px', border: '1px solid #cbd5e1' }}>অ্যাকশন</th></tr></thead>
            <tbody>
              {pendings.length === 0 ? <tr><td colSpan={3} style={{ padding: '10px', textAlign: 'center' }}>কোনো পেন্ডিং ডাটা নেই।</td></tr> : pendings.map((app: any) => (
                <tr key={app.id} style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}><td style={{ padding: '8px' }}>{app.name}</td><td>{app.className}</td><td><button onClick={() => handleStatusUpdate(app.id, 'APPROVED')} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>✅  অনুমোদন</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'enroll') {
    const approvedList = applicants.filter((a: any) => a.status === 'APPROVED');
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#10b981', margin: '0 0 15px 0' }}>🎓  শিক্ষার্থীদের রোল ও আইডি বরাদ্দ</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead><tr style={{ background: '#10b981', color: 'white' }}><th style={{ padding: '8px' }}>নাম</th><th style={{ border: '1px solid #cbd5e1' }}>স্টুডেন্ট আইডি</th><th style={{ border: '1px solid #cbd5e1' }}>রোল নম্বর</th><th style={{ padding: '8px' }}>শাখা</th><th style={{ padding: '8px' }}>অ্যাকশন</th></tr></thead>
            <tbody>
              {approvedList.length === 0 ? <tr><td colSpan={5} style={{ padding: '10px', textAlign: 'center' }}>কোনো ডাটা নেই।</td></tr> : approvedList.map((app: any) => (
                <tr key={app.id} style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px' }}>{app.name}</td>
                  <td><input type="text" placeholder="1002" style={{ padding: '4px', width: '80px', textAlign: 'center' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], studentId: e.target.value } })} /></td>
                  <td><input type="text" placeholder="রোল" style={{ padding: '4px', width: '60px', textAlign: 'center' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], rollNo: e.target.value } })} /></td>
                  <td><input type="text" placeholder="ক" style={{ padding: '4px', width: '40px', textAlign: 'center' }} onChange={(e) => setAssignRollData({ ...assignRollData, [app.id]: { ...assignRollData[app.id], section: e.target.value } })} /></td>
                  <td><button onClick={(e) => handleEnrollStudent(e, app.id)} style={{ backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>🎓  প্রোফাইল লক</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (activeTab === 'notice') {
    const handleNoticeSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const today = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
      const ok = await handleGlobalAction({ action: 'CREATE_NOTICE', title: noticeTitle, content: noticeContent, category: noticeCategory, date: today });
      if (ok) { setNoticeTitle(''); setNoticeContent(''); }
    };
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#b45309', margin: '0 0 15px 0', fontSize: '15px', fontWeight: 'bold' }}>📢  নতুন ডিজিটাল নোটিশ প্রকাশ</h4>
        <form onSubmit={handleNoticeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" className="form-control" required placeholder="নোটিশের শিরোনাম" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} />
          <select className="form-control" value={noticeCategory} onChange={(e) => setNoticeCategory(e.target.value)}><option value="General">সাধারণ নোটিশ</option><option value="Exam">পরীক্ষা সংক্রান্ত</option><option value="Admission">ভর্তি সংক্রান্ত</option></select>
          <textarea className="form-control" style={{ minHeight: '90px' }} required placeholder="বিস্তারিত বিবরণ..." value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)}></textarea>
          <button type="submit" style={{ backgroundColor: '#b45309', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📢  নোটিশ লাইভ করুন</button>
        </form>
      </div>
    );
  }

  if (activeTab === 'fees') {
    return <FeeCounter userRole={userRole} handleGlobalAction={handleGlobalAction} />;
  }

  if (activeTab === 'promotion') {
    const onPromo = async (e: React.FormEvent) => {
      e.preventDefault();
      await handleGlobalAction({ action: 'PROMOTE_STUDENT', studentId: promoId, nextClass }); setPromoId('');
    };

    const handleBulkAutoPromotion = async () => {
      if (!window.confirm('⚠️ অবধান প্রধান শিক্ষক মহোদয়! আপনি কি নিশ্চিতভাবে সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়ের সকল পাস করা শিক্ষার্থীদের এক ক্লিকে পরবর্তী ক্লাসে অটো-প্রমোশন দিতে চান? এর ফলে বর্তমান ১০ম শ্রেণীর সকল শিক্ষার্থী অফিশিয়ালি বের হয়ে যাবে।')) return;
      setNoticeTitle('PROMO_LOADING');
      await handleGlobalAction({ action: 'BULK_AUTO_PROMOTION' });
      setNoticeTitle('');
    };

    return (
      <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div style={{ background: '#fff3cd', padding: '25px', borderRadius: '12px', border: '2px solid #ffeba2' }}>
          <h4 style={{ color: '#9a3412', margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '16px' }}>🚀 ১-ক্লিকে চলমান সকল শ্রেণীর অটো-প্রমোশন ইঞ্জিন</h4>
          <p style={{ color: '#7c2d12', fontSize: '12.5px', margin: '0 0 15px 0', lineHeight: '1.6' }}>
            * এই বোতামে ক্লিক করামাত্রই ডাটাবেজের ষষ্ঠ শ্রেণীর ছাত্ররা সপ্তমে, Gantt সপ্তম শ্রেণীর ছাত্ররা অষ্টমে, অষ্টম শ্রেণীর ছাত্ররা নবমে এবং নবম শ্রেণীর ছাত্ররা ১০ম শ্রেণীতে প্রমোশন পেয়ে যাবে।<br />
            <strong>* বিশেষ সতর্কবার্তা: বর্তমান ১০ম শ্রেণীর সকল রেগুলার শিক্ষার্থী স্বয়ংক্রিয়ভাবে ড্যাশবোর্ড থেকে বের হয়ে SSC_PASSED তালিকায় স্থানান্তরিত হয়ে যাবে।</strong>
          </p>
          <button onClick={handleBulkAutoPromotion} disabled={noticeTitle === 'PROMO_LOADING'} style={{ backgroundColor: '#db2777', color: 'white', padding: '14px 25px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            {noticeTitle === 'PROMO_LOADING' ? '🔄 ডাটাবেজ প্রসেস হচ্ছে...' : '📊 বার্ষিক অল-ক্লাস অটো প্রমোশন সফল করুন'}
          </button>
        </div>

        <div style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
          <h4 style={{ color: '#1e3a8a', margin: '0 0 15px 0', fontWeight: 'bold', fontSize: '15px' }}>👤 একক শিক্ষার্থী প্রমোশন নিয়ন্ত্রণ</h4>
          <form onSubmit={onPromo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" className="form-control" required placeholder="শিক্ষার্থীদের আইডি লিখুন" value={noticeTitle === 'PROMO_LOADING' ? '' : promoId} onChange={(e) => setPromoId(e.target.value)} />
            <select className="form-control" value={nextClass} onChange={(e) => setNextClass(e.target.value)}>
              <option value="সপ্তম">সপ্তম শ্রেণী</option><option value="অষ্টম">অষ্টম শ্রেণী</option><option value="নবম">নবম শ্রেণী</option><option value="দশম">দশম শ্রেণী</option><option value="SSC_PASSED">উত্তীর্ণ (Alumni)</option>
            </select>
            <button type="submit" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '11px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📊 একক প্রমোশন নিশ্চিত করুন</button>
          </form>
        </div>
      </div>
    );
  }
  // 🎯 [মেগা লকিং রিলিজ ফিক্স]: ৩টি সম্ভাব্য রুট কন্ডিশন একসাথে ম্যাপ করে দেওয়া হলো যাতে উইন্ডোটি স্ক্রিনে ফুটে উঠতে বাধ্য হয়
  if (activeTab === 'excel_import' || activeTab === 'excel-import' || activeTab === 'bulk_import') {
    const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      setNoticeTitle('EXCEL_LOADING');

      reader.onload = async (evt) => {
        try {
          const text = evt.target?.result as string;
          const lines = text.split('\n');
          const studentsList = [];

          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = lines[i].split(',');
            
            studentsList.push({
              studentId: cols[0]?.replace(/[\r\n]/g, '').trim(),
              name: cols[1]?.replace(/[\r\n]/g, '').trim(),
              class: cols[2]?.replace(/[\r\n]/g, '').trim(), // চলমান শ্রেণী (উদাঃ ষষ্ঠ)
              section: cols[3]?.replace(/[\r\n]/g, '').trim(),
              rollNo: cols[4]?.replace(/[\r\n]/g, '').trim(),
              parentPhone: cols[5]?.replace(/[\r\n]/g, '').trim()
            });
          }

          const res = await fetch('/api/bulk-import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: studentsList })
          });
          const data = await res.json();
          alert(data.message || data.error);
        } catch (err) {
          alert('⚠️ এক্সেল ফাইলের ফরম্যাটটি সঠিক নয়! কলাম সিকোয়েন্স চেক করুন।');
        } finally {
          setNoticeTitle('');
        }
      };
      reader.readAsText(file);
    };

    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#0284c7', margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '16px' }}>📊 এক্সেল শিটের মাধ্যমে সকল শ্রেণীর চলমান (Running) শিক্ষার্থী ইমপোর্ট</h4>
        <p style={{ color: '#334155', fontSize: '13px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          * প্রধান শিক্ষক মহোদয়, এক ক্লিকে স্কুলের সকল শ্রেণীর রানিং শিক্ষার্থীদের ডাটা আপলোড করতে আপনার এক্সেল ফাইলটি প্রথমে <strong>.csv (Comma Separated)</strong> ফরম্যাটে সেভ করে নিন।<br />
          * এক্সেলের কলামের ক্রমটি (Column Sequence) অবশ্যই এভাবে সাজাতে হবে: <br />
          <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '5px', fontSize: '12px', fontWeight: 'bold', color: '#0284c7' }}>studentId, name, class, section, rollNo, parentPhone</code>
        </p>
        <div style={{ border: '2px dashed #0284c7', padding: '35px', borderRadius: '8px', background: '#f0f9ff', textAlign: 'center', position: 'relative' }}>
          <input type="file" accept=".csv" onChange={handleExcelUpload} disabled={noticeTitle === 'EXCEL_LOADING'} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0284c7' }}>
            {noticeTitle === 'EXCEL_LOADING' ? '🔄 ডাটাবেজে ফাইল আপলোড ও প্রোসেসিং হচ্ছে...' : '📁 এখানে ক্লিক করে চলমান শিক্ষার্থীদের .CSV এক্সেল ফাইলটি আপলোড করুন'}
          </span>
        </div>
      </div>
    );
  }

  if (activeTab === 'remove_student') {
    const onRemove = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!window.confirm('⚠️ শিক্ষার্থীর সমস্ত ডাটাবেজ কলাম মুছে ফেলে টিসি (TC) নিশ্চিত করতে চান?')) return;
      const ok = await handleGlobalAction({ action: 'REMOVE_STUDENT', studentId }); if (ok) setStudentId('');
    };
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#dc2626', margin: '0 0 15px 0' }}>🗑️  শিক্ষার্থী ডাটাবেজ রিমুভ ও টিসি (TC)</h4>
        <form onSubmit={onRemove} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" className="form-control" required placeholder="Ref শিক্ষার্থীর আইডি" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <button type="submit" style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>🗑️  муছুন</button>
        </form>
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#4f46e5', margin: '0 0 15px 0' }}>📩  যোগাযোগ ও শিক্ষক রিকভারি বার্তা ইনবক্স</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.length === 0 ? <p style={{ textAlign: 'center', color: '#64748b' }}>ইনবক্স সম্পূর্ণ খালি রয়েছে।</p> : messages.map((msg: any) => (
            <div key={msg.id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', position: 'relative' }}>
              <strong>{msg.name}</strong> <span style={{ fontSize: '11px', color: '#64748b' }}>({msg.email})</span>
              <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#b45309', fontSize: '12.5px' }}>বিষয়: {msg.subject}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12.5px', color: '#334155' }}>{msg.message}</p>
              <button onClick={async () => { if(window.confirm('মুছতে চান?')){ await handleGlobalAction({ action: 'DELETE_MESSAGE', id: msg.id }); fetchInboxMessages(); } }} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px' }}>🗑️  মুছুন</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'teachers') {
    return (
      <div className="no-print" style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#7c3aed', margin: '0 0 15px 0' }}>👨‍🏫  বিদ্যালয় শিক্ষক অনুমোদন নিয়ন্ত্রণ</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead><tr style={{ background: '#7c3aed', color: 'white' }}><th style={{ padding: '8px' }}>নাম</th><th style={{ border: '1px solid #cbd5e1' }}>ইউজারনেম</th><th style={{ padding: '8px' }}>অ্যাকশন</th></tr></thead>
            <tbody>
              {teachers.length === 0 ? <tr><td colSpan={3} style={{ padding: '10px', textAlign: 'center' }}>কোনো শিক্ষকের আবেদন নেই।</td></tr> : teachers.map((user: any) => (
                <tr key={user.id} style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{user.name}</td><td>{user.username}</td>
                  <td style={{ padding: '8px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button onClick={() => handleTeacherAction(user.id, user.isApproved ? 'REJECT' : 'APPROVE')} style={{ backgroundColor: user.isApproved ? '#f59e0b' : '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>{user.isApproved ? '❌  বাতিল' : '✅  অনুমোদন'}</button>
                    <button onClick={() => handleTeacherAction(user.id, 'DELETE')} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>🗑️  মুছুন</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="no-print" style={{ padding: '25px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
      📊 স্কুলের অফিশিয়াল ড্যাশবোর্ডের ডাটাবেজ মডিউলসমূহ সফলভাবে সচল রয়েছে। অনুগ্রহ করে মেনুবার থেকে যেকোনো বাটন সিলেক্ট করুন।
    </div>
  );
}
