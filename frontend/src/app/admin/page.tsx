'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred connecting to the server.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top left, #111, #000)', color: '#fff', fontFamily: 'Geist, sans-serif' }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'rgba(52, 211, 153, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(251, 146, 60, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
      
      <form onSubmit={handleLogin} style={{ 
        background: 'rgba(20, 20, 20, 0.6)', 
        backdropFilter: 'blur(20px)',
        padding: '3.5rem', 
        borderRadius: '32px', 
        width: '100%', 
        maxWidth: '440px', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', background: 'rgba(240, 92, 70, 0.12)', filter: 'blur(30px)', borderRadius: '50%' }}></div>
          <div style={{ fontSize: '3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.05rem', letterSpacing: '-0.04em', position: 'relative', zIndex: 1 }}>
            <span style={{ color: '#34d399' }}>J</span><span style={{ color: '#F05C46' }}>ade</span>
          </div>
        </div>
        
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Welcome Back
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
          Please enter your credentials to continue
        </p>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.8rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} 
            placeholder="admin"
            required 
          />
        </div>
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} 
            placeholder="••••••••"
            required 
          />
        </div>
        
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '1.1rem', 
            background: '#F05C46', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '14px', 
            fontWeight: 700, 
            fontSize: '1rem', 
            cursor: 'pointer', 
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 14px rgba(240, 92, 70, 0.3)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#e04b35';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 92, 70, 0.5)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#F05C46';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(240, 92, 70, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
          }}
        >
          Sign In
        </button>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to website
          </Link>
        </div>
      </form>
    </div>
  );
}
