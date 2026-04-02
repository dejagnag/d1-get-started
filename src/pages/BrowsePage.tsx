/**
 * BrowsePage — ClassPass-style schedule view.
 * Week strip calendar at top, category filters, sessions grouped by selected day.
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SESSIONS, CATEGORY_COLORS } from '../data/mockData';
import { Category, Session } from '../types';
import WeekStrip from '../components/WeekStrip';
import CategoryBadge from '../components/CategoryBadge';
import { useApp } from '../context/AppContext';

const ALL = 'All' as const;
const CATEGORIES: (Category | typeof ALL)[] = [ALL, 'Sauna', 'Cold Plunge', 'Yoga', 'Breathwork'];

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDayHeader(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
}

function spotsColor(remaining: number) {
  if (remaining <= 2) return 'text-red-500';
  if (remaining <= 5) return 'text-amber-600';
  return 'text-sage-dark';
}

// Compact horizontal session card (ClassPass style)
function ClassCard({ session, onBook }: { session: Session; onBook: () => void }) {
  const navigate = useNavigate();
  const { isBooked } = useApp();
  const booked = isBooked(session.id);
  const colors = CATEGORY_COLORS[session.category];

  return (
    <div
      className="card overflow-hidden animate-fade-in cursor-pointer active:scale-[0.99] transition-transform"
      onClick={() => navigate(`/session/${session.id}`)}
    >
      <div className="flex">
        {/* Time column */}
        <div className="w-16 flex-shrink-0 bg-stone-lighter flex flex-col items-center justify-center py-4 gap-0.5">
          <span className="text-charcoal font-bold text-sm leading-none">{session.startTime}</span>
          <span className="text-stone text-[10px]">{session.durationMinutes}m</span>
        </div>

        {/* Thumbnail */}
        <div className="w-20 flex-shrink-0 overflow-hidden">
          <img
            src={`${session.heroImage}&w=160&h=120&q=60`}
            alt={session.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-3 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                {session.category}
              </span>
              <span className="font-bold text-charcoal text-sm flex-shrink-0">R{session.priceZAR}</span>
            </div>
            <h3 className="font-semibold text-charcoal text-[13px] leading-tight line-clamp-1">
              {session.name}
            </h3>
            <p className="text-stone text-[11px] mt-0.5 line-clamp-1">{session.instructor.name}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className={`text-[11px] font-semibold ${spotsColor(session.spotsRemaining)}`}>
              {session.spotsRemaining} spot{session.spotsRemaining !== 1 ? 's' : ''} left
            </span>
            <button
              onClick={e => { e.stopPropagation(); onBook(); }}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95
                ${booked
                  ? 'bg-sage-lighter text-sage-dark'
                  : 'bg-sage text-white shadow-soft'
                }`}
            >
              {booked ? '✓ Booked' : 'Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || ALL;
  const today = toISO(new Date());

  const [selectedCategory, setSelectedCategory] = useState<Category | typeof ALL>(initialCategory);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const { addBooking } = useApp();

  // Which dates have sessions (for WeekStrip dots)
  const sessionDates = useMemo(
    () => new Set(SESSIONS.map(s => s.date)),
    []
  );

  // Sessions for selected date + category
  const filtered = useMemo(() =>
    SESSIONS.filter(s => {
      const dateOk = s.date === selectedDate;
      const catOk  = selectedCategory === ALL || s.category === selectedCategory;
      return dateOk && catOk;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [selectedDate, selectedCategory]
  );

  function selectCategory(cat: Category | typeof ALL) {
    setSelectedCategory(cat);
    if (cat === ALL) searchParams.delete('category');
    else searchParams.set('category', cat as string);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="pt-12 pb-3">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">Book a Class</h1>
        <p className="text-stone text-sm mt-0.5">
          {formatDayHeader(selectedDate)} · {filtered.length} class{filtered.length !== 1 ? 'es' : ''}
        </p>
      </div>

      {/* Week strip */}
      <div className="mb-4">
        <WeekStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          sessionDates={sessionDates}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 mb-5" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${selectedCategory === cat
                ? 'bg-charcoal text-white'
                : 'bg-white text-stone border border-stone-light'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sessions */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🌿</div>
          <p className="font-semibold text-charcoal">No classes on this day</p>
          <p className="text-stone text-sm mt-1">Try a different date or category</p>
          <button
            onClick={() => { setSelectedCategory(ALL); setSelectedDate(today); }}
            className="mt-4 px-5 py-2 bg-sage-lighter text-sage-dark rounded-full text-sm font-semibold"
          >
            Back to today
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(session => (
            <ClassCard
              key={session.id}
              session={session}
              onBook={() => addBooking(session)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
