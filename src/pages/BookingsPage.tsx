/**
 * BookingsPage — Sauna Goose Platō aesthetic.
 * Minimal hairline grid, Syne headings, JetBrains Mono metadata.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type Tab = 'upcoming' | 'past';

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-ZA', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

export default function BookingsPage() {
  const navigate = useNavigate();
  const { bookings, cancelBooking, addBooking } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [cancelling, setCancelling] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings     = bookings.filter(b => b.status === 'past' || b.status === 'cancelled');
  const displayed        = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  function handleCancel(bookingId: string) {
    setCancelling(bookingId);
    setTimeout(() => {
      cancelBooking(bookingId);
      setCancelling(null);
    }, 400);
  }

  return (
    <div className="page-void">

      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-obsidian uppercase tracking-[0.06em]"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          BOOKINGS
        </h1>
        <p
          className="text-[11px] text-obsidian-muted mt-2"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {bookings.length} total
        </p>
      </div>

      {/* Tabs — sharp toggle */}
      <div className="flex mb-8 border border-void-border" style={{ borderWidth: '0.5px' }}>
        {(['upcoming', 'past'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors
              ${activeTab === tab
                ? 'bg-obsidian text-white'
                : 'bg-white text-obsidian-muted'
              }`}
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {tab}
            {tab === 'upcoming' && upcomingBookings.length > 0 && (
              <span className={`ml-2 text-[9px] ${activeTab === tab ? 'text-white/60' : 'text-obsidian-muted'}`}
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ({upcomingBookings.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      {displayed.length === 0 ? (
        <div className="py-20 text-center">
          <p className="label-mono mb-4">
            {activeTab === 'upcoming' ? 'NO UPCOMING SESSIONS' : 'NO PAST SESSIONS'}
          </p>
          <p className="text-sm text-obsidian-muted mb-8"
             style={{ fontFamily: 'Inter, sans-serif' }}>
            {activeTab === 'upcoming'
              ? 'Explore sessions and reserve your next experience.'
              : 'Your completed sessions will appear here.'}
          </p>
          {activeTab === 'upcoming' && (
            <button
              onClick={() => navigate('/browse')}
              className="btn-ghost-dark"
              style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              BROWSE SESSIONS
            </button>
          )}
        </div>
      ) : (
        <div className="border-t border-void-border -mx-8" style={{ borderTopWidth: '0.5px' }}>
          {displayed.map((booking, i) => {
            const { session, status } = booking;
            const isUpcoming = status === 'upcoming';
            const isPast     = status === 'past';

            return (
              <div
                key={booking.id}
                className="bg-white animate-slide-up"
                style={{ borderBottom: '0.5px solid #E0E0E0' }}
              >
                {/* Image strip */}
                <div
                  className="relative h-28 bg-void-subtle overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/session/${session.id}`)}
                >
                  <img
                    src={`${session.heroImage}&w=600&h=220&q=60`}
                    alt={session.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Status chip */}
                  <div className="absolute top-3 right-4">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1
                        ${isUpcoming ? 'bg-obsidian text-white' : 'bg-white/90 text-obsidian-muted'}`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {status}
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute bottom-3 left-5">
                    <span className="label-mono text-white/70">{session.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 py-4">
                  <p
                    className="text-sm font-bold text-obsidian uppercase tracking-[0.04em] mb-3"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {session.name}
                  </p>
                  <div className="flex flex-col gap-1.5 mb-4">
                    {[
                      { label: 'DATE',       val: formatDate(session.date) },
                      { label: 'TIME',       val: `${session.startTime} — ${session.endTime} · ${session.durationMinutes}min` },
                      { label: 'GUIDE',      val: session.instructor.name },
                    ].map(row => (
                      <div key={row.label} className="flex items-baseline gap-3">
                        <span className="label-mono w-10 flex-shrink-0">{row.label}</span>
                        <span
                          className="text-[11px] text-obsidian-muted"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="hairline !my-3" />

                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold text-obsidian"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      R{session.priceZAR}
                    </span>
                    <div className="flex gap-2">
                      {isUpcoming && (
                        <>
                          <button
                            onClick={() => navigate(`/session/${session.id}`)}
                            className="text-[10px] px-4 py-2 rounded-full border border-void-border text-obsidian-muted uppercase tracking-wide font-bold"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            DETAILS
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            disabled={cancelling === booking.id}
                            className="text-[10px] px-4 py-2 rounded-full border border-red-200 text-red-500 uppercase tracking-wide font-bold disabled:opacity-50"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            {cancelling === booking.id ? '...' : 'CANCEL'}
                          </button>
                        </>
                      )}
                      {isPast && (
                        <button
                          onClick={() => addBooking(session)}
                          className="text-[10px] px-4 py-2 rounded-full bg-obsidian text-white uppercase tracking-wide font-bold"
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
          })}
        </div>
      )}
    </div>
  );
}
