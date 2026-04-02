/**
 * AppContext — global state for authentication and bookings.
 * All data is in-memory (no backend).
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Booking, Session, User } from '../types';
import { DUMMY_USER } from '../data/mockData';

interface AppContextValue {
  // Auth
  isAuthenticated: boolean;
  user: User;
  login: () => void;
  logout: () => void;

  // Bookings
  bookings: Booking[];
  addBooking: (session: Session) => void;
  cancelBooking: (bookingId: string) => void;
  isBooked: (sessionId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const login = useCallback(() => setIsAuthenticated(true), []);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setBookings([]);
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
      user: DUMMY_USER,
      login,
      logout,
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
