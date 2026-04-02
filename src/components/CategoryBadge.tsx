/**
 * CategoryBadge — minimal sharp chip in Platō style.
 */

import React from 'react';
import { Category } from '../types';

interface Props {
  category: Category;
  size?: 'sm' | 'md';
  inverted?: boolean;
}

export default function CategoryBadge({ category, size = 'sm', inverted = false }: Props) {
  const sizeClass = size === 'sm'
    ? 'text-[9px] px-2.5 py-0.5'
    : 'text-[10px] px-3 py-1';

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-[0.12em]
        ${sizeClass}
        ${inverted
          ? 'bg-white text-obsidian'
          : 'bg-obsidian text-white'
        }`}
      style={{ fontFamily: 'JetBrains Mono, monospace' }}
    >
      {category}
    </span>
  );
}
