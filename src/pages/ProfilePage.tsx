/**
 * ProfilePage — Sauna Goose Platō aesthetic.
 * Obsidian headers, hairline grids, mono metadata.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MEMBERSHIP_TIERS } from '../data/mockData';

interface SettingsRow {
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
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

  const sections: { heading: string; rows: SettingsRow[] }[] = [
    {
      heading: 'ACCOUNT',
      rows: [
        { label: 'Personal Information', onClick: () => {} },
        { label: 'Password & Security', onClick: () => {} },
        { label: 'Notifications', onClick: () => {} },
      ],
    },
    {
      heading: 'MEMBERSHIP',
      rows: [
        { label: 'Membership Plan', value: user.membershipTier, onClick: () => {} },
        { label: 'Payment Methods', onClick: () => {} },
        { label: 'Purchase History', onClick: () => {} },
      ],
    },
    {
      heading: 'SUPPORT',
      rows: [
        { label: 'Help & FAQ', onClick: () => {} },
        { label: 'Contact Us', onClick: () => {} },
        { label: 'Leave a Review', onClick: () => {} },
      ],
    },
    {
      heading: '',
      rows: [
        { label: 'Sign Out', onClick: handleLogout, danger: true },
      ],
    },
  ];

  return (
    <div className="page-void">

      {/* Header */}
      <h1
        className="text-3xl font-bold text-obsidian uppercase tracking-[0.06em] mb-10"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        PROFILE
      </h1>

      {/* ── Identity card ─────────────────────────────────────── */}
      <div className="border border-void-border mb-10 -mx-8" style={{ borderWidth: '0.5px' }}>
        <div className="flex items-center gap-5 p-6">
          <img
            src={user.avatar}
            alt={user.firstName}
            className="w-14 h-14 object-cover flex-shrink-0 bg-void-subtle"
          />
          <div className="flex-1 min-w-0">
            <p
              className="text-base font-bold text-obsidian uppercase tracking-[0.05em]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {user.firstName} {user.lastName}
            </p>
            <p
              className="text-[11px] text-obsidian-muted mt-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {user.email}
            </p>
            <span
              className="inline-block mt-2 text-[9px] uppercase tracking-[0.14em] px-3 py-1 bg-obsidian text-white"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {tier.label} · {tier.description}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 border-t"
          style={{ borderTopWidth: '0.5px', borderColor: '#E0E0E0' }}
        >
          {[
            { label: 'UPCOMING', value: upcomingCount },
            { label: 'COMPLETED', value: pastCount },
            { label: 'MEMBER', value: "JAN '26" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="py-5 text-center"
              style={{ borderRight: i < 2 ? '0.5px solid #E0E0E0' : undefined }}
            >
              <p
                className="text-xl font-bold text-obsidian"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {stat.value}
              </p>
              <p className="label-mono mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Settings sections ─────────────────────────────────── */}
      {sections.map((section, si) => (
        <div key={si} className="mb-6">
          {section.heading && (
            <p className="label-mono mb-3">{section.heading}</p>
          )}
          <div className="border border-void-border -mx-8" style={{ borderWidth: '0.5px' }}>
            {section.rows.map((row, ri) => (
              <button
                key={ri}
                onClick={row.onClick}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors active:bg-void-dim
                  ${ri < section.rows.length - 1 ? 'border-b' : ''}`}
                style={{ borderBottomWidth: '0.5px', borderColor: '#E0E0E0' }}
              >
                <span
                  className={`text-sm font-medium ${row.danger ? 'text-red-500' : 'text-obsidian'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {row.label}
                </span>
                <div className="flex items-center gap-3">
                  {row.value && (
                    <span
                      className="text-[10px] text-obsidian-muted"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {row.value}
                    </span>
                  )}
                  {!row.danger && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BEBEBE" strokeWidth="1.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Version */}
      <p
        className="text-center label-mono mt-4 mb-6"
      >
        Sauna Goose v1.0
      </p>
    </div>
  );
}
