/**
 * SessionDetailPage — Precision Grid booking.
 * Clean photo hero, obsidian metadata in JetBrains Mono, cobalt confirm CTA.
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SESSIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-ZA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addBooking, isBooked } = useApp();
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState(false);

  const session = SESSIONS.find(s => s.id === id);

  if (!session) {
    return (
      <div className="page-void flex flex-col items-center justify-center text-center">
        <p className="label-mono mb-4">SESSION NOT FOUND</p>
        <button onClick={() => navigate('/browse')} className="btn-ghost-dark"
          style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          BACK TO BROWSE
        </button>
      </div>
    );
  }

  const alreadyBooked = isBooked(session.id) || booked;
  const spotsUrgent = session.spotsRemaining <= 2;
  const spotsMid = session.spotsRemaining <= 5 && !spotsUrgent;

  function handleBook() {
    if (alreadyBooked) return;
    setBooking(true);
    setTimeout(() => {
      addBooking(session!);
      setBooked(true);
      setBooking(false);
    }, 700);
  }

  return (
    <div className="page-void-full animate-fade-in">

      {/* ── Hero image ────────────────────────────────────────── */}
      <div className="relative h-72 bg-void-subtle overflow-hidden">
        <img
          src={`${session.heroImage}&w=800&h=580&q=75`}
          alt={session.name}
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-8 h-8 bg-white/90 flex items-center justify-center"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Price — bottom-right sharp chip */}
        <div className="absolute bottom-6 right-6 bg-white px-4 py-2">
          <span
            className="text-[9px] text-obsidian-muted uppercase tracking-[0.14em] block"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            per person
          </span>
          <span
            className="text-obsidian text-xl font-bold leading-none"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            R{session.priceZAR}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-4">

        <p className="label-mono mb-3">{session.category}</p>

        <h1
          className="text-2xl font-bold text-obsidian tracking-[0.04em] uppercase leading-tight mb-6"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {session.name}
        </h1>

        {/* Precision metadata grid */}
        <div
          className="grid grid-cols-2 border border-void-border mb-8"
          style={{ borderWidth: '0.5px' }}
        >
          {[
            { label: 'DATE', value: new Date(`${session.date}T00:00:00`).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }) },
            { label: 'TIME', value: `${session.startTime} — ${session.endTime}` },
            { label: 'DURATION', value: `${session.durationMinutes} min` },
            {
              label: 'SPOTS',
              value: `${session.spotsRemaining} / ${session.spotsTotal}`,
              urgent: spotsUrgent,
              mid: spotsMid,
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-4"
              style={{
                borderRight:  i % 2 === 0 ? '0.5px solid #E0E0E0' : undefined,
                borderBottom: i < 2       ? '0.5px solid #E0E0E0' : undefined,
              }}
            >
              <p className="label-mono mb-1">{item.label}</p>
              <p
                className={`text-xs font-medium ${
                  (item as any).urgent ? 'text-red-500'
                  : (item as any).mid ? 'text-amber-600'
                  : 'text-obsidian'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <p
            className="text-[10px] uppercase tracking-[0.14em] text-obsidian font-bold mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ABOUT
          </p>
          <p className="text-sm text-obsidian-muted leading-relaxed"
             style={{ fontFamily: 'Inter, sans-serif' }}>
            {session.description}
          </p>
        </div>

        <div className="hairline" />

        {/* Instructor */}
        <div className="mb-8">
          <p
            className="text-[10px] uppercase tracking-[0.14em] text-obsidian font-bold mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            YOUR GUIDE
          </p>
          <div className="flex gap-4 items-start">
            <img
              src={session.instructor.avatar}
              alt={session.instructor.name}
              className="w-12 h-12 object-cover flex-shrink-0 bg-void-subtle"
            />
            <div>
              <p
                className="text-sm font-semibold text-obsidian"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {session.instructor.name}
              </p>
              <p
                className="text-[10px] text-obsidian-muted mb-2"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {session.instructor.role}
              </p>
              <p className="text-sm text-obsidian-muted leading-relaxed"
                 style={{ fontFamily: 'Inter, sans-serif' }}>
                {session.instructor.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="hairline" />

        {/* What to bring */}
        <div className="mb-8">
          <p
            className="text-[10px] uppercase tracking-[0.14em] text-obsidian font-bold mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            WHAT TO BRING
          </p>
          <div className="flex flex-col gap-3">
            {session.whatToBring.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-obsidian-muted flex-shrink-0" />
                <span className="text-sm text-obsidian-muted"
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline" />

        {/* Cancellation policy */}
        <div className="mb-8 border border-void-border p-5" style={{ borderWidth: '0.5px' }}>
          <p className="label-mono mb-2">CANCELLATION POLICY</p>
          <p className="text-xs text-obsidian-muted leading-relaxed"
             style={{ fontFamily: 'Inter, sans-serif' }}>
            Free cancellation up to 24 hours before the session. Cancellations within 24 hours are non-refundable. Late arrivals (more than 10 minutes) may not be admitted.
          </p>
        </div>
      </div>

      {/* ── Sticky booking footer ─────────────────────────────── */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-void-border px-8 py-5 safe-bottom"
           style={{ borderTopWidth: '0.5px' }}>
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="label-mono mb-1">SESSION PRICE</p>
            <p
              className="text-2xl font-bold text-obsidian"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              R{session.priceZAR}
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-[10px] text-obsidian-muted"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {session.durationMinutes} min
            </p>
            <p
              className={`text-[10px] ${spotsUrgent ? 'text-red-500' : 'text-obsidian-muted'}`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {session.spotsRemaining} spots left
            </p>
          </div>
        </div>

        {alreadyBooked ? (
          <div className="w-full py-4 rounded-full bg-void-dim border border-void-border text-obsidian-muted text-xs font-bold uppercase tracking-[0.1em] text-center flex items-center justify-center gap-2"
               style={{ fontFamily: 'Syne, sans-serif' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            CONFIRMED
          </div>
        ) : (
          <button
            onClick={handleBook}
            disabled={booking || session.spotsRemaining === 0}
            className="btn-confirm flex items-center justify-center gap-2"
          >
            {booking
              ? <span className="inline-block w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
              : session.spotsRemaining === 0
                ? 'SOLD OUT'
                : 'CONFIRM BOOKING'
            }
          </button>
        )}
      </div>
    </div>
  );
}
