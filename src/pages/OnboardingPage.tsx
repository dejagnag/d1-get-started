/**
 * OnboardingPage — name collection in Sauna Goose aesthetic.
 * Void white space, Syne headings, hairline inputs.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Geometric category marks
const GeoSauna = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="10" y1="8" x2="10" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
    <line x1="22" y1="8" x2="22" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
  </svg>
);
const GeoCold = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="5" width="22" height="22" stroke="#1A1A1A" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7" stroke="#1A1A1A" strokeWidth="1"/>
  </svg>
);
const GeoYoga = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 24 Q16 6 26 24" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);
const GeoBreath = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="3"  stroke="#1A1A1A" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7"  stroke="#1A1A1A" strokeWidth="1" opacity="0.65"/>
    <circle cx="16" cy="16" r="11" stroke="#1A1A1A" strokeWidth="1" opacity="0.3"/>
  </svg>
);

const PILLARS = [
  { icon: <GeoSauna />,  label: 'SAUNA',      sub: 'Heat rituals' },
  { icon: <GeoCold />,   label: 'COLD PLUNGE', sub: 'Cold therapy' },
  { icon: <GeoYoga />,   label: 'YOGA',        sub: 'Movement' },
  { icon: <GeoBreath />, label: 'BREATHWORK',  sub: 'Breath science' },
];

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
    <div className="min-h-dvh bg-white flex flex-col px-10 max-w-md mx-auto">

      {step === 'name' ? (
        <form onSubmit={handleContinue} className="flex flex-col pt-20 pb-10 flex-1 animate-fade-in">

          {/* Brand mark */}
          <p className="label-mono mb-16">SAUNA GOOSE</p>

          <h1
            className="text-3xl font-bold text-obsidian tracking-[0.05em] uppercase leading-tight mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            WHAT SHOULD<br />WE CALL YOU?
          </h1>
          <p
            className="text-xs text-obsidian-muted tracking-wide mb-12"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Personalise your sanctuary
          </p>

          <div className="flex flex-col gap-0 mb-12">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="input-void"
              autoFocus
              autoComplete="given-name"
            />
            <input
              type="text"
              placeholder="Last name (optional)"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="input-void border-t-0"
              autoComplete="family-name"
            />
          </div>

          <button
            type="submit"
            disabled={!firstName.trim()}
            className="btn-confirm"
          >
            CONTINUE
          </button>
        </form>

      ) : (
        <div className="flex flex-col pt-20 pb-10 flex-1 animate-slide-up">

          <p className="label-mono mb-12">WELCOME TO THE SANCTUARY</p>

          <h1
            className="text-4xl font-bold text-obsidian tracking-[0.04em] uppercase leading-tight mb-16"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {firstName}<br />{lastName || ''}
          </h1>

          {/* Geometric pillars grid */}
          <div className="grid grid-cols-2 gap-[1px] border border-void-border mb-12">
            {PILLARS.map(p => (
              <div
                key={p.label}
                className="p-6 border-void-border flex flex-col gap-3 odd:border-r border-b last:border-b-0 [&:nth-child(n+3)]:border-b-0"
                style={{ borderRight: '0.5px solid #E0E0E0', borderBottom: '0.5px solid #E0E0E0' }}
              >
                {p.icon}
                <div>
                  <p
                    className="text-[11px] font-bold text-obsidian tracking-[0.1em] uppercase"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="text-[10px] text-obsidian-muted mt-0.5"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {p.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleStart} className="btn-confirm">
            ENTER SANCTUARY
          </button>
        </div>
      )}
    </div>
  );
}
