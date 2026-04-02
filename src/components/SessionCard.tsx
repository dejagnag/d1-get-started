/**
 * SessionCard — compact card shown in Browse and Home screens.
 * Tapping navigates to the Session Detail page.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../types';
import CategoryBadge from './CategoryBadge';

interface Props {
  session: Session;
  compact?: boolean; // smaller layout for horizontal scroll
}

// Format date to readable string
function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Spots colour — red when < 3, amber when < 6, green otherwise
function spotsColor(remaining: number): string {
  if (remaining <= 2) return 'text-red-500';
  if (remaining <= 5) return 'text-amber-600';
  return 'text-sage-dark';
}

export default function SessionCard({ session, compact = false }: Props) {
  const navigate = useNavigate();

  if (compact) {
    // Compact horizontal card for home screen featured section
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/session/${session.id}`)}
        onKeyDown={e => e.key === 'Enter' && navigate(`/session/${session.id}`)}
        className="card flex-shrink-0 w-64 cursor-pointer active:scale-[0.98] transition-transform duration-150 overflow-hidden"
      >
        <div className="relative h-36 bg-stone-lighter overflow-hidden">
          <img
            src={`${session.heroImage}&q=60`}
            alt={session.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <CategoryBadge category={session.category} size="sm" />
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-charcoal text-sm leading-tight line-clamp-1">
            {session.name}
          </h3>
          <p className="text-stone text-xs mt-0.5">
            {formatDate(session.date)} · {session.startTime}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-charcoal text-sm">R{session.priceZAR}</span>
            <span className={`text-xs font-medium ${spotsColor(session.spotsRemaining)}`}>
              {session.spotsRemaining} spots
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full-width list card for Browse screen
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/session/${session.id}`)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/session/${session.id}`)}
      className="card cursor-pointer active:scale-[0.99] transition-transform duration-150 animate-fade-in"
    >
      <div className="flex gap-3 p-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-stone-lighter">
          <img
            src={`${session.heroImage}&w=160&h=160&q=60`}
            alt={session.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CategoryBadge category={session.category} size="sm" />
              <h3 className="font-semibold text-charcoal text-[15px] mt-1 leading-tight line-clamp-1">
                {session.name}
              </h3>
            </div>
            <span className="font-bold text-charcoal text-base flex-shrink-0">R{session.priceZAR}</span>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Date & time */}
            <span className="flex items-center gap-1 text-xs text-stone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(session.date)}
            </span>
            <span className="text-stone text-xs">·</span>
            <span className="flex items-center gap-1 text-xs text-stone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {session.startTime} · {session.durationMinutes}min
            </span>
          </div>

          {/* Instructor & spots */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-stone truncate">{session.instructor.name}</span>
            <span className={`text-xs font-semibold ${spotsColor(session.spotsRemaining)}`}>
              {session.spotsRemaining} / {session.spotsTotal} spots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
