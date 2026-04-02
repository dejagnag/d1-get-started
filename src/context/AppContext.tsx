/**
 * AppContext — global state for auth, user name, and bookings.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Booking, Session, User } from '../types';

interface AppContextValue {
  // Auth
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: () => void;
  logout: () => void;

  // User
  user: User;
  setName: (firstName: string, lastName: string) => void;

  // Bookings
  bookings: Booking[];
  addBooking: (session: Session) => void;
  cancelBooking: (bookingId: string) => void;
  isBooked: (sessionId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEFAULT_USER: User = {
  firstName: '',
  lastName: '',
  email: '',
  membershipTier: 'Explorer',
  avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const login = useCallback(() => setIsAuthenticated(true), []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsOnboarded(false);
    setUser(DEFAULT_USER);
    setBookings([]);
  }, []);

  const setName = useCallback((firstName: string, lastName: string) => {
    setUser(u => ({ ...u, firstName, lastName }));
    setIsOnboarded(true);
  }, []);

  const addBooking = useCallback((session: Session) => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}-${session.id}`,
      session,
      bookedAt: new Date().toISOString(),
      status: new Date(`${session.date}T${session.startTime}`) > new Date()
        ? 'upcoming'
        : 'past',
    };
    setBookings(prev => [newBooking, ...prev]);
  }, []);

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b)
    );
  }, []);

  const isBooked = useCallback(
    (sessionId: string) =>
      bookings.some(b => b.session.id === sessionId && b.status !== 'cancelled'),
    [bookings]
  );

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      isOnboarded,
      login,
      logout,
      user,
      setName,
      bookings,
      addBooking,
      cancelBooking,
      isBooked,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
