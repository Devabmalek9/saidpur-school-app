'use client';
import React from 'react';

export default function DashboardNav({ userRole, activeTab, setActiveTab, setIsLoggedIn }: any) {
  return (
    <div className="no-print" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
      {/* 👨‍🏫 শিক্ষক ও স্টাফদের জন্য পরীক্ষা নম্বর ইনপুট */}
      <button onClick={() => setActiveTab('result')} style={{ backgroundColor: activeTab === 'result' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'result' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📝 নম্বর ইনপুট</button>
      
      {/* 👑 প্রধান শিক্ষক (HEADMASTER) ও ক্লার্কের জন্য মেগা বাটন গেটওয়ে */}
      {(userRole === 'HEADMASTER' || userRole === 'CLERK') && (
        <>
          <button onClick={() => setActiveTab('admission')} style={{ backgroundColor: activeTab === 'admission' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'admission' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📝 নতুন আবেদন</button>
          <button onClick={() => setActiveTab('enroll')} style={{ backgroundColor: activeTab === 'enroll' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'enroll' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>🎓 রোল বরাদ্দ</button>
          <button onClick={() => setActiveTab('notice')} style={{ backgroundColor: activeTab === 'notice' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'notice' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📢 নোটিশ প্রকাশ</button>
          <button onClick={() => setActiveTab('fees')} style={{ backgroundColor: activeTab === 'fees' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'fees' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>💰 বেতন ও ফি</button>
          <button onClick={() => setActiveTab('remove_student')} style={{ backgroundColor: activeTab === 'remove_student' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'remove_student' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>🗑️ রিমুভ (TC)</button>
          <button onClick={() => setActiveTab('messages')} style={{ backgroundColor: activeTab === 'messages' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'messages' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📩 বার্তার ইনবক্স</button>
          <button onClick={() => setActiveTab('teachers')} style={{ backgroundColor: activeTab === 'teachers' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'teachers' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>👨‍🏫 শিক্ষক অনুমোদন</button>
          <button onClick={() => setActiveTab('promotion')} style={{ backgroundColor: activeTab === 'promotion' ? '#1e3a8a' : '#f1f5f9', color: activeTab === 'promotion' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📊 প্রমোশন ইঞ্জিন</button>
          
          {/* 🎯 [মেগা সংযোজন লক]: আপনার আসল নেভিগেশন স্টাইলের সাথে এক্সেল বাল্ক ইমপোর্ট বাটনটি সংযুক্ত করা হলো */}
          <button onClick={() => setActiveTab('excel_import')} style={{ backgroundColor: activeTab === 'excel_import' ? '#0284c7' : '#f1f5f9', color: activeTab === 'excel_import' ? '#ffffff' : '#475569', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>📊 এক্সেল বাল্ক ইমপোর্ট</button>
        </>
      )}

      <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', marginLeft: 'auto' }}>🚪 লগআউট</button>
    </div>
  );
}
