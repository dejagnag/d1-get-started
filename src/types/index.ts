/** Core domain types for Anne Wellness */

export type Category = 'Sauna' | 'Cold Plunge' | 'Yoga' | 'Breathwork';

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string; // Unsplash URL
}

export interface Session {
  id: string;
  name: string;
  category: Category;
  description: string;
  date: string;          // ISO date string — YYYY-MM-DD
  startTime: string;     // e.g. "07:00"
  endTime: string;       // e.g. "08:00"
  durationMinutes: number;
  instructor: Instructor;
  spotsTotal: number;
  spotsRemaining: number;
  priceZAR: number;
  heroImage: string;     // Unsplash URL
  whatToBring: string[];
}

export interface Booking {
  id: string;
  session: Session;
  bookedAt: string;      // ISO timestamp
  status: 'upcoming' | 'past' | 'cancelled';
}

export type MembershipTier = 'Explorer' | 'Regular' | 'Member' | 'Sanctuary';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  membershipTier: MembershipTier;
  avatar: string;
}
