/**
 * CategoryTile — geometric category access tile for the Home screen.
 * No photo backgrounds. Pure geometric shape + label.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

interface Props {
  category: Category;
}

const GeoSauna = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="10" y1="8" x2="10" y2="24" stroke="currentColor" strokeWidth="1"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="1"/>
    <line x1="22" y1="8" x2="22" y2="24" stroke="currentColor" strokeWidth="1"/>
  </svg>
);
const GeoCold = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1"/>
  </svg>
);
const GeoYoga = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 24 Q16 6 26 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);
const GeoBreath = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="3"  stroke="currentColor" strokeWidth="1"/>
    <circle cx="16" cy="16" r="7"  stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
);

const GEO_ICONS: Record<Category, React.ReactNode> = {
  Sauna:         <GeoSauna />,
  'Cold Plunge': <GeoCold />,
  Yoga:          <GeoYoga />,
  Breathwork:    <GeoBreath />,
};

const CATEGORY_SUBS: Record<Category, string> = {
  Sauna:         'Heat rituals',
  'Cold Plunge': 'Cold therapy',
  Yoga:          'Movement',
  Breathwork:    'Breath science',
};

export default function CategoryTile({ category }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/browse?category=${encodeURIComponent(category)}`)}
      className="text-left p-5 flex flex-col gap-3 text-obsidian active:bg-void-dim transition-colors"
    >
      {GEO_ICONS[category]}
      <div>
        <p
          className="text-[11px] font-bold text-obsidian uppercase tracking-[0.1em]"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {category}
        </p>
        <p
          className="text-[10px] text-obsidian-muted mt-0.5"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {CATEGORY_SUBS[category]}
        </p>
      </div>
    </button>
  );
}
