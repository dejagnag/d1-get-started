/**
 * HomePage — The Welcome Sanctuary.
 * Architectural white space, Syne headings, geometric category access.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SESSIONS, FEATURED_SESSION_IDS } from '../data/mockData';
import { Category } from '../types';

const CATEGORIES: Category[] = ['Sauna', 'Cold Plunge', 'Yoga', 'Breathwork'];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'GOOD MORNING';
  if (h < 17) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

// Geometric icons (same as onboarding)
const GeoSauna = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <line x1="10" y1="8" x2="10" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
    <line x1="22" y1="8" x2="22" y2="24" stroke="#1A1A1A" strokeWidth="1"/>
  </svg>
);
const GeoCold = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="5" width="22" height="22" stroke="#1A1A1A" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7" stroke="#1A1A1A" strokeWidth="1"/>
  </svg>
);
const GeoYoga = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M6 24 Q16 6 26 24" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const GeoBreath = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="3"  stroke="#1A1A1A" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7"  stroke="#1A1A1A" strokeWidth="1" opacity="0.6"/>
    <circle cx="16" cy="16" r="11" stroke="#1A1A1A" strokeWidth="1" opacity="0.28"/>
  </svg>
);

const GEO_ICONS: Record<Category, React.ReactNode> = {
  Sauna:        <GeoSauna />,
  'Cold Plunge': <GeoCold />,
  Yoga:          <GeoYoga />,
  Breathwork:    <GeoBreath />,
};

const CATEGORY_SUBS: Record<Category, string> = {
  Sauna:        'Heat rituals',
  'Cold Plunge': 'Cold therapy',
  Yoga:          'Movement',
  Breathwork:    'Breath science',
};

export default function HomePage() {
  const navigate = useNavigate();
  const { user, bookings } = useApp();

  const featuredSessions = FEATURED_SESSION_IDS
    .map(id => SESSIONS.find(s => s.id === id))
    .filter(Boolean) as typeof SESSIONS;

  const nextBooking = bookings.find(b => b.status === 'upcoming');

  return (
    <div className="page-void">

      {/* ── Greeting ─────────────────────────────────────────── */}
      <div className="mb-16">
        <p
          className="text-[10px] text-obsidian-muted uppercase tracking-[0.2em] mb-3"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {getGreeting()}
        </p>
        <h1
          className="text-4xl font-bold text-obsidian tracking-[0.04em] uppercase leading-none"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {user.firstName}
        </h1>
        <p
          className="mt-3 text-sm text-obsidian-muted leading-relaxed max-w-[240px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Transcending stillness — your sanctuary awaits.
        </p>
      </div>

      {/* ── Next booking banner ───────────────────────────────── */}
      {nextBooking && (
        <button
          onClick={() => navigate(`/session/${nextBooking.session.id}`)}
          className="w-full mb-14 text-left border border-void-border p-5 flex items-start justify-between gap-4 active:bg-void-dim transition-colors"
        >
          <div>
            <p className="label-mono mb-2">NEXT SESSION</p>
            <p className="font-semibold text-obsidian text-sm"
               style={{ fontFamily: 'Syne, sans-serif' }}>
              {nextBooking.session.name}
            </p>
            <p
              className="text-[11px] text-obsidian-muted mt-1"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {new Date(`${nextBooking.session.date}T00:00:00`).toLocaleDateString('en-ZA', {
                weekday: 'short', month: 'short', day: 'numeric'
              })} · {nextBooking.session.startTime}
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" className="flex-shrink-0 mt-1">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* ── Gallery of Shapes — category access ──────────────── */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xs font-bold text-obsidian uppercase tracking-[0.12em]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            EXPLORE
          </h2>
          <button
            onClick={() => navigate('/browse')}
            className="label-mono underline underline-offset-4"
          >
            Browse all
          </button>
        </div>

        {/* 2×2 grid with hairline borders */}
        <div
          className="grid grid-cols-2 border border-void-border"
          style={{ borderWidth: '0.5px' }}
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => navigate(`/browse?category=${encodeURIComponent(cat)}`)}
              className="p-6 flex flex-col gap-4 text-left active:bg-void-dim transition-colors"
              style={{
                borderRight:  i % 2 === 0 ? '0.5px solid #E0E0E0' : undefined,
                borderBottom: i < 2       ? '0.5px solid #E0E0E0' : undefined,
              }}
            >
              {GEO_ICONS[cat]}
              <div>
                <p
                  className="text-[11px] font-bold text-obsidian uppercase tracking-[0.1em]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {cat}
                </p>
                <p
                  className="text-[10px] text-obsidian-muted mt-0.5"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {CATEGORY_SUBS[cat]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured experiences ──────────────────────────────── */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xs font-bold text-obsidian uppercase tracking-[0.12em]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            FEATURED
          </h2>
          <button
            onClick={() => navigate('/browse')}
            className="label-mono underline underline-offset-4"
          >
            See all
          </button>
        </div>

        <div className="flex flex-col gap-[0.5px] border border-void-border overflow-hidden"
             style={{ borderWidth: '0.5px' }}>
          {featuredSessions.map((session, i) => (
            <button
              key={session.id}
              onClick={() => navigate(`/session/${session.id}`)}
              className="flex items-start gap-5 p-5 text-left bg-white active:bg-void-dim transition-colors"
              style={{ borderBottom: i < featuredSessions.length - 1 ? '0.5px solid #E0E0E0' : undefined }}
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-void-subtle">
                <img
                  src={`${session.heroImage}&w=112&h=112&q=60`}
                  alt={session.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="label-mono mb-1">{session.category}</p>
                <p
                  className="text-sm font-semibold text-obsidian leading-snug"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {session.name}
                </p>
                <p
                  className="text-[11px] text-obsidian-muted mt-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {session.startTime} · {session.durationMinutes}min · R{session.priceZAR}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BEBEBE" strokeWidth="1.5" className="flex-shrink-0 mt-1">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div className="pt-6 border-t border-void-border" style={{ borderTopWidth: '0.5px' }}>
        <p className="label-mono">Sauna Goose · Johannesburg</p>
        <p className="text-[10px] text-obsidian-muted/50 mt-1"
           style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Transcending Stillness
        </p>
      </div>
    </div>
  );
}
