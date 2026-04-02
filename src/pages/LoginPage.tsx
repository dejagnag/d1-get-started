/**
 * LoginPage — polished sign-in / sign-up screen.
 * No real authentication; any input proceeds to the home screen.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Google icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// Apple icon SVG
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
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
    // Simulate a brief loading state, then log in
    setTimeout(() => {
      login();
      navigate('/home', { replace: true });
    }, 700);
  }

  function handleSocialLogin() {
    login();
    navigate('/home', { replace: true });
  }

  return (
    <div className="min-h-dvh bg-cream flex flex-col max-w-md mx-auto">
      {/* Background texture */}
      <div className="absolute inset-0 texture-overlay pointer-events-none" />

      {/* Hero image top section */}
      <div className="relative h-56 bg-charcoal overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop&q=70"
          alt="Sauna interior"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 to-charcoal/70" />

        {/* Logo & wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Leaf / brand mark */}
          <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 border border-white/25">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4C10 4 5 9 5 16c0 3.5 1.4 6.7 3.7 9L16 28l7.3-3c2.3-2.3 3.7-5.5 3.7-9 0-7-5-12-11-12z" fill="#B8CEB0" />
              <path d="M16 10v12M10 16h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">Anne Wellness</h1>
          <p className="text-white/70 text-sm mt-1 tracking-wide">Johannesburg · Sandton</p>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 bg-cream rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-8 pb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-1">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h2>
        <p className="text-stone text-sm mb-7">
          {isSignUp
            ? 'Start your wellness journey today.'
            : 'Sign in to manage your bookings.'}
        </p>

        {/* Email / password form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                className="input-field"
                autoComplete="given-name"
              />
              <input
                type="text"
                placeholder="Last name"
                className="input-field"
                autoComplete="family-name"
              />
            </div>
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            autoComplete="email"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field pr-12"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>

          {!isSignUp && (
            <button type="button" className="text-right text-sage text-sm font-medium -mt-2">
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-1 flex items-center justify-center gap-2"
          >
            {loading
              ? <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : isSignUp ? 'Create Account' : 'Sign In'
            }
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-stone-lighter" />
          <span className="text-stone text-xs font-medium">or continue with</span>
          <div className="flex-1 h-px bg-stone-lighter" />
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSocialLogin}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-stone-light bg-white text-charcoal font-semibold text-sm active:scale-95 transition-transform shadow-soft"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            onClick={handleSocialLogin}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-stone-light bg-white text-charcoal font-semibold text-sm active:scale-95 transition-transform shadow-soft"
          >
            <AppleIcon />
            Apple
          </button>
        </div>

        {/* Toggle sign-in / sign-up */}
        <p className="text-center text-stone text-sm mt-8">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(v => !v)}
            className="text-sage font-semibold"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
}
