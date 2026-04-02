/**
 * BookingCard — shown in the My Bookings screen.
 * Upcoming bookings have a "Cancel" button; past ones have "Book Again".
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking } from '../types';
import { useApp } from '../context/AppContext';
import CategoryBadge from './CategoryBadge';

interface Props {
  booking: Booking;
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BookingCard({ booking }: Props) {
  const navigate = useNavigate();
  const { cancelBooking, addBooking } = useApp();
  const [cancelling, setCancelling] = useState(false);

  const { session, status } = booking;
  const isUpcoming = status === 'upcoming';
  const isPast = status === 'past';

  function handleCancel() {
    setCancelling(true);
    // Brief delay for UX feel
    setTimeout(() => {
      cancelBooking(booking.id);
      setCancelling(false);
    }, 400);
  }

  function handleBookAgain() {
    addBooking(session);
  }

  return (
    <div className="card overflow-hidden animate-slide-up">
      {/* Hero strip */}
      <div className="relative h-28 bg-stone-lighter overflow-hidden">
        <img
          src={`${session.heroImage}&w=600&h=220&q=60`}
          alt={session.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Status badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full
            ${isUpcoming
              ? 'bg-sage text-white'
              : isPast
                ? 'bg-white/80 text-stone'
                : 'bg-red-500/80 text-white'
            }`}>
            {status}
          </span>
        </div>
        <div className="absolute bottom-2 left-3">
          <CategoryBadge category={session.category} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-charcoal text-base leading-snug">{session.name}</h3>

        <div className="flex flex-col gap-1.5 mt-2.5">
          <div className="flex items-center gap-2 text-sm text-stone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(session.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-stone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {session.startTime} – {session.endTime} · {session.durationMinutes} min
          </div>
          <div className="flex items-center gap-2 text-sm text-stone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {session.instructor.name}
          </div>
        </div>

        <div className="divider" />

        <div className="flex items-center justify-between">
          <span className="font-bold text-charcoal text-lg">R{session.priceZAR}</span>

          <div className="flex gap-2">
            {isUpcoming && (
              <>
                <button
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="text-sm px-4 py-2 rounded-xl border border-stone-light text-stone font-medium active:scale-95 transition-transform"
                >
                  Details
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="text-sm px-4 py-2 rounded-xl border border-red-200 text-red-500 font-medium active:scale-95 transition-transform disabled:opacity-60"
                >
                  {cancelling ? 'Cancelling…' : 'Cancel'}
                </button>
              </>
            )}
            {isPast && (
              <button
                onClick={handleBookAgain}
                className="text-sm px-4 py-2 rounded-xl bg-sage text-white font-semibold active:scale-95 transition-transform"
              >
                Book Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
