'use client';

export async function loginUser(username: string, password: string, setIsLoggedIn: any, setUserRole: any, setActiveTab: any, setError: any) {
  const cleanUser = username.trim().toLowerCase();
  if (cleanUser === 'headmaster' && password === 'admin123') {
    setIsLoggedIn(true); setUserRole('HEADMASTER'); setActiveTab('teacher-approval'); return;
  }
  if (cleanUser === 'clerk' && password === 'clerk123') {
    setIsLoggedIn(true); setUserRole('CLERK'); setActiveTab('admission'); return;
  }
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: cleanUser, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'লগইন ব্যর্থ হয়েছে');
    setIsLoggedIn(true); setUserRole(data.role); setActiveTab('result');
  } catch (err: any) {
    setError(err.message);
  }
}

export async function registerUser(fullName: string, username: string, password: string, phone: string, setError: any, setSuccessMsg: any, setIsRegisterMode: any, setFullName: any, setUsername: any, setPassword: any, setPhone: any) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullName, username, password, phone })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'নিবন্ধন করা যায়নি');
    setSuccessMsg('🎉 নিবন্ধন সফল! প্রধান শিক্ষক অনুমোদন করার পর আপনি লগইন করতে পারবেন।');
    setIsRegisterMode(false); setFullName(''); setUsername(''); setPassword(''); setPhone('');
  } catch (err: any) {
    setError(err.message);
  }
}
