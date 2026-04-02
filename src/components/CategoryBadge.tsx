/**
 * CategoryBadge — coloured pill showing session category with an icon.
 */

import React from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../data/mockData';

const CATEGORY_ICONS: Record<Category, string> = {
  Sauna: '🔥',
  'Cold Plunge': '❄️',
  Yoga: '🧘',
  Breathwork: '🌬️',
};

interface Props {
  category: Category;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: Props) {
  const colors = CATEGORY_COLORS[category];
  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold
      ${sizeClass} ${colors.bg} ${colors.text}`}>
      <span role="img" aria-label={category}>{CATEGORY_ICONS[category]}</span>
      {category}
    </span>
  );
}
