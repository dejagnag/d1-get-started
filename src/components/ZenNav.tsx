/**
 * ZenNav — "Hidden Zen" hamburger navigation.
 * A minimal trigger button + full-screen obsidian overlay with Syne nav items.
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  sub: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/home',     label: 'HOME',     sub: '01' },
  { to: '/browse',   label: 'BROWSE',   sub: '02' },
  { to: '/bookings', label: 'BOOKINGS', sub: '03' },
  { to: '/profile',  label: 'PROFILE',  sub: '04' },
];

export default function ZenNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger trigger — fixed top-right */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
      >
        <span
          className={`block h-[1px] bg-obsidian transition-all duration-300 origin-center
            ${open ? 'w-6 rotate-45 translate-y-[6px]' : 'w-6'}`}
        />
        <span
          className={`block h-[1px] bg-obsidian transition-all duration-300
            ${open ? 'w-0 opacity-0' : 'w-4'}`}
        />
        <span
          className={`block h-[1px] bg-obsidian transition-all duration-300 origin-center
            ${open ? 'w-6 -rotate-45 -translate-y-[6px]' : 'w-6'}`}
        />
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-obsidian flex flex-col justify-between px-10 pt-24 pb-16 animate-overlay-in"
          style={{ maxWidth: '448px', left: '50%', transform: 'translateX(-50%)' }}
        >
          {/* Nav items */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(item => {
              const active = location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline justify-between py-5 border-b border-white/10
                    transition-colors duration-150 active:opacity-70`}
                >
                  <span
                    className={`font-display text-4xl font-bold tracking-[0.06em] transition-colors
                      ${active ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-white/25 text-xs tracking-widest"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {item.sub}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Brand footer */}
          <div>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]"
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Sauna Goose · Johannesburg
            </p>
            <p className="text-white/12 text-[10px] mt-1"
               style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.15)' }}>
              Transcending Stillness
            </p>
          </div>
        </div>
      )}
    </>
  );
}
