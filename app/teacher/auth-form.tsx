'use client';
import React, { useState } from 'react';

export default function AuthForm({
  isRegisterMode,
  setIsRegisterMode,
  handleLogin,
  handleRegister,
  username,
  setUsername,
  password,
  setPassword,
  fullName,
  setFullName,
  phone,
  setPhone,
  error,
  successMsg
}: any) {
  // 🎯 রিকভারি উইন্ডো নিয়ন্ত্রণের জন্য নতুন কাস্টম স্টেট
  const [recoveryMode, setRecoveryMode] = useState<'NONE' | 'PASSWORD' | 'USERNAME'>('NONE');
  const [recoveryPhone, setRecoveryPhone] = useState('');
  const [recoveryName, setRecoveryName] = useState('');
  const [localSuccess, setLocalSuccess] = useState('');
  const [localError, setLocalError] = useState('');
  const [recLoading, setRecLoading] = useState(false);

  // 🎯 প্রধান শিক্ষক প্যানেলে স্বয়ংক্রিয় রিকভারি রিকোয়েস্ট পাঠানোর ইঞ্জিন
  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setLocalSuccess('');
    setRecLoading(true);

    try {
      // বিদ্যালয়ের কন্টাক্ট ও মেসেজ ইনবক্স এপিআই-এর মাধ্যমে রিকোয়েস্টটি সরাসরি হেডমাস্টার ড্যাশবোর্ডে পাঠানো হচ্ছে
      const res = await fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: recoveryName || 'শিক্ষক/স্টাফ অ্যাকাউন্ট',
          email: recoveryPhone,
          subject: recoveryMode === 'PASSWORD' ? '🔐 পাসওয়ার্ড রিকভারি রিকোয়েস্ট' : '🆔 ইউজার আইডি রিকভারি রিকোয়েস্ট',
          message: `জরুরি: মোবাইল নম্বর (${recoveryPhone}) সংবলিত শিক্ষক প্যানেলের অ্যাকাউন্টটি রিকভার করার জন্য আবেদন করা হয়েছে। অনুগ্রহ করে ইউজার ডাটাবেজ চেক করে রিসেট নিশ্চিত করুন।`
        })
      });

      if (res.ok) {
        setLocalSuccess('🎉 আবেদনটি সফল হয়েছে! আপনার অনুরোধটি প্রধান শিক্ষক মহোদয়ের প্যানেলে পাঠানো হয়েছে। অনুগ্রহ করে বিদ্যালয়ের প্রশাসনের সাথে যোগাযোগ করুন।');
        setRecoveryPhone('');
        setRecoveryName('');
      } else {
        setLocalError('⚠️ রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি ক্লার্ক বা প্রধান শিক্ষকের সাথে যোগাযোগ করুন।');
      }
    } catch (err) {
      setLocalError('⚠️ সার্ভার নেটওয়ার্ক লক এরর।');
    } finally {
      setRecLoading(false);
    }
  };
  // 🎯 ১. যদি পাসওয়ার্ড বা ইউজার আইডি রিকভারি মোড সক্রিয় থাকে
  if (recoveryMode !== 'NONE') {
    return (
      <div style={{ maxWidth: '450px', width: '100%', margin: '60px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ background: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #f1f5f9', paddingBottom: '15px' }}>
            <h2 style={{ color: '#7c3aed', margin: '0', fontSize: '19px', fontWeight: 'bold' }}>
              {recoveryMode === 'PASSWORD' ? '🔐 পাসওয়ার্ড পুনরুদ্ধার উইন্ডো' : '🆔 ইউজার আইডি পুনরুদ্ধার উইন্ডো'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '5px 0 0 0' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয় পোর্টাল</p>
          </div>

          {localError && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold', border: '1px solid #fca5a5', textAlign: 'center' }}>{localError}</div>}
          {localSuccess && <div style={{ background: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold', border: '1px solid #bbf7d0', textAlign: 'center' }}>{localSuccess}</div>}

          <form onSubmit={handleRecoverySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>আপনার নাম (Teacher Name):</label>
              <input type="text" className="form-control" style={{ padding: '11px' }} required placeholder="উদাঃ মোহাম্মদ আলী" value={recoveryName} onChange={(e) => setRecoveryName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>রেজিস্ট্রিকৃত মোবাইল নম্বর (Registered Phone):</label>
              <input type="text" className="form-control" style={{ padding: '11px', fontWeight: 'bold' }} required placeholder="উদাঃ 017XXXXXXXX" value={recoveryPhone} onChange={(e) => setRecoveryPhone(e.target.value)} />
            </div>
            
            <button type="submit" disabled={recLoading} style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
              {recLoading ? 'আবেদন পাঠানো হচ্ছে...' : '✨ অ্যাকাউন্ট পুনরুদ্ধারের আবেদন পাঠান'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
            <button type="button" onClick={() => { setRecoveryMode('NONE'); setLocalError(''); setLocalSuccess(''); }} style={{ background: 'none', border: 'none', color: '#1e3a8a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>🔙 প্রধান লগইন পেজে ফিরে যান</button>
          </div>
        </div>
      </div>
    );
  }

  // 🎯 ২. সাধারণ লগইন এবং রেজিস্ট্রেশন উইন্ডো লেআউট
  return (
    <div style={{ maxWidth: '450px', width: '100%', margin: '60px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <div style={{ background: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #f1f5f9', paddingBottom: '15px' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '20px', fontWeight: 'bold' }}>
            {isRegisterMode ? '📝 শিক্ষক নিবন্ধন প্যানেল' : '🔐 শিক্ষক ও স্টাফ লগইন'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '12.5px', margin: '5px 0 0 0' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয় পোর্টাল</p>
        </div>

        {(error || localError) && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold', border: '1px solid #fca5a5', textAlign: 'center' }}>
            ⚠️ {error || localError}
          </div>
        )}

        {(successMsg || localSuccess) && (
          <div style={{ background: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold', border: '1px solid #bbf7d0', textAlign: 'center' }}>
            {successMsg || localSuccess}
          </div>
        )}

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegisterMode && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>পূর্ণ নাম (Full Name):</label>
                <input type="text" className="form-control" style={{ padding: '11px' }} required placeholder="উদাঃ মোহাম্মদ আলী" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>মোবাইল নম্বর (Phone):</label>
                <input type="text" className="form-control" style={{ padding: '11px' }} required placeholder="উদাঃ 017XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>ব্যবহারকারীর নাম (Username):</label>
            <input type="text" className="form-control" style={{ padding: '11px', fontWeight: 'bold', color: '#1e3a8a' }} required placeholder="আপনার ব্যবহারকারীর নাম দিন" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>পাসওয়ার্ড (Password):</label>
            <input type="password" className="form-control" style={{ padding: '11px' }} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {!isRegisterMode && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '-4px' }}>
              {/* 🎯 পাসওয়ার্ড এবং ইউজার আইডি উদ্ধারের অফিশিয়াল নতুন হাইপারলিংক বাটন */}
              <button type="button" onClick={() => setRecoveryMode('USERNAME')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}>🆔 ইউজার আইডি ভুলে গেছেন?</button>
              <button type="button" onClick={() => setRecoveryMode('PASSWORD')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}>🔐 পাসওয়ার্ড ভুলে গেছেন?</button>
            </div>
          )}

          <button type="submit" style={{ backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '10px', boxShadow: '0 4px 6px rgba(30, 58, 138, 0.15)' }}>
            {isRegisterMode ? '✨ নিবন্ধন সম্পন্ন করুন' : '🚀 প্যানেলে প্রবেশ করুন'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          {isRegisterMode ? (
            <span>পূর্বেই অ্যাকাউন্ট তৈরি করা আছে? <button type="button" onClick={() => setIsRegisterMode(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}>এখানে লগইন করুন</button></span>
          ) : (
            <span>নতুন শিক্ষক? <button type="button" onClick={() => setIsRegisterMode(true)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}>নতুন অ্যাকাউন্ট তৈরি করুন</button></span>
          )}
        </div>

      </div>
    </div>
  );
}
