/**
 * WeekStrip — horizontal scrollable week calendar strip.
 * Shows 14 days; selected day highlighted. Dots indicate sessions exist.
 */

import React, { useRef, useEffect } from 'react';

interface Props {
  selectedDate: string;           // YYYY-MM-DD
  onSelectDate: (d: string) => void;
  sessionDates: Set<string>;      // which dates have sessions
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function WeekStrip({ selectedDate, onSelectDate, sessionDates }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build 14 days starting from today
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll selected day into view on mount / change
  useEffect(() => {
    const idx = days.findIndex(d => toISO(d) === selectedDate);
    if (idx >= 0 && scrollRef.current) {
      const child = scrollRef.current.children[idx] as HTMLElement;
      child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4"
      style={{ scrollbarWidth: 'none' }}
    >
      {days.map(day => {
        const iso   = toISO(day);
        const isToday    = iso === toISO(today);
        const isSelected = iso === selectedDate;
        const hasSessions = sessionDates.has(iso);

        return (
          <button
            key={iso}
            onClick={() => onSelectDate(iso)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 w-12 py-2 rounded-2xl transition-all duration-150
              ${isSelected
                ? 'bg-sage text-white shadow-soft'
                : isToday
                  ? 'bg-sage-lighter text-sage-dark border border-sage-light'
                  : 'bg-white text-charcoal border border-stone-lighter'
              }`}
          >
            <span className={`text-[10px] font-semibold uppercase tracking-wide
              ${isSelected ? 'text-white/80' : 'text-stone'}`}>
              {DAY_LABELS[day.getDay()]}
            </span>
            <span className={`text-base font-bold leading-none
              ${isSelected ? 'text-white' : ''}`}>
              {day.getDate()}
            </span>
            {/* Session dot */}
            <span className={`w-1.5 h-1.5 rounded-full transition-colors
              ${hasSessions
                ? isSelected ? 'bg-white/70' : 'bg-sage'
                : 'bg-transparent'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
