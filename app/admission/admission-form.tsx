'use client';
import React from 'react';

export default function AdmissionForm({ handleSubmit, formData, setFormData, handleFileChange, photo, status }: any) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>শিক্ষার্থীর পূর্ণ নাম:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="উদাঃ সাকিব আল হাসান" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>কোন শ্রেণীতে ভর্তি হতে ইচ্ছুক:</label>
          <select className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})}>
            <option value="">শ্রেণী নির্বাচন করুন</option>
            <option value="ষষ্ঠ">ষষ্ঠ শ্রেণী</option>
            <option value="সপ্তম">সপ্তম শ্রেণী</option>
            <option value="অষ্টম">অষ্টম শ্রেণী</option>
            <option value="নবম">নবম শ্রেণী</option>
            <option value="দশম">দশম শ্রেণী</option> 
          </select>
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>শিক্ষার্থীর জন্ম নিবন্ধন নম্বর:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="১৭ ডিজিটের নম্বর" value={formData.birthRegNo} onChange={(e) => setFormData({...formData, birthRegNo: e.target.value})} />
        </div>
        <div className="form-group"> 
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>পূর্বের বিদ্যালয়ের নাম:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="উদাঃ সৈয়দপুর সরকারি স্কুল" value={formData.previousSchool} onChange={(e) => setFormData({...formData, previousSchool: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>পিতার নাম:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>পিতার এনআইডি নম্বর:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="NID নম্বর" value={formData.fatherNid} onChange={(e) => setFormData({...formData, fatherNid: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>মাতার নাম:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required value={formData.motherName} onChange={(e) => setFormData({...formData, motherName: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>মাতার এনআইডি নম্বর:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="NID নম্বর" value={formData.motherNid} onChange={(e) => setFormData({...formData, motherNid: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>মোবাইল নাম্বার:</label>
          <input type="tel" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="017XXXXXXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#475569' }}>বর্তমান ঠিকানা:</label>
          <input type="text" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required placeholder="গ্রাম, ডাকঘর, উপজেলা" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
        </div>
        <div className="form-group" style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '2px dashed #cbd5e1', textAlign: 'center' }}>
          <label style={{ cursor: 'pointer', display: 'block', fontWeight: 'bold', color: '#475569' }}>
            📁 শিক্ষার্থীর পাসপোর্ট সাইজ ছবি নির্বাচন করুন (JPG/PNG)
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          {photo && <p style={{ marginTop: '10px', color: '#059669', fontWeight: 'bold' }}>✅ নির্বাচিত ফাইল: {photo.name}</p>}
        </div>
      </div>
      <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer', fontSize: '16px' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'আবেদনপত্র আপলোড হচ্ছে...' : '🚀 চূড়ান্ত আবেদনপত্র জমা দিন'}
      </button>
    </form>
  );
}
