/**
 * ProfilePage — user profile, membership badge, settings links, and logout.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MEMBERSHIP_TIERS } from '../data/mockData';

interface SettingsRow {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, bookings, logout } = useApp();
  const tier = MEMBERSHIP_TIERS[user.membershipTier];

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const pastCount     = bookings.filter(b => b.status === 'past').length;

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  const settingsSections: { heading: string; rows: SettingsRow[] }[] = [
    {
      heading: 'Account',
      rows: [
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
          label: 'Personal Information',
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
          label: 'Password & Security',
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
          label: 'Notifications',
          onClick: () => {},
        },
      ],
    },
    {
      heading: 'Membership',
      rows: [
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
          label: 'Membership Plan',
          value: user.membershipTier,
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
          label: 'Payment Methods',
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
          label: 'Purchase History',
          onClick: () => {},
        },
      ],
    },
    {
      heading: 'Support',
      rows: [
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
          label: 'Help & FAQ',
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
          label: 'Contact Us',
          onClick: () => {},
        },
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
          label: 'Leave a Review',
          onClick: () => {},
        },
      ],
    },
    {
      heading: '',
      rows: [
        {
          icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
          label: 'Sign Out',
          onClick: handleLogout,
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="page-container">
      <div className="pt-12 pb-4">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">Profile</h1>
      </div>

      {/* ── Profile card ──────────────────────────────────────── */}
      <div className="card p-5 mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.firstName}
              className="w-16 h-16 rounded-2xl object-cover bg-stone-lighter"
            />
            {/* Edit avatar button */}
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-sage rounded-full flex items-center justify-center shadow-soft">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          {/* Name & email */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-charcoal text-lg leading-tight">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-stone text-sm truncate">{user.email}</p>
            {/* Membership badge */}
            <span className={`inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${tier.color}`}>
              {tier.label} · {tier.description}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-stone-lighter">
          {[
            { label: 'Upcoming', value: upcomingCount },
            { label: 'Completed', value: pastCount },
            { label: 'Member since', value: 'Jan \'26' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-bold text-charcoal text-lg">{stat.value}</p>
              <p className="text-stone text-[11px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Settings sections ─────────────────────────────────── */}
      {settingsSections.map((section, si) => (
        <div key={si} className="mb-4">
          {section.heading && (
            <p className="text-[11px] uppercase font-bold text-stone tracking-widest mb-2 px-1">
              {section.heading}
            </p>
          )}
          <div className="card divide-y divide-stone-lighter overflow-hidden">
            {section.rows.map((row, ri) => (
              <button
                key={ri}
                onClick={row.onClick}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-stone-lighter transition-colors
                  ${row.danger ? 'text-red-500' : 'text-charcoal'}`}
              >
                <span className={row.danger ? 'text-red-500' : 'text-stone'}>
                  {row.icon}
                </span>
                <span className={`flex-1 text-sm font-medium ${row.danger ? 'text-red-500' : ''}`}>
                  {row.label}
                </span>
                {row.value && (
                  <span className="text-xs text-stone mr-1">{row.value}</span>
                )}
                {!row.danger && <ChevronRight />}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Version */}
      <p className="text-center text-stone/50 text-xs mt-2 mb-4">Anne Wellness v1.0</p>
    </div>
  );
}
