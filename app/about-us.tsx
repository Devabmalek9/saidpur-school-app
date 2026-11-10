'use client';
import React from 'react';

export default function AboutUs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '50px', marginBottom: '30px' }}>
      
      {/* 🏛️ সেকশন ১: বিদ্যালয়ের সংক্ষিপ্ত ইতিহাস ও ঐতিহ্য */}
      <div style={{ 
        background: '#ffffff', 
        border: '1px solid #cbd5e1', 
        borderRadius: '12px', 
        padding: '30px', 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        borderLeft: '6px solid #1e3a8a'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🏛️ আমাদের ইতিহাস ও ঐতিহ্য (Our Heritage)
        </h3>
        <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', textAlign: 'justify', margin: '0' }}>
          ১৯৫১ সালের এক ঐতিহাসিক ক্ষণে নৈতিক ও আধুনিক শিক্ষার আলো ছড়িয়ে দেওয়ার মহান লক্ষ্য নিয়ে প্রতিষ্ঠিত হয় সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়। উত্তরবঙ্গের অন্যতম প্রাচীন ও ঐতিহ্যবাহী এই বিদ্যাপীঠটি দীর্ঘ ৭৫ বছর ধরে অত্যন্ত গৌরব ও সুনামের সাথে শিক্ষা কার্যক্রম পরিচালনা করে আসছে। অত্র অঞ্চলের মুসলিম জনগোষ্ঠীর মাঝে শিক্ষার হার বৃদ্ধি, নৈতিক মূল্যবোধের বিকাশ এবং কুসংস্কারমুক্ত সমাজ গঠনে এই প্রতিষ্ঠানটি এক অনন্য ভূমিকা পালন করেছে। শুরু থেকে আজ পর্যন্ত হাজারো কৃতী শিক্ষার্থী এই বিদ্যালয় থেকে শিক্ষা লাভ করে দেশ ও বিদেশের বিভিন্ন গুরুত্বপূর্ণ স্তরে নিজেদের মেধার স্বাক্ষর রেখে চলেছেন।
        </p>
      </div>

      {/* 👨‍🏫 সেকশন ২: প্রধান শিক্ষক মহোদয়ের বাণী */}
      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px', 
        padding: '30px', 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        display: 'flex',
        gap: '25px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        {/* প্রধান শিক্ষকের ডেমো ফটো ফ্রেম */}
        <div style={{ 
          width: '130px', 
          height: '160px', 
          background: '#e2e8f0', 
          borderRadius: '8px', 
          border: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#475569',
          fontWeight: 'bold',
          fontSize: '12px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
        }}>
                 {/* 👨‍🏫 প্রধান শিক্ষক মহোদয়ের আসল ফটো লোডার */}
        <div style={{ width: '130px', height: '160px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <img 
            src="https://i.ibb.co.com/fYt2H6rJ/hggg.jpg" 
            alt="প্রধান শিক্ষক" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // যদি ছবি খুঁজে না পায় তবে ব্যাকআপ ডেমো আইকন দেখাবে (Safe-Fail Lock)
              (e.target as HTMLImageElement).src = "https://i.ibb.co.com/fYt2H6rJ/hggg.jpg";
            }}
          />
        </div>

        </div>

        <div style={{ flex: '1', minWidth: '280px' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>
            👨‍🏫 প্রধান শিক্ষকের বাণী (Message from Headmaster)
          </h3>
          <h4 style={{ margin: '0 0 15px 0', color: '#475569', fontSize: '14px', fontWeight: '600' }}>
            সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়, সৈয়দপুর, নীলফামারী।
          </h4>
          <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.7', fontStyle: 'italic', textAlign: 'justify', margin: '0' }}>
            "বিসমিল্লাহির রহমানির রাহিম। সুপ্রিয় শিক্ষার্থী, অভিভাবক ও শুভানুধ্যায়ীগণ, প্রযুক্তিনির্ভর আধুনিক বিশ্বের চ্যালেঞ্জ মোকাবেলায় আমাদের শিক্ষার্থীদের যোগ্য করে গড়ে তোলাই আমাদের মূল লক্ষ্য। সৈয়দপুর মুসলিম উচ্চ বিদ্যালয় শুধু পাঠ্যপুস্তকীয় শিক্ষাই দেয় না, বরং শিক্ষার্থীদের মাঝে ধর্মীয় অনুশাসন, দেশপ্রেম ও উচ্চ নৈতিক চরিত্রের ভিত গড়ে তুলতে বদ্ধপরিকর। আমাদের দক্ষ শিক্ষক মণ্ডলী ও যুগোপযোগী শিক্ষা ব্যবস্থার মাধ্যমে আমরা প্রতিটি শিশুকে এক একজন আদর্শ ও দেশপ্রেমিক নাগরিক হিসেবে গড়ে তুলছি। আমাদের এই ডিজিটাল পোর্টালটি বিদ্যালয় প্রশাসনের স্বচ্ছতা ও গতিশীলতা আরও বৃদ্ধি করবে বলে আমি বিশ্বাস করি। মহান আল্লাহ তাআলা আমাদের সকলের সহায় হোন।"
          </p>
        </div>
      </div>

      {/* 🎯 সেকশন ৩: ভিশন ও মিশন (Vision & Mission) */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '280px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#059669', fontWeight: 'bold', fontSize: '16px' }}>🎯 আমাদের লক্ষ্য (Our Mission)</h4>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0' }}>মানসম্মত আধুনিক ও নৈতিক শিক্ষার সমন্বয়ে শিক্ষার্থীদের সুপ্ত প্রতিভার বিকাশ ঘটানো, বিজ্ঞানমনস্ক দৃষ্টিভঙ্গি তৈরি করা এবং যুগের সাথে তাল মিলিয়ে চলার উপযোগী দক্ষ মানবসম্পদ সৃষ্টি করা।</p>
        </div>
        <div style={{ flex: '1', minWidth: '280px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6366f1', fontWeight: 'bold', fontSize: '16px' }}>👁️ আমাদের দূরদৃষ্টি (Our Vision)</h4>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0' }}>উত্তরবঙ্গের একটি আদর্শ মডেল ডিজিটাল বিদ্যাপীঠ হিসেবে নিজেদের প্রতিষ্ঠিত করা, যেখানে প্রতিটি শিক্ষার্থী জ্ঞান, শৃঙ্খলা ও ধর্মীয় মূল্যবোধের এক চমৎকার পরিবেশ লাভ করবে।</p>
        </div>
      </div>

    </div>
  );
}
