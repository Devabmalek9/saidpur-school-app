'use client';
import React, { useState } from 'react';

export default function AdmissionPage() {
  // 🎯 গ্লোবাল স্টেট ম্যাপ: প্রতিটি কলামের নাম ব্যাকএন্ডের সাথে শতভাগ নিখুঁতভাবে সিঙ্ক করা হলো
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', birthReg: '',
    fatherNameBn: '', fatherNameEn: '', fatherNid: '',
    motherNameBn: '', motherNameEn: '', motherNid: '',
    className: 'ষষ্ঠ', phone: '', address: '', photo: ''
  });
  const [loading, setLoading] = useState(false);

  // 📸 ছবি আপলোড মেকানিজম
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('⚠️ ছবির সাইজ ২ মেগাবাইটের (2MB) কম হতে হবে!');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 📥 অল-ইন-ওয়ান ডাটা সাবমিট লজিক
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.photo) return alert('অনুগ্রহ করে শিক্ষার্থীর একটি পাসপোর্ট সাইজ ছবি আপলোড করুন।');
    setLoading(true);
    
    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        alert('🎉 আলহামদুলিল্লাহ্‌! অনলাইন ভর্তি আবেদনটি সফলভাবে ডাটাবেজে জমা হয়েছে। প্রধান শিক্ষকের অনুমোদনের পর রোল ও আইডি বরাদ্দ করা হবে।');
        
        // 🎯 সাকসেস লক: সফল হওয়ার পর ফরমের সব ঘর স্বয়ংক্রিয়ভাবে ১০০% খালি (Reset) হবে
        setFormData({
          nameBn: '', nameEn: '', birthReg: '',
          fatherNameBn: '', fatherNameEn: '', fatherNid: '',
          motherNameBn: '', motherNameEn: '', motherNid: '',
          className: 'ষষ্ঠ', phone: '', address: '', photo: ''
        });
        
        const fileInput = document.getElementById('student-photo-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        // 🎯 ট্রু এরর পপ-আপ: ব্যাকএন্ড যদি কোনো কারণে রিজেক্ট করে, তার আসল কারণ এখানে ভেসে উঠবে
        alert(`⚠️ আবেদন জমা নেওয়া যায়নি। কারণ: ${data.error || 'সব তথ্য সঠিকভাবে ইনপুট দিন।'}`);
      }
    } catch (err: any) {
      alert(`⚠️ নেটওয়ার্ক বা ডাটাবেজ এরর: ${err.message || 'আবার চেষ্টা করুন।'}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: '850px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        
        {/* ফরমের প্রাতিষ্ঠানিক লোগো ও হেডার */}
        <div style={{ textAlign: 'center', borderBottom: '3px solid #059669', paddingBottom: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#059669', width: '60px', height: '60px', color: '#fff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '22px', marginBottom: '10px' }}>SM</div>
          <h2 style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '24px', margin: '0' }}>📝 অনলাইন ছাত্র/ছাত্রী ভর্তি আবেদন ফরম</h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px', fontWeight: '600' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়, সৈয়দপুর, নীলফামারী</p>
        </div>

        <form onSubmit={handleApply} style={{ margin: '0' }}>
          
          {/* 📸 সেকশন ০: ডিজিটাল লাইভ ছবি আপলোডার উইন্ডো */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px dashed #059669', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <div style={{ width: '110px', height: '130px', border: '2px solid #cbd5e1', borderRadius: '6px', background: '#e2e8f0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {formData.photo ? (
                <img src={formData.photo} alt="Student Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#64748b', fontSize: '11px', textAlign: 'center', padding: '5px' }}>পাসপোর্ট সাইজ ছবি</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px', color: '#334155' }}>শিক্ষার্থীর ছবি আপলোড করুন (বাধ্যতামূলক):</label>
              <input type="file" id="student-photo-input" accept="image/*" required onChange={handlePhotoChange} style={{ fontSize: '13px' }} />
              <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '11px' }}>* সর্বোচ্চ ফাইল সাইজ: 2MB (JPG, JPEG, PNG)</p>
            </div>
          </div>

          {/* 👥 সেকশন ১: শিক্ষার্থীর মৌলিক তথ্য */}
          <h3 style={{ color: '#059669', fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '15px' }}>১. শিক্ষার্থীর সাধারণ বিবরণী</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Ref শিক্ষার্থীর নাম (বাংলায়):</label>
              <input type="text" className="form-control" required placeholder="উদাঃ মোঃ সাকিব আল হাসান" value={formData.nameBn} onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>শিক্ষার্থীর নাম (ইংরেজিতে বড় অক্ষরে):</label>
              <input type="text" className="form-control" style={{ textTransform: 'uppercase' }} required placeholder="উদাঃ MD. SAKIB AL HASAN" value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>শিক্ষার্থীর জন্ম নিবন্ধন নম্বর (১৭ ডিজিট):</label>
              <input type="text" className="form-control" maxLength={17} required placeholder="উদাঃ ২০০৬৮৫১২৭XXXXXXXXXXXXXXXX" value={formData.birthReg} onChange={(e) => setFormData({ ...formData, birthReg: e.target.value.replace(/[^0-9]/g, '') })} />
            </div>
          </div>

          {/* 👨‍👩‍👦 সেকশন ২: পিতামাতার বিবরণী */}
          <h3 style={{ color: '#059669', fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '15px' }}>২. পিতা ও মাতার বিবরণী</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>পিতার নাম (বাংলায়):</label>
              <input type="text" className="form-control" required value={formData.fatherNameBn} onChange={(e) => setFormData({ ...formData, fatherNameBn: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>পিতার নাম (ইংরেজিতে):</label>
              <input type="text" className="form-control" required value={formData.fatherNameEn} onChange={(e) => setFormData({ ...formData, fatherNameEn: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>মাতার নাম (বাংলায়):</label>
              <input type="text" className="form-control" required value={formData.motherNameBn} onChange={(e) => setFormData({ ...formData, motherNameBn: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>মাতার নাম (ইংরেজিতে):</label>
              <input type="text" className="form-control" required value={formData.motherNameEn} onChange={(e) => setFormData({ ...formData, motherNameEn: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>পিতার এনআইডি (NID) নম্বর:</label>
              <input type="text" className="form-control" required placeholder="পিতার এনআইডি নম্বর দিন" value={formData.fatherNid} onChange={(e) => setFormData({ ...formData, fatherNid: e.target.value.replace(/[^0-9]/g, '') })} />
            </div>
            
            {/* 🎯 ফিক্সড মাতার এনআইডি ইনপুট সেকশন */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>মাতার এনআইডি (NID) নম্বর:</label>
              <input type="text" className="form-control" required placeholder="মাতার এনআইডি নম্বর দিন" value={formData.motherNid} onChange={(e) => setFormData({ ...formData, motherNid: e.target.value.replace(/[^0-9]/g, '') })} />
            </div>
          </div>

          {/* 📍 সেকশন ৩: একাডেমিক ও যোগাযোগ ঠিকানা */}
          <h3 style={{ color: '#059669', fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '15px' }}>৩. একাডেমিক ও যোগাযোগের ঠিকানা</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>যে শ্রেণীতে ভর্তি হতে ইচ্ছুক:</label>
              <select className="form-control" style={{ fontWeight: 'bold' }} value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })}>
                <option value="ষষ্ঠ">ষষ্ঠ শ্রেণী</option>
                <option value="সপ্তম">সপ্তম শ্রেণী</option>
                <option value="অষ্টম">অষ্টম শ্রেণী</option>
                <option value="নবম">নবম শ্রেণী</option>
                <option value="দশম">দশম শ্রেণী</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>অভিভাবকের সচল মোবাইল নম্বর:</label>
              <input type="tel" className="form-control" style={{ fontWeight: 'bold', color: '#166534' }} maxLength={11} required placeholder="উদাঃ 017XXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>স্থায়ী ও বর্তমান ঠিকানা (বিস্তারিত):</label>
              <textarea className="form-control" style={{ minHeight: '80px', resize: 'none' }} required placeholder="গ্রাম/মহল্লা, ডাকঘর, থানা, জেলা" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}></textarea>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#059669', color: 'white', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)' }}>
            {loading ? 'ডাটাবেজে লেজার স্টোর হচ্ছে...' : '📥 ডিজিটাল আবেদনপত্র সাবমিট করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
