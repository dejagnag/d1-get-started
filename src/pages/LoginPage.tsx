/**
 * LoginPage — The Luminescent Sanctuary entry point.
 * Gallery White void with Obsidian typography. Electric Cobalt only on submit.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Geometric goose mark — oval body + neck arc + head circle
const GooseMark = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="22" cy="36" rx="18" ry="11" stroke="#1A1A1A" strokeWidth="1.2"/>
    {/* Head */}
    <circle cx="42" cy="12" r="5.5" stroke="#1A1A1A" strokeWidth="1.2"/>
    {/* Neck */}
    <path d="M42 17.5 C40 24 34 30 30 32" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/onboarding', { replace: true });
    }, 600);
  }

  function handleSocialLogin() {
    login();
    navigate('/onboarding', { replace: true });
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col max-w-md mx-auto px-10">

      {/* ── Logo area — generous top space ────────────────────── */}
      <div className="pt-20 pb-16 flex flex-col items-start">
        <GooseMark />
        <h1
          className="mt-8 text-4xl font-bold text-obsidian tracking-[0.06em] uppercase leading-none"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          SAUNA<br />GOOSE
        </h1>
        <p
          className="mt-3 text-[11px] text-obsidian-muted uppercase tracking-[0.2em]"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Johannesburg · Sandton
        </p>
      </div>

      {/* ── Form area ─────────────────────────────────────────── */}
      <div className="flex-1">
        <p
          className="text-[10px] uppercase tracking-[0.18em] text-obsidian-muted mb-8"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {isSignUp ? 'Create access' : 'Enter sanctuary'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          {isSignUp && (
            <div className="flex gap-0 mb-0">
              <input
                type="text"
                placeholder="First name"
                className="input-void flex-1 border-r-0"
                autoComplete="given-name"
              />
              <input
                type="text"
                placeholder="Last name"
                className="input-void flex-1"
                autoComplete="family-name"
              />
            </div>
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`input-void ${isSignUp ? 'border-t-0' : ''}`}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-void border-t-0"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn-confirm flex items-center justify-center gap-2"
            >
              {loading
                ? <span className="inline-block w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                : isSignUp ? 'CREATE ACCOUNT' : 'ENTER'
              }
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[0.5px] bg-void-border" />
          <span
            className="text-[10px] text-obsidian-muted uppercase tracking-[0.14em]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            or
          </span>
          <div className="flex-1 h-[0.5px] bg-void-border" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          <button
            onClick={handleSocialLogin}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-void-border text-obsidian text-xs font-medium tracking-wide active:bg-void-dim transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            onClick={handleSocialLogin}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-void-border text-obsidian text-xs font-medium tracking-wide active:bg-void-dim transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center mt-10 pb-10">
          <button
            onClick={() => setIsSignUp(v => !v)}
            className="text-[11px] text-obsidian-muted underline underline-offset-4 tracking-wide"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {isSignUp ? 'Already a member? Sign in' : 'New to Sauna Goose? Create account'}
          </button>
        </p>
      </div>
    </div>
  );
}
