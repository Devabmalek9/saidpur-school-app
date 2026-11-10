'use client';
import React, { useState, useEffect } from 'react';
import DashboardStats from './dashboard-stats';
import AuthForm from './auth-form';
import DashboardMenu from './dashboard-menu';
import DashboardNav from './dashboard-nav';

export default function TeacherPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [userRole, setUserRole] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('result');
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [cqMarks, setCqMarks] = useState('');
  const [mcqMarks, setMcqMarks] = useState('');
  const [pracMarks, setPracMarks] = useState('');
  const [examTerm, setExamTerm] = useState('HALF_YEARLY');
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [assignRollData, setAssignRollData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();

    try {
      const response = await fetch('/api/auth/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ username: cleanUser, password: cleanPass }) 
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUserRole(data.role);
        setIsLoggedIn(true);
        setActiveTab(data.role === 'HEADMASTER' || data.role === 'CLERK' ? 'admission' : 'result');
      } else {
        throw new Error(data.error || '⚠️ ভুল ইউজারনেম অথবা পাসওয়ার্ড প্রদান করা হয়েছে।');
      }
    } catch (err: any) { setError(err.message); }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: fullName, username, password, phone }) });
      if (!response.ok) throw new Error('নিবন্ধন করা যায়নি');
      setSuccessMsg('🎉 নিবন্ধন সফল! প্রধান শিক্ষক অনুমোদন করার পর লগইন করতে পারবেন।');
      setIsRegisterMode(false); setFullName(''); setUsername(''); setPassword(''); setPhone('');
    } catch (err: any) { setError(err.message); }
  };

  const fetchApplicants = async () => {
    setLoadingApplicants(true);
    try {
      const response = await fetch('/api/admission-list');
      const data = await response.json();
      const list = data?.applicants || data || [];
      setApplicants(Array.isArray(list) ? list : []);
    } catch (err) { setApplicants([]); } finally { setLoadingApplicants(false); }
  };

  // 🎯 [অটো সিঙ্ক লাইভ ট্র্যাকার লক]: প্রমোশন বা এক্সেল ইমপোর্ট ট্যাব সচল হলে ডাটা ট্র্যাকিং এন্ট্রি ম্যাপ
  useEffect(() => {
    if (isLoggedIn && (activeTab === 'admission' || activeTab === 'enroll' || activeTab === 'remove_student' || activeTab === 'promotion' || activeTab === 'excel_import')) {
      fetchApplicants();
    }
  }, [isLoggedIn, activeTab]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/admission-status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: newStatus }) });
      fetchApplicants();
    } catch (err) { console.error(err); }
  };
  const handleEnrollStudent = async (e: React.FormEvent, applicantId: string) => {
    e.preventDefault();
    const studentInfo = assignRollData[applicantId];
    if (!studentInfo?.rollNo || !studentInfo?.studentId || !studentInfo?.section) return alert('তথ্য সঠিকভাবে ইনপুট দিন।');
    try {
      const res = await fetch('/api/enroll-student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicantId, studentId: studentInfo.studentId, rollNo: studentInfo.rollNo, section: studentInfo.section }) });
      if(res.ok) { alert('🎉 রোল নম্বর বরাদ্দ হয়েছে ও ডাটাবেজে স্থায়ী প্রোফাইল তৈরি হয়েছে!'); fetchApplicants(); }
    } catch (err) { alert('সার্ভার কানেকশন জ্যাম।'); }
  };

  const handleMarysSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading'); setError('');
    const cleanId = String(studentId).trim().replace(/[০-৯]/g, (match) => String(['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'].indexOf(match)));
    try {
      const res = await fetch('/api/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId: cleanId, subject, cqMarks, mcqMarks, pracMarks, examTerm }) });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success'); alert(`🎉 সফল! আইডি: ${cleanId}-এর প্রাপ্ত নম্বর ডাটাবেজে সংরক্ষিত হয়েছে।`);
        setSubject(''); setCqMarks(''); setMcqMarks(''); setPracMarks('');
      } else { setError(data.error || 'সংরক্ষণ করা যায়নি।'); setStatus('error'); }
    } catch (err) { setError('সার্ভার লক এরর।'); setStatus('error'); }
  };

  if (!isLoggedIn) {
    return <AuthForm isRegisterMode={isRegisterMode} setIsRegisterMode={setIsRegisterMode} handleLogin={handleLogin} handleRegister={handleRegister} username={username} setUsername={setUsername} password={password} setPassword={setPassword} fullName={fullName} setFullName={setFullName} phone={phone} setPhone={setPhone} error={error} successMsg={successMsg} />;
  }

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '30px auto', padding: '0 20px', boxSizing: 'border-box', minHeight: '85vh' }}>
      <DashboardStats />
      <DashboardNav userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ marginTop: '25px', width: '100%', boxSizing: 'border-box' }}>
        <DashboardMenu activeTab={activeTab} userRole={userRole} handleMarysSubmit={handleMarysSubmit} status={status} error={error} studentId={studentId} setStudentId={setStudentId} examTerm={examTerm} setExamTerm={setExamTerm} subject={subject} setSubject={setSubject} cqMarks={cqMarks} setCqMarks={setCqMarks} mcqMarks={mcqMarks} setMcqMarks={setMcqMarks} pracMarks={pracMarks} setPracMarks={setPracMarks} applicants={applicants} handleStatusUpdate={handleStatusUpdate} loadingApplicants={loadingApplicants} assignRollData={assignRollData} setAssignRollData={setAssignRollData} handleEnrollStudent={handleEnrollStudent} />
      </div>
    </div>
  );
}
