/**
 * HomePage — welcoming dashboard with greeting, featured sessions,
 * category quick-access tiles, and a next-upcoming-booking card.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SESSIONS, FEATURED_SESSION_IDS } from '../data/mockData';
import SessionCard from '../components/SessionCard';
import CategoryTile from '../components/CategoryTile';
import { Category } from '../types';

const CATEGORIES: Category[] = ['Sauna', 'Cold Plunge', 'Yoga', 'Breathwork'];

// Format greeting based on time of day
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user, bookings } = useApp();

  const featuredSessions = FEATURED_SESSION_IDS
    .map(id => SESSIONS.find(s => s.id === id))
    .filter(Boolean) as typeof SESSIONS;

  // Next upcoming booking (first in list with status upcoming)
  const nextBooking = bookings.find(b => b.status === 'upcoming');

  // Today's sessions (first 4)
  const todaySessions = SESSIONS.slice(0, 4);

  return (
    <div className="page-container pt-0">
      {/* ── Header / hero ────────────────────────────────────── */}
      <div className="relative -mx-4 bg-charcoal overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=320&fit=crop&q=70"
          alt="Anne Wellness"
          className="w-full h-48 object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-charcoal/80" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
          <p className="text-white/75 text-sm">{getGreeting()},</p>
          <h1 className="text-white text-2xl font-bold tracking-tight">{user.firstName} 👋</h1>
        </div>
        {/* Notification bell */}
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* ── Next booking banner ───────────────────────────────── */}
      {nextBooking && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/session/${nextBooking.session.id}`)}
          className="mt-4 bg-sage-lighter border border-sage-light rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-sage-dark font-semibold uppercase tracking-wide">Next booking</p>
            <p className="text-charcoal font-semibold text-sm truncate">{nextBooking.session.name}</p>
            <p className="text-stone text-xs">
              {new Date(`${nextBooking.session.date}T00:00:00`).toLocaleDateString('en-ZA', {
                weekday: 'short', month: 'short', day: 'numeric'
              })} · {nextBooking.session.startTime}
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone flex-shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Explore</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map(cat => (
            <CategoryTile key={cat} category={cat} />
          ))}
        </div>
      </section>

      {/* ── Featured experiences ──────────────────────────────── */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">Featured Experiences</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-sage text-sm font-semibold"
          >
            See all
          </button>
        </div>
        {/* Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {featuredSessions.map(session => (
            <SessionCard key={session.id} session={session} compact />
          ))}
        </div>
      </section>

      {/* ── Coming up this week ───────────────────────────────── */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-heading">This Week</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-sage text-sm font-semibold"
          >
            See all
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {todaySessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </section>

      {/* ── Footer tagline ────────────────────────────────────── */}
      <div className="mt-8 mb-2 text-center">
        <p className="text-stone text-xs">Anne Wellness · Johannesburg · Northern Suburbs</p>
        <p className="text-stone/60 text-xs mt-0.5">Find your calm. Embrace the contrast.</p>
      </div>
    </div>
  );
}
