/**
 * OnboardingPage — asks for the user's first and last name after login.
 * Shown once; name is stored in AppContext and used throughout the app.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setName } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [step, setStep]           = useState<'name' | 'ready'>('name');

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) return;
    setStep('ready');
  }

  function handleStart() {
    setName(firstName.trim(), lastName.trim());
    navigate('/home', { replace: true });
  }

  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-6 max-w-md mx-auto">

      {/* Logo mark */}
      <div className="w-16 h-16 bg-sage rounded-3xl flex items-center justify-center mb-6 shadow-soft">
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <path d="M16 4C10 4 5 9 5 16c0 3.5 1.4 6.7 3.7 9L16 28l7.3-3c2.3-2.3 3.7-5.5 3.7-9 0-7-5-12-11-12z" fill="white" fillOpacity="0.3" />
          <path d="M16 10v12M10 16h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {step === 'name' ? (
        <form onSubmit={handleContinue} className="w-full animate-fade-in">
          <h1 className="text-3xl font-bold text-charcoal tracking-tight text-center mb-2">
            Welcome to<br />Anne Wellness
          </h1>
          <p className="text-stone text-center text-sm mb-10">
            Let's personalise your experience. What should we call you?
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="input-field text-lg"
              autoFocus
              autoComplete="given-name"
            />
            <input
              type="text"
              placeholder="Last name (optional)"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="input-field text-lg"
              autoComplete="family-name"
            />
          </div>

          <button
            type="submit"
            disabled={!firstName.trim()}
            className="btn-primary"
          >
            Continue
          </button>
        </form>
      ) : (
        <div className="w-full text-center animate-slide-up">
          {/* Greeting */}
          <div className="mb-8">
            <p className="text-stone text-sm mb-1">Ready for your journey,</p>
            <h1 className="text-4xl font-bold text-charcoal tracking-tight">
              {firstName} {lastName}
            </h1>
          </div>

          {/* Wellness pillars preview */}
          <div className="grid grid-cols-2 gap-2.5 mb-10">
            {[
              { emoji: '🔥', label: 'Sauna', sub: 'Heat rituals' },
              { emoji: '❄️', label: 'Cold Plunge', sub: 'Cold therapy' },
              { emoji: '🧘', label: 'Yoga', sub: 'Mind & body' },
              { emoji: '🌬️', label: 'Breathwork', sub: 'Breath science' },
            ].map(p => (
              <div key={p.label} className="bg-white rounded-2xl p-4 shadow-soft text-left">
                <span className="text-2xl">{p.emoji}</span>
                <p className="font-semibold text-charcoal text-sm mt-1">{p.label}</p>
                <p className="text-stone text-xs">{p.sub}</p>
              </div>
            ))}
          </div>

          <button onClick={handleStart} className="btn-primary">
            Let's Begin
          </button>
        </div>
      )}
    </div>
  );
}
