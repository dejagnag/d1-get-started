/**
 * App.tsx — root component with routing and authentication guard.
 * Unauthenticated users are redirected to the login page.
 */

import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SessionDetailPage from './pages/SessionDetailPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';

/** Wraps authenticated routes — redirects to /login if not signed in */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

/** Shell that includes the bottom nav bar for authenticated pages */
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public — login */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected — requires authentication */}
      <Route
        path="/home"
        element={
          <AuthGuard>
            <AppShell><HomePage /></AppShell>
          </AuthGuard>
        }
      />
      <Route
        path="/browse"
        element={
          <AuthGuard>
            <AppShell><BrowsePage /></AppShell>
          </AuthGuard>
        }
      />
      <Route
        path="/session/:id"
        element={
          <AuthGuard>
            {/* Detail page has its own sticky footer; BottomNav sits below it */}
            <AppShell><SessionDetailPage /></AppShell>
          </AuthGuard>
        }
      />
      <Route
        path="/bookings"
        element={
          <AuthGuard>
            <AppShell><BookingsPage /></AppShell>
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <AppShell><ProfilePage /></AppShell>
          </AuthGuard>
        }
      />

      {/* Fallback — redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
