/**
 * SessionCard — Platō minimal. Used on the HomePage.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../types';

interface Props {
  session: Session;
  compact?: boolean;
}

export default function SessionCard({ session, compact = false }: Props) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/session/${session.id}`)}
        onKeyDown={e => e.key === 'Enter' && navigate(`/session/${session.id}`)}
        className="flex-shrink-0 w-48 border border-void-border cursor-pointer active:bg-void-dim transition-colors overflow-hidden"
        style={{ borderWidth: '0.5px' }}
      >
        <div className="h-28 bg-void-subtle overflow-hidden">
          <img
            src={`${session.heroImage}&q=60`}
            alt={session.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <p className="label-mono mb-1">{session.category}</p>
          <p
            className="text-xs font-bold text-obsidian uppercase tracking-[0.04em] leading-snug line-clamp-1"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {session.name}
          </p>
          <p
            className="text-[10px] text-obsidian-muted mt-1"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {session.startTime} · R{session.priceZAR}
          </p>
        </div>
      </div>
    );
  }

  // Full row card
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/session/${session.id}`)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/session/${session.id}`)}
      className="flex items-stretch border-b border-void-border cursor-pointer active:bg-void-dim transition-colors animate-fade-in"
      style={{ borderBottomWidth: '0.5px' }}
    >
      <div className="w-14 flex-shrink-0 overflow-hidden bg-void-subtle">
        <img
          src={`${session.heroImage}&w=112&h=112&q=55`}
          alt={session.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 px-4 py-3 flex flex-col justify-between">
        <div>
          <p className="label-mono mb-1">{session.category}</p>
          <p
            className="text-[13px] font-bold text-obsidian uppercase tracking-[0.04em] leading-snug"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {session.name}
          </p>
        </div>
        <p
          className="text-[10px] text-obsidian-muted mt-1"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {session.startTime} · {session.durationMinutes}min · R{session.priceZAR}
        </p>
      </div>
      <div className="flex items-center pr-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BEBEBE" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  );
}
