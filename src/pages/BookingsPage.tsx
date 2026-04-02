/**
 * BookingsPage — shows upcoming and past bookings in two tabs.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BookingCard from '../components/BookingCard';

type Tab = 'upcoming' | 'past';

export default function BookingsPage() {
  const navigate = useNavigate();
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings     = bookings.filter(b => b.status === 'past' || b.status === 'cancelled');

  const displayed = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="pt-12 pb-4">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">My Bookings</h1>
        <p className="text-stone text-sm mt-0.5">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-stone-lighter p-1 rounded-2xl mb-5">
        {(['upcoming', 'past'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-150
              ${activeTab === tab
                ? 'bg-white text-charcoal shadow-soft'
                : 'text-stone'
              }`}
          >
            {tab}
            {tab === 'upcoming' && upcomingBookings.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-sage text-white text-[10px] rounded-full">
                {upcomingBookings.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Bookings list ─────────────────────────────────────── */}
      {displayed.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">{activeTab === 'upcoming' ? '🗓️' : '🕰️'}</div>
          <h3 className="font-semibold text-charcoal text-lg">
            {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
          </h3>
          <p className="text-stone text-sm mt-1 mb-6">
            {activeTab === 'upcoming'
              ? 'Explore sessions and book your next experience.'
              : 'Your completed sessions will appear here.'}
          </p>
          {activeTab === 'upcoming' && (
            <button
              onClick={() => navigate('/browse')}
              className="px-6 py-3 bg-sage text-white rounded-2xl font-semibold text-sm shadow-soft"
            >
              Browse Sessions
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {displayed.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
