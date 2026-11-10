'use client';
import React from 'react';

export default function FeeRow({ id, label, checked, onCheckChange, amount, onAmountChange, hasMonth, monthName, onMonthChange, months }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
      <input type="checkbox" id={id} checked={checked} onChange={onCheckChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
      <label htmlFor={id} style={{ width: '180px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{label}</label>
      {hasMonth && (
        <select className="form-control" style={{ width: '110px', padding: '5px' }} disabled={!checked} value={monthName} onChange={onMonthChange}>
          {months.map((m: string) => <option key={m} value={m}>{m}</option>)}
        </select>
      )}
      <input type="text" className="form-control" style={{ flex: 1, padding: '6px' }} disabled={!checked} placeholder={checked ? "টাকার পরিমাণ লিখুন" : "❌ প্রথমে টিক দিন"} value={amount} onChange={(e) => onAmountChange(e.target.value.replace(/[^0-9]/g, ''))} />
    </div>
  );
}
