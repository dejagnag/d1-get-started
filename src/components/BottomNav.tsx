/**
 * BottomNav — fixed bottom tab bar for mobile navigation.
 * Shows icons + labels for the four main sections.
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

// Inline SVG icons — no icon library dependency needed
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.552 5.448 21 6 21H9M19 10L21 12M19 10V20C19 20.552 18.552 21 18 21H15M9 21V15C9 14.448 9.448 14 10 14H14C14.552 14 15 14.448 15 15V21M9 21H15" />
  </svg>
);

const ExploreIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    {active
      ? <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.95 5.05L13 13l-6 2 2-6 6-4 1.95 1.05z" />
      : <>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </>
    }
  </svg>
);

const BookingsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    {active
      ? <path d="M8 2v2H5C3.895 4 3 4.895 3 6v16c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2h-3V2H8zm-1 8h10v2H7v-2zm0 4h7v2H7v-2z" />
      : <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
    }
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { to: '/home',     label: 'Home',     icon: (a) => <HomeIcon active={a} /> },
  { to: '/browse',   label: 'Browse',   icon: (a) => <ExploreIcon active={a} /> },
  { to: '/bookings', label: 'Bookings', icon: (a) => <BookingsIcon active={a} /> },
  { to: '/profile',  label: 'Profile',  icon: (a) => <ProfileIcon active={a} /> },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-t border-stone-lighter safe-bottom max-w-md mx-auto">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map(({ to, label, icon }) => {
          const active = location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors duration-150
                ${active ? 'text-sage' : 'text-stone'}`}
            >
              {icon(active)}
              <span className={`text-[10px] font-semibold tracking-wide uppercase
                ${active ? 'text-sage' : 'text-stone'}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
