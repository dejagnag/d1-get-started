/**
 * BrowsePage — filterable schedule of all sessions.
 * Filters by category and by date. Reads initial category from query string.
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SESSIONS } from '../data/mockData';
import { Category } from '../types';
import SessionCard from '../components/SessionCard';

const ALL = 'All';
const CATEGORIES: (Category | typeof ALL)[] = [ALL, 'Sauna', 'Cold Plunge', 'Yoga', 'Breathwork'];

function getUniqueDates(sessions: typeof SESSIONS): string[] {
  const set = new Set(sessions.map(s => s.date));
  return Array.from(set).sort();
}

function formatDateTab(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric' });
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || ALL;

  const [selectedCategory, setSelectedCategory] = useState<Category | typeof ALL>(initialCategory);
  const [selectedDate, setSelectedDate] = useState<string | typeof ALL>(ALL);

  const uniqueDates = useMemo(() => getUniqueDates(SESSIONS), []);

  const filtered = useMemo(() => {
    return SESSIONS.filter(s => {
      const catOk = selectedCategory === ALL || s.category === selectedCategory;
      const dateOk = selectedDate === ALL || s.date === selectedDate;
      return catOk && dateOk;
    });
  }, [selectedCategory, selectedDate]);

  function selectCategory(cat: Category | typeof ALL) {
    setSelectedCategory(cat);
    if (cat === ALL) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="pt-12 pb-4">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">Browse Sessions</h1>
        <p className="text-stone text-sm mt-0.5">{filtered.length} sessions available</p>
      </div>

      {/* ── Category filter pills ──────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 mb-4" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150
              ${selectedCategory === cat
                ? 'bg-sage text-white shadow-soft'
                : 'bg-white text-stone border border-stone-light'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Date filter tabs ───────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 mb-5" style={{ scrollbarWidth: 'none' }}>
        <button
          onClick={() => setSelectedDate(ALL)}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
            ${selectedDate === ALL
              ? 'bg-charcoal text-white'
              : 'bg-white text-stone border border-stone-light'
            }`}
        >
          Any date
        </button>
        {uniqueDates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date === selectedDate ? ALL : date)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
              ${selectedDate === date
                ? 'bg-charcoal text-white'
                : 'bg-white text-stone border border-stone-light'
              }`}
          >
            {formatDateTab(date)}
          </button>
        ))}
      </div>

      {/* ── Sessions list ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone">
          <div className="text-4xl mb-3">🌿</div>
          <p className="font-semibold text-charcoal">No sessions found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
          <button
            onClick={() => { setSelectedCategory(ALL); setSelectedDate(ALL); }}
            className="mt-4 px-5 py-2 bg-sage-lighter text-sage-dark rounded-full text-sm font-semibold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
