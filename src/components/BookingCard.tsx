/**
 * BookingCard — Platō minimal booking item.
 * (Now inlined in BookingsPage; this file kept for potential future use.)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  booking: Booking;
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-ZA', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}

export default function BookingCard({ booking }: Props) {
  const navigate  = useNavigate();
  const { cancelBooking, addBooking } = useApp();
  const [cancelling, setCancelling] = useState(false);

  const { session, status } = booking;
  const isUpcoming = status === 'upcoming';
  const isPast     = status === 'past';

  function handleCancel() {
    setCancelling(true);
    setTimeout(() => {
      cancelBooking(booking.id);
      setCancelling(false);
    }, 400);
  }

  return (
    <div
      className="border border-void-border overflow-hidden animate-slide-up bg-white"
      style={{ borderWidth: '0.5px' }}
    >
      {/* Image */}
      <div
        className="relative h-24 bg-void-subtle overflow-hidden cursor-pointer"
        onClick={() => navigate(`/session/${session.id}`)}
      >
        <img
          src={`${session.heroImage}&w=600&h=200&q=60`}
          alt={session.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-2.5 right-3">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5
              ${isUpcoming ? 'bg-obsidian text-white' : 'bg-white/90 text-obsidian-muted'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p
          className="text-sm font-bold text-obsidian uppercase tracking-[0.04em] mb-2"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {session.name}
        </p>
        <p
          className="text-[10px] text-obsidian-muted mb-4"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {formatDate(session.date)} · {session.startTime} · {session.durationMinutes}min
        </p>

        <div className="flex items-center justify-between">
          <span
            className="font-bold text-obsidian"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            R{session.priceZAR}
          </span>
          <div className="flex gap-2">
            {isUpcoming && (
              <>
                <button
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-void-border text-obsidian-muted uppercase tracking-wide font-bold"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  DETAILS
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-red-200 text-red-500 uppercase tracking-wide font-bold"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {cancelling ? '...' : 'CANCEL'}
                </button>
              </>
            )}
            {isPast && (
              <button
                onClick={() => addBooking(session)}
                className="text-[10px] px-3 py-1.5 rounded-full bg-obsidian text-white uppercase tracking-wide font-bold"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                BOOK AGAIN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
