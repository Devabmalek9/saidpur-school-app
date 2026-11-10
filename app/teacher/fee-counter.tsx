'use client';
import React, { useState, useEffect } from 'react';
import ReceiptView from './fee-receipt';

export default function FeeCounter({ userRole }: any) {
  const [feeStudentId, setFeeStudentId] = useState('');
  const [feeStudentName, setFeeStudentName] = useState('');
  const [feeClass, setFeeClass] = useState('দশম');
  const [startMonth, setStartMonth] = useState('জানুয়ারি');
  const [endMonth, setEndMonth] = useState('জানুয়ারি');
  
  const [tuitionFee, setTuitionFee] = useState('0');
  const [admissionFee, setAdmissionFee] = useState('0');
  const [sessionFee, setSessionFee] = useState('0');
  const [developmentFee, setDevelopmentFee] = useState('0');
  const [sportsFee, setSportsFee] = useState('0');
  const [othersFee, setOthersFee] = useState('0');

  const [feeLogs, setFeeLogs] = useState<any[]>([]);
  const [liveReceipt, setLiveReceipt] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFeeCollections = async () => {
    try {
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'FETCH_FEE_LOGS' })
      });
      const data = await res.json();
      setFeeLogs(Array.isArray(data?.feeCollections) ? data.feeCollections : []);
    } catch (err) { setFeeLogs([]); }
  };

  useEffect(() => { fetchFeeCollections(); }, []);
  const onFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const t = parseFloat(tuitionFee) || 0;
    const a = parseFloat(admissionFee) || 0;
    const s = parseFloat(sessionFee) || 0;
    const d = parseFloat(developmentFee) || 0;
    const sp = parseFloat(sportsFee) || 0;
    const o = parseFloat(othersFee) || 0;
    const grandTotal = t + a + s + d + sp + o;

    if (grandTotal <= 0) return alert('⚠️ অনুগ্রহ করে কমপক্ষে যেকোনো একটি ফির পরিমাণ ইনপুট দিন।');

    // 🎯 ইউনিক রসিদ নং জেনারেটর ইঞ্জিন
    const timestamp = Date.now().toString().slice(-4);
    const receiptNo = `R-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}-${timestamp}`;

    const payload = {
      action: 'COLLECT_FEE',
      studentId: feeStudentId,
      studentName: feeStudentName || 'নিয়মিত শিক্ষার্থী',
      class: feeClass,
      feeType: 'MULTIPLE_FEES',
      amount: grandTotal,
      monthName: `${startMonth} থেকে ${endMonth}`,
      date: today,
      collectedBy: userRole || 'HEADMASTER',
      receiptNo: receiptNo, // ইউনিক রসিদ নম্বর
      breakdown: { tuition: t, admission: a, session: s, dev: d, sports: sp, others: o }
    };

    setLoading(true);
    try {
      const res = await fetch('/api/admin-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message);
        setLiveReceipt(payload);
        setFeeStudentId(''); setFeeStudentName('');
        setTuitionFee('0'); setAdmissionFee('0'); setSessionFee('0');
        setDevelopmentFee('0'); setSportsFee('0'); setOthersFee('0');
        fetchFeeCollections();
      }
    } catch (err) { alert('সার্ভার কানেকশন এরর!'); }
    finally { setLoading(false); }
  };
  // লাইভ মোট টাকা গণনাকারী ড্রাইভার
  const liveTotal = (parseFloat(tuitionFee)||0) + (parseFloat(admissionFee)||0) + (parseFloat(sessionFee)||0) + (parseFloat(developmentFee)||0) + (parseFloat(sportsFee)||0) + (parseFloat(othersFee)||0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '25px', width: '100%' }}>
      
      <div style={{ background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ color: '#059669', margin: '0 0 15px 0', fontSize: '15px', fontWeight: 'bold' }}>💰  বিদ্যালয় মাল্টি-ফি ও ক্যাশ কাউন্টার</h4>
        <form onSubmit={onFeeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" className="form-control" style={{fontWeight:'bold'}} required placeholder="আইডি (যেমন: 1001/701)" value={feeStudentId} onChange={(e) => setFeeStudentId(e.target.value)} />
            <input type="text" className="form-control" required placeholder="শিক্ষার্থীর নাম" value={feeStudentName} onChange={(e) => setFeeStudentName(e.target.value)} />
          </div>
          
          <select className="form-control" value={feeClass} onChange={(e) => setFeeClass(e.target.value)}>
            <option value="ষষ্ঠ">ষষ্ঠ শ্রেণী</option><option value="সপ্তম">সপ্তম শ্রেণী</option><option value="অষ্টম">অষ্টম শ্রেণী</option><option value="নবম">নবম শ্রেণী</option><option value="দশম">দশম শ্রেণী</option>
          </select>
          
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '5px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e3a8a' }}>💸 মাসিক বেতন ও মাসের ব্যাপ্তি:</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <input type="number" className="form-control" placeholder="0" value={tuitionFee} onChange={(e) => setTuitionFee(e.target.value)} />
              <select className="form-control" style={{fontSize:'12px'}} value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>{['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'].map(m => <option key={m} value={m}>{m}</option>)}</select>
              <select className="form-control" style={{fontSize:'12px'}} value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>{['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'].map(m => <option key={m} value={m}>{m}</option>)}</select>
            </div>
          </div>

          <div><label style={{ fontSize: '12px', fontWeight: 'bold', color:'#475569' }}>🎟️ ভর্তি ফি:</label><input type="number" className="form-control" value={admissionFee} onChange={(e) => setAdmissionFee(e.target.value)} /></div>
          <div><label style={{ fontSize: '12px', fontWeight: 'bold', color:'#475569' }}>📜 সেশন ফি:</label><input type="number" className="form-control" value={sessionFee} onChange={(e) => setSessionFee(e.target.value)} /></div>
          <div><label style={{ fontSize: '12px', fontWeight: 'bold', color:'#475569' }}>🏗️ উন্নয়ন ফি:</label><input type="number" className="form-control" value={developmentFee} onChange={(e) => setDevelopmentFee(e.target.value)} /></div>
          <div><label style={{ fontSize: '12px', fontWeight: 'bold', color:'#475569' }}>⚽ খেলাধুলা ফি:</label><input type="number" className="form-control" value={sportsFee} onChange={(e) => setSportsFee(e.target.value)} /></div>
          <div><label style={{ fontSize: '12px', fontWeight: 'bold', color:'#475569' }}>🌀 অন্যান্য ফি:</label><input type="number" className="form-control" value={othersFee} onChange={(e) => setOthersFee(e.target.value)} /></div>

          {/* 🎯 লাইভ মোট টাকা গণনাকারী উইন্ডো */}
          <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '6px', border: '1px solid #fee2e2', marginTop: '5px', textAlign: 'right' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b' }}>💵 ফরমে লাইভ সর্বমোট টাকা: </span>
            <strong style={{ fontSize: '18px', fontWeight: '900', color: '#dc2626' }}>{liveTotal} ৳</strong>
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: '#059669', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'ডাটাবেজে সংরক্ষিত হচ্ছে...' : '💰  সমন্বিত রসিদ জেনারেট করুন'}
          </button>
        </form>
      </div>
      <ReceiptView liveReceipt={liveReceipt} />

      <div style={{ gridColumn: '1 / -1', background: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '10px' }}>
        <h4 style={{ color: '#dc2626', margin: '0 0 15px 0', fontSize: '15px', fontWeight: 'bold' }}>🗑️  আজকের আদায়কৃত ফি লগ (ভুল এন্ট্রি মুছুন)</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead><tr style={{ background: '#f1f5f9' }}><th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>শিক্ষার্থী আইডি</th><th style={{ border: '1px solid #cbd5e1' }}>নাম</th><th style={{ border: '1px solid #cbd5e1' }}>মোট টাকা</th><th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>অ্যাকশন নিয়ন্ত্রণ</th></tr></thead>
            <tbody>
              {feeLogs.length === 0 ? <tr><td colSpan={4} style={{ padding: '15px', textAlign: 'center', color:'#64748b', fontWeight:'bold' }}>কোনো ফি ট্রানজেকশন রেকর্ড পাওয়া যায়নি।</td></tr> : feeLogs.map((log: any) => (
                <tr key={log.id} style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color:'#1e3a8a' }}>{log.studentId}</td>
                  <td>{log.studentName}</td>
                  <td style={{ fontWeight: 'bold', color:'#059669' }}>{log.amount} ৳</td>
                  <td style={{ padding: '10px' }}>
                    {userRole === 'HEADMASTER' ? (
                      <button onClick={async () => { 
                        if(window.confirm('⚠️ আপনি কি নিশ্চিতভাবে এই ফি আদায় এন্ট্রিটি ডাটাবেজ থেকে চিরতরে মুছে ফেলতে চান?')){ 
                          const res = await fetch('/api/admin-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'DELETE_FEE_LOG', id: log.id }) });
                          const data = await res.json();
                          if(res.ok && data.success) { alert(data.message); fetchFeeCollections(); }
                        } 
                      }} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>🗑️  চিরতরে মুছুন</button>
                    ) : (
                      <span style={{color:'#94a3b8', fontSize:'12px', fontStyle:'italic'}}>🔒 ডিলিট লকড (শুধুমাত্র প্রধান শিক্ষক)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
