/**
 * SessionDetailPage — full detail view for a single session.
 * Shows hero image, description, instructor bio, what to bring, and booking CTA.
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SESSIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import CategoryBadge from '../components/CategoryBadge';

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function spotsColor(remaining: number): string {
  if (remaining <= 2) return 'text-red-500';
  if (remaining <= 5) return 'text-amber-600';
  return 'text-sage-dark';
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
      <div className="page-container flex flex-col items-center justify-center min-h-dvh text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h2 className="text-xl font-bold text-charcoal">Session not found</h2>
        <button onClick={() => navigate('/browse')} className="mt-6 btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
          Back to Browse
        </button>
      </div>
    );
  }

  const alreadyBooked = isBooked(session.id) || booked;

  function handleBook() {
    if (alreadyBooked) return;
    setBooking(true);
    setTimeout(() => {
      addBooking(session!);
      setBooked(true);
      setBooking(false);
    }, 800);
  }

  return (
    <div className="page-container-full animate-fade-in">
      {/* ── Hero image ────────────────────────────────────────── */}
      <div className="relative h-72 bg-stone-lighter overflow-hidden">
        <img
          src={`${session.heroImage}&w=800&h=580&q=75`}
          alt={session.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          aria-label="Go back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Category badge over hero */}
        <div className="absolute bottom-4 left-4">
          <CategoryBadge category={session.category} size="md" />
        </div>

        {/* Price chip */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex flex-col items-end">
          <span className="text-[10px] text-stone uppercase font-semibold tracking-wider">per person</span>
          <span className="text-charcoal font-bold text-xl leading-none">R{session.priceZAR}</span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-6">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">{session.name}</h1>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center gap-1.5 bg-stone-lighter px-3 py-1.5 rounded-full">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs font-medium text-stone">{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-lighter px-3 py-1.5 rounded-full">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-medium text-stone">{session.startTime} – {session.endTime}</span>
          </div>
          <div className={`flex items-center gap-1.5 bg-stone-lighter px-3 py-1.5 rounded-full`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className={`text-xs font-medium ${spotsColor(session.spotsRemaining)}`}>
              {session.spotsRemaining} of {session.spotsTotal} spots left
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h2 className="section-heading mb-2">About this session</h2>
          <p className="text-stone text-[15px] leading-relaxed">{session.description}</p>
        </div>

        <div className="divider" />

        {/* Instructor */}
        <div>
          <h2 className="section-heading mb-3">Your guide</h2>
          <div className="flex gap-4 items-start">
            <img
              src={session.instructor.avatar}
              alt={session.instructor.name}
              className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 bg-stone-lighter"
            />
            <div>
              <p className="font-semibold text-charcoal">{session.instructor.name}</p>
              <p className="text-sage-dark text-sm font-medium mb-1.5">{session.instructor.role}</p>
              <p className="text-stone text-sm leading-relaxed">{session.instructor.bio}</p>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* What to bring */}
        <div>
          <h2 className="section-heading mb-3">What to bring</h2>
          <ul className="flex flex-col gap-2">
            {session.whatToBring.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-stone">
                <span className="w-5 h-5 rounded-full bg-sage-lighter flex items-center justify-center flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-sage-dark">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="divider" />

        {/* Cancellation policy */}
        <div className="bg-cream-dark rounded-2xl p-4">
          <p className="text-xs font-semibold text-charcoal mb-1">Cancellation Policy</p>
          <p className="text-xs text-stone leading-relaxed">
            Free cancellation up to 24 hours before the session. Cancellations within 24 hours are non-refundable. Late arrivals (more than 10 minutes) may not be admitted.
          </p>
        </div>
      </div>

      {/* ── Sticky booking footer ─────────────────────────────── */}
      <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-lighter px-5 pt-3 pb-6 safe-bottom">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-stone text-xs">Session price</p>
            <p className="text-charcoal font-bold text-xl">R{session.priceZAR}</p>
          </div>
          <div className="text-right">
            <p className="text-stone text-xs">{session.durationMinutes} minutes</p>
            <p className="text-stone text-xs">{session.spotsRemaining} spots left</p>
          </div>
        </div>

        {alreadyBooked ? (
          <div className="w-full py-3.5 rounded-2xl bg-sage-lighter text-sage-dark font-semibold text-base text-center flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Booking confirmed
          </div>
        ) : (
          <button
            onClick={handleBook}
            disabled={booking || session.spotsRemaining === 0}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {booking
              ? <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : session.spotsRemaining === 0
                ? 'Sold Out'
                : 'Confirm Booking'
            }
          </button>
        )}
      </div>
    </div>
  );
}
