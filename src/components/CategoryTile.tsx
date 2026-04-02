/**
 * CategoryTile — quick-access tile on the Home screen.
 * Taps through to Browse filtered by that category.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { CATEGORY_IMAGES } from '../data/mockData';

interface Props {
  category: Category;
}

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Sauna: 'Heat rituals',
  'Cold Plunge': 'Cold therapy',
  Yoga: 'Mind & body',
  Breathwork: 'Breath science',
};

export default function CategoryTile({ category }: Props) {
  const navigate = useNavigate();
  const imageUrl = CATEGORY_IMAGES[category];

  return (
    <button
      onClick={() => navigate(`/browse?category=${encodeURIComponent(category)}`)}
      className="relative flex-1 min-w-0 h-28 rounded-2xl overflow-hidden group active:scale-[0.97] transition-transform duration-150"
    >
      {/* Background image */}
      <img
        src={`${imageUrl}&w=300&h=200&q=60`}
        alt={category}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end p-3">
        <span className="text-white font-semibold text-sm leading-tight">{category}</span>
        <span className="text-white/75 text-[11px] leading-tight">{CATEGORY_DESCRIPTIONS[category]}</span>
      </div>
    </button>
  );
}
