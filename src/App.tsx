/**
 * App.tsx — root router with auth guard, onboarding guard, and Zen navigation.
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import ZenNav from './components/ZenNav';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SessionDetailPage from './pages/SessionDetailPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/" state={{ from: location }} replace />;
  return <>{children}</>;
}

function OnboardGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isOnboarded } = useApp();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!isOnboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

// AppShell: renders the floating ZenNav over content
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-md mx-auto">
      <ZenNav />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/onboarding"
        element={<AuthGuard><OnboardingPage /></AuthGuard>}
      />

      <Route path="/home"        element={<OnboardGuard><AppShell><HomePage /></AppShell></OnboardGuard>} />
      <Route path="/browse"      element={<OnboardGuard><AppShell><BrowsePage /></AppShell></OnboardGuard>} />
      <Route path="/session/:id" element={<OnboardGuard><AppShell><SessionDetailPage /></AppShell></OnboardGuard>} />
      <Route path="/bookings"    element={<OnboardGuard><AppShell><BookingsPage /></AppShell></OnboardGuard>} />
      <Route path="/profile"     element={<OnboardGuard><AppShell><ProfilePage /></AppShell></OnboardGuard>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
