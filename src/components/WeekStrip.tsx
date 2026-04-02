/**
 * WeekStrip — Platō style horizontal date selector.
 * Sharp corners, obsidian/white contrast, hairline borders.
 */

import React, { useRef, useEffect } from 'react';

interface Props {
  selectedDate: string;
  onSelectDate: (d: string) => void;
  sessionDates: Set<string>;
}

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));
  const scrollRef = useRef<HTMLDivElement>(null);

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
      className="flex gap-0 overflow-x-auto px-8"
      style={{ scrollbarWidth: 'none' }}
    >
      {days.map((day, i) => {
        const iso        = toISO(day);
        const isToday    = iso === toISO(today);
        const isSelected = iso === selectedDate;
        const hasSessions = sessionDates.has(iso);

        return (
          <button
            key={iso}
            onClick={() => onSelectDate(iso)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 w-12 py-3 transition-colors duration-150
              ${isSelected
                ? 'bg-obsidian text-white'
                : isToday
                  ? 'bg-void-dim text-obsidian border-y border-void-border'
                  : 'bg-white text-obsidian-muted border-y border-r border-void-border'
              }
              ${i === 0 ? 'border-l border-void-border' : ''}
            `}
            style={{ borderWidth: '0.5px' }}
          >
            <span
              className={`text-[8px] font-bold tracking-[0.12em] ${isSelected ? 'text-white/60' : 'text-obsidian-muted'}`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {DAY_LABELS[day.getDay()]}
            </span>
            <span
              className={`text-sm font-bold leading-none ${isSelected ? 'text-white' : 'text-obsidian'}`}
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {day.getDate()}
            </span>
            {/* Session dot */}
            <span className={`w-1 h-1 transition-colors
              ${hasSessions
                ? isSelected ? 'bg-white/50' : 'bg-obsidian-muted'
                : 'bg-transparent'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
