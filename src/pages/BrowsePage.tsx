/**
 * BrowsePage — Gallery of Shapes.
 * Week calendar strip, geometric category filters, precision session list.
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SESSIONS } from '../data/mockData';
import { Category, Session } from '../types';
import WeekStrip from '../components/WeekStrip';
import { useApp } from '../context/AppContext';

const ALL = 'All' as const;
const CATEGORIES: (Category | typeof ALL)[] = [ALL, 'Sauna', 'Cold Plunge', 'Yoga', 'Breathwork'];

const CAT_LABELS: Record<Category | typeof ALL, string> = {
  All: 'ALL',
  Sauna: '|||',
  'Cold Plunge': '⊡',
  Yoga: '⌒',
  Breathwork: '◎',
};

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDayHeader(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'TODAY';
  if (date.toDateString() === tomorrow.toDateString()) return 'TOMORROW';
  return date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
}

// Minimal precision session row
function SessionRow({ session, onBook }: { session: Session; onBook: () => void }) {
  const navigate = useNavigate();
  const { isBooked } = useApp();
  const booked = isBooked(session.id);

  const spotsUrgent = session.spotsRemaining <= 2;
  const spotsMid = session.spotsRemaining <= 5 && !spotsUrgent;

  return (
    <div
      className="flex items-stretch bg-white border-b border-void-border animate-fade-in"
      style={{ borderBottomWidth: '0.5px' }}
    >
      {/* Time + duration column */}
      <div
        className="w-16 flex-shrink-0 flex flex-col items-center justify-center py-4 gap-0.5 border-r"
        style={{ borderRightWidth: '0.5px', borderColor: '#E0E0E0' }}
      >
        <span
          className="text-xs font-semibold text-obsidian"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {session.startTime}
        </span>
        <span
          className="text-[9px] text-obsidian-muted"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {session.durationMinutes}m
        </span>
      </div>

      {/* Image */}
      <div
        className="w-14 flex-shrink-0 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/session/${session.id}`)}
      >
        <img
          src={`${session.heroImage}&w=112&h=120&q=55`}
          alt={session.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 px-4 py-3 flex flex-col justify-between cursor-pointer"
        onClick={() => navigate(`/session/${session.id}`)}
      >
        <div>
          <p className="label-mono mb-1">{session.category}</p>
          <p
            className="text-[13px] font-semibold text-obsidian leading-snug"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {session.name}
          </p>
          <p
            className="text-[10px] text-obsidian-muted mt-0.5"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {session.instructor.name.split(' ')[0]}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-[10px] font-medium ${
              spotsUrgent ? 'text-red-500' : spotsMid ? 'text-amber-600' : 'text-obsidian-muted'
            }`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {session.spotsRemaining} left
          </span>
          <span
            className="text-xs font-semibold text-obsidian"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            R{session.priceZAR}
          </span>
        </div>
      </div>

      {/* Book button */}
      <div className="flex items-center px-3 border-l" style={{ borderLeftWidth: '0.5px', borderColor: '#E0E0E0' }}>
        <button
          onClick={e => { e.stopPropagation(); onBook(); }}
          className={`text-[10px] font-bold uppercase tracking-[0.08em] px-3 py-2 rounded-full transition-all active:scale-95
            ${booked
              ? 'bg-void-dim text-obsidian-muted border border-void-border'
              : 'bg-obsidian text-white'
            }`}
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {booked ? '✓' : 'Book'}
        </button>
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

  const sessionDates = useMemo(() => new Set(SESSIONS.map(s => s.date)), []);

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
    <div className="page-void">

      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-obsidian uppercase tracking-[0.06em]"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          BROWSE
        </h1>
        <p
          className="text-[11px] text-obsidian-muted mt-2"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {formatDayHeader(selectedDate)} · {filtered.length} session{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Week strip */}
      <div className="mb-6 -mx-8">
        <WeekStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          sessionDates={sessionDates}
        />
      </div>

      {/* Category filter — geometric symbols */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-8 px-8" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all
              ${selectedCategory === cat
                ? 'bg-obsidian text-white'
                : 'bg-white text-obsidian-muted border border-void-border'
              }`}
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {cat === ALL ? 'ALL' : cat}
          </button>
        ))}
      </div>

      {/* Sessions */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="label-mono mb-4">NO SESSIONS</p>
          <p className="text-sm text-obsidian-muted mb-8"
             style={{ fontFamily: 'Inter, sans-serif' }}>
            Try a different date or category.
          </p>
          <button
            onClick={() => { setSelectedCategory(ALL); setSelectedDate(today); }}
            className="btn-ghost-dark"
            style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            BACK TO TODAY
          </button>
        </div>
      ) : (
        <div className="border-t border-void-border -mx-8" style={{ borderTopWidth: '0.5px' }}>
          {filtered.map(session => (
            <SessionRow
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
