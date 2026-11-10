'use client';

import React, { useState, useEffect } from 'react';

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export default function NoticeBoardView() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  useEffect(() => {
    fetch('/api/notice')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Notice API failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.notices)) {
          setNotices(data.notices);
        }
      })
      .catch((error) => {
        console.error('Notice load error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>
        📢 নোটিশ বোর্ড লোড হচ্ছে...
      </p>
    );
  }

  const tickerText =
    notices.length > 0
      ? notices.map((n) => `📢 [${n.date}] ${n.title}`).join('  |  ')
      : '🏫 সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়ের অনলাইন ডিজিটাল পোর্টালে আপনাকে স্বাগতম।';

  return (
    <div style={{ margin: '30px 0' }}>
      {/* লাইভ স্ক্রোলিং নোটিশ টিকার */}
      <div
        style={{
          background: '#ef4444',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: '6px',
          marginBottom: '25px',
          border: '1px solid #dc2626',
        }}
      >
        <div
          style={{
            background: '#b91c1c',
            padding: '10px 20px',
            fontWeight: 'bold',
            zIndex: 2,
            whiteSpace: 'nowrap',
          }}
        >
          🔥 সর্বশেষ নোটিশ:
        </div>
          <style>
  {`
    @keyframes noticeTicker {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    }
  `}
</style>

<div
  style={{
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }}
>
  <div
    style={{
      display: 'inline-block',
      fontSize: '15px',
      fontWeight: 'bold',
      padding: '8px 0',
      animation: 'noticeTicker 18s linear infinite',
    }}
  >
    {tickerText}
  </div>
</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* নোটিশ বোর্ড */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          <h3
            style={{
              margin: '0 0 15px 0',
              color: '#1e3a8a',
              fontSize: '20px',
              fontWeight: 'bold',
              borderBottom: '2px solid #1e3a8a',
              paddingBottom: '8px',
            }}
          >
            📢 ডিজিটাল নোটিশ বোর্ড (Notice Board)
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table className="board-table" style={{ width: '100%', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ width: '15%' }}>প্রকাশের তারিখ</th>
                  <th style={{ width: '15%' }}>ধরণ</th>
                  <th style={{ textAlign: 'left' }}>নোটিশের শিরোনাম</th>
                  <th style={{ width: '15%' }}>অ্যাকশন</th>
                </tr>
              </thead>

              <tbody>
                {notices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: '20px',
                        color: '#64748b',
                        textAlign: 'center',
                      }}
                    >
                      বর্তমানে কোনো অফিশিয়াল নোটিশ প্রকাশিত হয়নি।
                    </td>
                  </tr>
                ) : (
                  notices.map((notice) => (
                    <tr key={notice.id}>
                      <td style={{ fontWeight: 'bold', color: '#475569' }}>
                        📆 {notice.date}
                      </td>
                      <td>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            backgroundColor:
                              notice.category === 'Exam'
                                ? '#fee2e2'
                                : notice.category === 'Admission'
                                  ? '#dcfce7'
                                  : '#e2e8f0',
                            color:
                              notice.category === 'Exam'
                                ? '#b91c1c'
                                : notice.category === 'Admission'
                                  ? '#15803d'
                                  : '#334155',
                          }}
                        >
                          {notice.category}
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: 'left',
                          fontWeight: 'bold',
                          color: '#1e3a8a',
                        }}
                      >
                        {notice.title}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setSelectedNotice(notice)}
                          style={{
                            backgroundColor: '#1e3a8a',
                            color: 'white',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                          }}
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* নোটিশ বিস্তারিত পপ-আপ */}
        {selectedNotice && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                background: '#fff',
                maxWidth: '600px',
                width: '100%',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                borderTop: '6px solid #1e3a8a',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '10px',
                  marginBottom: '15px',
                }}
              >
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  📆 প্রকাশের তারিখ: {selectedNotice.date}
                </span>
                <span style={{ fontSize: '12px', color: '#1e3a8a', fontWeight: 'bold' }}>
                  ক্যাটাগরি: {selectedNotice.category}
                </span>
              </div>

              <h4
                style={{
                  margin: '0 0 15px 0',
                  color: '#1e3a8a',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                }}
              >
                {selectedNotice.title}
              </h4>

              <p
                style={{
                  color: '#334155',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  background: '#f8fafc',
                  padding: '15px',
                  borderRadius: '6px',
                  whiteSpace: 'pre-wrap',
                  minHeight: '100px',
                }}
              >
                {selectedNotice.content}
              </p>

              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  style={{
                    backgroundColor: '#64748b',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  বন্ধ করুন (Close)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}