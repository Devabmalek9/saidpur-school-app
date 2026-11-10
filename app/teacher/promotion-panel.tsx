'use client';

import React, { useState } from 'react';

export default function PromotionPanel() {
  const [loading, setLoading] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
    }
  };

  const handleExcelUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!excelFile) {
      alert('⚠️ অনুগ্রহ করে প্রথমে একটি বৈধ এক্সেল (.xlsx) ফাইল নির্বাচন করুন।');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', excelFile);

      const res = await fetch('/api/excel-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'এক্সেল ফাইল আপলোড করা যায়নি।');
      }

      alert(data.message || '🚀 সফলভাবে বাল্ক ডাটা ইমপোর্ট সম্পন্ন হয়েছে!');
      setExcelFile(null);

      // একই ফাইল আবার নির্বাচন করার সুযোগ রাখে
      e.currentTarget.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'অজানা সমস্যা হয়েছে।';
      alert(`⚠️ এরর: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoPromotion = async () => {
    const confirmAction = window.confirm(
      '⚠️ আপনি কি নিশ্চিত যে পুরো বিদ্যালয়ের উত্তীর্ণ শিক্ষার্থীদের রোল নাম্বারসহ পরবর্তী ক্লাসে ১-ক্লিকে অটো-প্রমোশন দিতে চান?'
    );

    if (!confirmAction) return;

    setLoading(true);

    try {
      const res = await fetch('/api/promotion', {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'অটো-প্রমোশন সম্পন্ন হয়নি।');
      }

      alert(data.message || '🚀 অটো-প্রমোশন সফলভাবে সম্পন্ন হয়েছে!');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'অজানা সমস্যা হয়েছে।';
      alert(`⚠️ অটো-প্রমোশন ব্যর্থ: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        marginTop: '10px',
      }}
    >
      {/* Excel Sheet Upload */}
      <div
        style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
        }}
      >
        <h4
          style={{
            color: '#1e3a8a',
            fontWeight: 'bold',
            margin: '0 0 10px 0',
          }}
        >
          📁 চলমান শিক্ষার্থীদের এক্সেল শিট বাল্ক ইমপোর্ট
        </h4>

        <p
          style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '15px',
          }}
        >
          নতুন সেশনের শিক্ষার্থীদের ডাটা একে একে এন্ট্রি না করে এক্সেল শিটের
          মাধ্যমে সরাসরি ডাটাবেজে আপলোড করুন। যেমন studentId, name, className, fatherName, phone লেখা ইনপুট করুন        </p>

        <form
          onSubmit={handleExcelUpload}
          style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#f8fafc',
              padding: '12px',
              borderRadius: '8px',
              border: '2px dashed #cbd5e1',
              textAlign: 'center',
            }}
          >
            <label
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#475569',
                fontSize: '13px',
                display: 'block',
                width: '100%',
              }}
            >
              {excelFile
                ? `✅ নির্বাচিত এক্সেল: ${excelFile.name}`
                : '📊 চলমান শিক্ষার্থীর এক্সেল ফাইল (.xlsx) সিলেক্ট করুন'}

              <input
                type="file"
                accept=".xlsx,.xls"
                style={{ display: 'none' }}
                onChange={handleFileSelection}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#1e3a8a',
              color: 'white',
              border: 'none',
              padding: '14px 25px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '13px',
            }}
          >
            {loading ? 'ডাটা প্রসেস হচ্ছে...' : '📥 বাল্ক ইমপোর্ট করুন'}
          </button>
        </form>
      </div>

      {/* Annual Promotion Engine */}
      <div
        style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
        }}
      >
        <h4
          style={{
            color: '#d97706',
            fontWeight: 'bold',
            margin: '0 0 10px 0',
          }}
        >
          🚀 বার্ষিক ক্লাস ওয়ান-ক্লিক অটো-প্রমোশন ইঞ্জিন
        </h4>

        <p
          style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '15px',
          }}
        >
          বার্ষিক পরীক্ষার ফলাফল জেনারেট হওয়ার পর এক ক্লিকে সকল উত্তীর্ণ
          শিক্ষার্থীদের রোল নাম্বারসহ পরবর্তী ক্লাসে অটো-প্রমোশন দিন।
        </p>

        <button
          type="button"
          onClick={handleAutoPromotion}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#d97706',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '15px',
          }}
        >
          {loading
            ? 'প্রমোশন ইঞ্জিন রান হচ্ছে...'
            : '⚡ রান ওয়ান-ক্লিক অটো-প্রমোশন (Run Auto Promotion)'}
        </button>
      </div>
    </div>
  );
}