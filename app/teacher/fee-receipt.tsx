'use client';
import React from 'react';

interface ReceiptViewProps {
  liveReceipt: any;
}

export default function ReceiptView({ liveReceipt }: ReceiptViewProps) {
  
  const handlePureBypassPrint = () => {
    const printContent = document.getElementById('printable-receipt-area');
    if (!printContent) return alert('⚠️ প্রিন্ট করার মতো কোনো রসিদ জেনারেট হয়নি!');

    const pWin = window.open('', '', 'width=550,height=650,left=150,top=100');
    if (!pWin) return alert('⚠️ পপ-আপ ব্লকার বন্ধ করুন!');

    pWin.document.write('<!DOCTYPE html><html><head><title>আদায় রসিদ</title>');
    pWin.document.write(`
      <style>
        @page { size: auto; margin: 0; }
        html, body { background: #ffffff !important; margin: 0 !important; padding: 0 !important; width: 100% !important; height: auto !important; font-family: 'Arial', sans-serif; -webkit-print-color-adjust: exact; }
        .receipt-isolated-wrapper { display: block !important; width: 440px !important; border: 3px double #1e3a8a !important; padding: 25px !important; margin: 30px auto !important; background: #ffffff !important; box-sizing: border-box !important; border-radius: 8px !important; }
        table { width: 100%; font-size: 13px; border-collapse: collapse; margin-top: 12px; }
        tr { border-bottom: 1px dashed #cbd5e1; }
        td { padding: 6px 0; color: #000000; }
        th { text-align: left; padding: 6px 0; border-bottom: 2px solid #1e3a8a; font-weight: bold; color: #1e3a8a; }
      </style>
    `);
    pWin.document.write('</head><body><div class="receipt-isolated-wrapper">');
    pWin.document.write(printContent.innerHTML);
    pWin.document.write('</div></body></html>');
    pWin.document.close();

    setTimeout(function() { pWin.focus(); pWin.print(); pWin.close(); }, 300);
  };
  return (
    <div style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '2px dashed #059669', boxSizing: 'border-box' }}>
      <h4 style={{ color: '#1e3a8a', margin: '0 0 15px 0', fontSize: '15px', fontWeight: 'bold' }}>📄  অফিশিয়াল আদায় রসিদ (Itemized Receipt)</h4>
      
      {liveReceipt ? (
        <div>
          <div id="printable-receipt-area" style={{ color: '#000000' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #1e3a8a', paddingBottom: '8px', marginBottom: '12px' }}>
              <strong style={{ fontSize: '19px', color: '#1e3a8a', letterSpacing: '0.5px' }}>সৈয়দপুর মুসলিম উচ্চ বিদ্যালয়</strong><br />
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>সৈয়দপুর, নীলফামারী | অফিশিয়াল আদায় রসিদ (কাউন্টার কপি)</span>
            </div>

            {/* 🎯 ইউনিক রাজকীয় রসিদ নম্বর ট্যাগ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', marginBottom: '10px', border: '1px solid #e2e8f0', fontSize: '12.5px' }}>
              <span style={{ fontWeight: 'bold', color: '#0f172a' }}>🧾 রসিদ নং: <span style={{ color: '#b45309', fontFamily: 'monospace' }}>{liveReceipt.receiptNo}</span></span>
              <span style={{ color: '#64748b' }}>📅 {liveReceipt.date}</span>
            </div>

            <div style={{ fontSize: '13px', padding: '2px 4px' }}>
              <strong>শিক্ষার্থী আইডি:</strong> <span style={{fontFamily:'monospace', fontWeight:'bold'}}>{liveReceipt.studentId}</span> <br />
              <strong>নাম:</strong> {liveReceipt.studentName} | <strong>শ্রেণী:</strong> {liveReceipt.class} <br />
            </div>
            
            <table style={{ width: '100%', fontSize: '12.5px', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1e3a8a', fontWeight: 'bold', color: '#1e3a8a' }}>
                  <td style={{ padding: '6px 0' }}>ফির বিবরণ (Fee Item)</td>
                  <td style={{ textAlign: 'right', padding: '6px 0' }}>পরিমাণ (৳)</td>
                </tr>
              </thead>
              <tbody>
                {liveReceipt.breakdown?.tuition > 0 && <tr><td style={{ padding: '5px 0' }}>মাসিক বেতন ({liveReceipt.monthName})</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.tuition} ৳</td></tr>}
                {liveReceipt.breakdown?.admission > 0 && <tr><td style={{ padding: '5px 0' }}>ভর্তি ফি</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.admission} ৳</td></tr>}
                {liveReceipt.breakdown?.session > 0 && <tr><td style={{ padding: '5px 0' }}>সেশন ফি</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.session} ৳</td></tr>}
                {liveReceipt.breakdown?.dev > 0 && <tr><td style={{ padding: '5px 0' }}>উন্নয়ন ফি</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.dev} ৳</td></tr>}
                {liveReceipt.breakdown?.sports > 0 && <tr><td style={{ padding: '5px 0' }}>খেলাধুলা ফি</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.sports} ৳</td></tr>}
                {liveReceipt.breakdown?.others > 0 && <tr><td style={{ padding: '5px 0' }}>অন্যান্য ফি</td><td style={{ textAlign: 'right' }}>{liveReceipt.breakdown.others} ৳</td></tr>}
                <tr style={{ fontWeight: '900', borderTop: '2px double #1e3a8a', fontSize: '14.5px', color: '#1e3a8a' }}>
                  <td style={{ padding: '8px 0' }}>সর্বমোট পরিশোধিত (Total):</td>
                  <td style={{ textAlign: 'right', padding: '8px 0' }}>{liveReceipt.amount} ৳</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginTop: '15px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>* আদায়কারী: {liveReceipt.collectedBy} (সিস্টেম জেনারেটেড রসিদ কপি)</p>
          </div>
          
          <button onClick={handlePureBypassPrint} style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '11px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)' }}>🖨️  অফিশিয়াল রসিদ প্রিন্ট করুন</button>
        </div>
      ) : <p style={{ color: '#64748b', textAlign: 'center', marginTop: '50px' }}>ফি আদায় করার পর এখানে আইটেমাইজড প্রিন্ট রসিদ জেনারেট হবে।</p>}
    </div>
  );
}
