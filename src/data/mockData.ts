/**
 * Mock data for Anne Wellness.
 * Sessions are spread across the coming week from 2 April 2026.
 * All prices in ZAR.
 */

import { Category, Instructor, Session } from '../types';

// ── Instructors ──────────────────────────────────────────────────────────────

export const INSTRUCTORS: Record<string, Instructor> = {
  annika: {
    id: 'annika',
    name: 'Annika van der Berg',
    role: 'Sauna & Wellness Guide',
    bio: 'Annika trained in traditional Finnish sauna culture and completed her wellness facilitation certification in Helsinki. With over eight years of experience, she believes that heat rituals are one of nature\'s most powerful tools for stress recovery and community.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  themba: {
    id: 'themba',
    name: 'Themba Dlamini',
    role: 'Cold Therapy & Recovery Specialist',
    bio: 'Themba is a certified cold-water immersion therapist and former long-distance athlete. He draws on sports science and Wim Hof Method training to help clients use contrast therapy for faster recovery, mental resilience, and mood regulation.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  priya: {
    id: 'priya',
    name: 'Priya Naidoo',
    role: 'Yoga & Mindfulness Teacher',
    bio: 'Priya holds a 500-hour RYT qualification and has studied Yin and Vinyasa yoga in Mysore, India. Her classes blend mindful movement with breathwork cues, making them accessible to beginners while still challenging for advanced practitioners.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Louw',
    role: 'Breathwork & Meditation Facilitator',
    bio: 'Marcus is a trained facilitator in Holotropic Breathwork, Box Breathing, and guided meditation. After a decade in corporate finance, he retrained to help high-performers reconnect with their nervous systems through conscious breathing techniques.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
};

// ── Category hero images ─────────────────────────────────────────────────────

export const CATEGORY_IMAGES: Record<Category, string> = {
  Sauna: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop',
  'Cold Plunge': 'https://images.unsplash.com/photo-1455793082547-f5a2789e7c0e?w=800&h=500&fit=crop',
  Yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
  Breathwork: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
};

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  Sauna:       { bg: 'bg-wood-lighter',  text: 'text-wood-dark',  border: 'border-wood-light' },
  'Cold Plunge': { bg: 'bg-blue-50',     text: 'text-blue-700',   border: 'border-blue-200' },
  Yoga:        { bg: 'bg-sage-lighter',  text: 'text-sage-dark',  border: 'border-sage-light' },
  Breathwork:  { bg: 'bg-purple-50',     text: 'text-purple-700', border: 'border-purple-200' },
};

// ── Sessions ─────────────────────────────────────────────────────────────────

export const SESSIONS: Session[] = [
  // ── SAUNA ────────────────────────────────────────────────────
  {
    id: 's1',
    name: 'Traditional Finnish Sauna',
    category: 'Sauna',
    description:
      'Step into an authentic Finnish löyly experience. This guided session takes you through the full heat ritual — including proper sauna etiquette, timed rounds, and a cool-down protocol. Heated birch branches (whisks) are available on request. Ideal for first-timers and seasoned sauna lovers alike.',
    date: '2026-04-03',
    startTime: '08:00',
    endTime: '09:30',
    durationMinutes: 90,
    instructor: INSTRUCTORS.annika,
    spotsTotal: 12,
    spotsRemaining: 5,
    priceZAR: 250,
    heroImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop',
    whatToBring: ['Towel (two if possible)', 'Swimwear or sarong', 'Water bottle', 'Flip-flops', 'Open mind'],
  },
  {
    id: 's2',
    name: 'Infrared Sauna Journey',
    category: 'Sauna',
    description:
      'Unlike traditional saunas, infrared technology heats your body directly at a lower ambient temperature — making it highly accessible for those sensitive to intense heat. This session focuses on deep-tissue detoxification and uses curated sound healing to enhance your relaxation.',
    date: '2026-04-05',
    startTime: '10:00',
    endTime: '11:00',
    durationMinutes: 60,
    instructor: INSTRUCTORS.annika,
    spotsTotal: 8,
    spotsRemaining: 3,
    priceZAR: 300,
    heroImage: 'https://images.unsplash.com/photo-1579547657220-cf6c0d89e2b9?w=800&h=500&fit=crop',
    whatToBring: ['Light towel', 'Loose clothing for after', 'Water bottle'],
  },
  {
    id: 's3',
    name: 'Sauna & Steam Ritual',
    category: 'Sauna',
    description:
      'A luxurious 90-minute journey combining dry Finnish sauna heat with aromatic eucalyptus steam. The session alternates between hot and cool environments to stimulate circulation and deeply cleanse the skin. Ends with a warm herbal tea ceremony.',
    date: '2026-04-07',
    startTime: '17:00',
    endTime: '18:30',
    durationMinutes: 90,
    instructor: INSTRUCTORS.annika,
    spotsTotal: 10,
    spotsRemaining: 7,
    priceZAR: 350,
    heroImage: 'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?w=800&h=500&fit=crop',
    whatToBring: ['Two towels', 'Swimwear', 'Water bottle', 'Any personal skin products'],
  },

  // ── COLD PLUNGE ───────────────────────────────────────────────
  {
    id: 'c1',
    name: 'Guided Ice Bath Immersion',
    category: 'Cold Plunge',
    description:
      'A structured cold-water immersion experience led by Themba. You\'ll learn proper breathing techniques before and during the plunge, understand the science of cold shock response, and build mental resilience through controlled exposure. Suitable for complete beginners.',
    date: '2026-04-03',
    startTime: '07:00',
    endTime: '08:00',
    durationMinutes: 60,
    instructor: INSTRUCTORS.themba,
    spotsTotal: 8,
    spotsRemaining: 4,
    priceZAR: 200,
    heroImage: 'https://images.unsplash.com/photo-1455793082547-f5a2789e7c0e?w=800&h=500&fit=crop',
    whatToBring: ['Swimwear', 'Warm dry clothes for after', 'Towel', 'Water bottle'],
  },
  {
    id: 'c2',
    name: 'Cold Plunge & Recovery',
    category: 'Cold Plunge',
    description:
      'A recovery-focused session designed for athletes and active individuals. Combines targeted cold immersion with static stretching and breathing protocols to flush lactic acid, reduce inflammation, and accelerate recovery.',
    date: '2026-04-06',
    startTime: '06:30',
    endTime: '07:30',
    durationMinutes: 60,
    instructor: INSTRUCTORS.themba,
    spotsTotal: 10,
    spotsRemaining: 6,
    priceZAR: 180,
    heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop',
    whatToBring: ['Swimwear', 'Warm towel', 'Foam roller (optional)', 'Protein snack for after'],
  },
  {
    id: 'c3',
    name: 'Contrast Therapy Circuit',
    category: 'Cold Plunge',
    description:
      'The ultimate contrast experience — alternating between our 90°C Finnish sauna and a 10°C cold plunge pool across three carefully timed rounds. This circuit is the gold standard for cardiovascular conditioning, mood uplift, and skin health.',
    date: '2026-04-08',
    startTime: '09:00',
    endTime: '10:30',
    durationMinutes: 90,
    instructor: INSTRUCTORS.themba,
    spotsTotal: 12,
    spotsRemaining: 8,
    priceZAR: 380,
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    whatToBring: ['Swimwear', 'Two towels', 'Water bottle', 'Warm layers for after'],
  },

  // ── YOGA ──────────────────────────────────────────────────────
  {
    id: 'y1',
    name: 'Sunrise Vinyasa Flow',
    category: 'Yoga',
    description:
      'Start your day with an energising vinyasa flow as the sun rises over the Highveld. This dynamic class links breath with movement through a creative sequence of sun salutations, standing postures, and heart openers. All levels welcome — modifications provided throughout.',
    date: '2026-04-04',
    startTime: '06:30',
    endTime: '07:30',
    durationMinutes: 60,
    instructor: INSTRUCTORS.priya,
    spotsTotal: 14,
    spotsRemaining: 9,
    priceZAR: 200,
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    whatToBring: ['Yoga mat', 'Comfortable activewear', 'Small towel', 'Water bottle'],
  },
  {
    id: 'y2',
    name: 'Restorative Yin Yoga',
    category: 'Yoga',
    description:
      'Yin yoga is a slow, meditative practice that targets the deep connective tissues of the body. Poses are held for 3–5 minutes each, encouraging deep release and nervous system down-regulation. Perfect after a sauna session or a long week.',
    date: '2026-04-05',
    startTime: '18:00',
    endTime: '19:15',
    durationMinutes: 75,
    instructor: INSTRUCTORS.priya,
    spotsTotal: 12,
    spotsRemaining: 2,
    priceZAR: 220,
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
    whatToBring: ['Yoga mat', 'Blanket or large towel', 'Bolster (provided if needed)', 'Comfortable, loose clothing'],
  },
  {
    id: 'y3',
    name: 'Power Flow Yoga',
    category: 'Yoga',
    description:
      'A challenging, sweat-inducing power vinyasa class for intermediate and advanced practitioners. Expect creative sequencing, arm balances, inversions, and core work. Priya\'s teaching style is precise, encouraging, and infused with Ashtanga roots.',
    date: '2026-04-09',
    startTime: '07:00',
    endTime: '08:15',
    durationMinutes: 75,
    instructor: INSTRUCTORS.priya,
    spotsTotal: 12,
    spotsRemaining: 5,
    priceZAR: 230,
    heroImage: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&h=500&fit=crop',
    whatToBring: ['Yoga mat', 'Grip towel', 'Water bottle', 'Activewear you can sweat in'],
  },

  // ── BREATHWORK ────────────────────────────────────────────────
  {
    id: 'b1',
    name: 'Box Breathwork Fundamentals',
    category: 'Breathwork',
    description:
      'An entry-level breathwork workshop introducing the Box Breathing technique (4-4-4-4) — made famous by US Navy SEALs for stress and anxiety management. Marcus walks you through the science, guides you through multiple rounds, and finishes with integration journaling.',
    date: '2026-04-04',
    startTime: '18:30',
    endTime: '19:30',
    durationMinutes: 60,
    instructor: INSTRUCTORS.marcus,
    spotsTotal: 16,
    spotsRemaining: 11,
    priceZAR: 180,
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
    whatToBring: ['Comfortable clothes', 'Yoga mat or blanket to lie on', 'Journal and pen', 'Open curiosity'],
  },
  {
    id: 'b2',
    name: 'Wim Hof Breathing Method',
    category: 'Breathwork',
    description:
      'Based on the internationally recognised Wim Hof Method, this session guides participants through the three pillars: controlled breathing, cold exposure mindset, and meditation. Experience the intense clarity and energy surge that follows a full breathwork set.',
    date: '2026-04-06',
    startTime: '07:00',
    endTime: '08:00',
    durationMinutes: 60,
    instructor: INSTRUCTORS.marcus,
    spotsTotal: 14,
    spotsRemaining: 7,
    priceZAR: 220,
    heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop',
    whatToBring: ['Comfortable clothes', 'Mat or cushion', 'Water bottle', 'Note: do NOT do on a full stomach'],
  },
  {
    id: 'b3',
    name: 'Sound & Breathwork Journey',
    category: 'Breathwork',
    description:
      'A deeply immersive 90-minute experience combining active breathwork rounds with live crystal singing bowl sound healing. Participants are guided into a state of deep relaxation and heightened awareness. Not suitable for those with epilepsy, cardiovascular conditions, or pregnancy.',
    date: '2026-04-08',
    startTime: '18:30',
    endTime: '20:00',
    durationMinutes: 90,
    instructor: INSTRUCTORS.marcus,
    spotsTotal: 12,
    spotsRemaining: 4,
    priceZAR: 350,
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop',
    whatToBring: ['Comfortable, warm clothing', 'Mat, cushion & blanket', 'Eye mask (optional)', 'No devices in session'],
  },
  {
    id: 'b4',
    name: 'Morning Pranayama & Meditation',
    category: 'Breathwork',
    description:
      'A gentle but powerful morning practice drawing on classical yogic pranayama techniques — Nadi Shodhana, Kapalabhati, and Ujjayi — followed by a 20-minute guided Yoga Nidra relaxation. Perfect as a weekday reset before a busy day.',
    date: '2026-04-09',
    startTime: '06:30',
    endTime: '07:30',
    durationMinutes: 60,
    instructor: INSTRUCTORS.marcus,
    spotsTotal: 16,
    spotsRemaining: 10,
    priceZAR: 160,
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop',
    whatToBring: ['Mat or cushion', 'Blanket', 'Comfortable loose clothing'],
  },
];

// ── Featured / promoted sessions (shown on home screen) ─────────────────────

export const FEATURED_SESSION_IDS = ['s1', 'c3', 'b3'];

// ── Dummy authenticated user ─────────────────────────────────────────────────

export const DUMMY_USER = {
  firstName: 'Sarah',
  lastName: 'Müller',
  email: 'sarah.muller@example.com',
  membershipTier: 'Regular' as const,
  avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face',
};

// ── Membership tiers info ────────────────────────────────────────────────────

export const MEMBERSHIP_TIERS = {
  Explorer: {
    label: 'Explorer',
    description: 'Drop-in visitor',
    color: 'bg-stone-lighter text-stone',
  },
  Regular: {
    label: 'Regular',
    description: '4 sessions / month',
    color: 'bg-wood-lighter text-wood-dark',
  },
  Member: {
    label: 'Member',
    description: '8 sessions / month',
    color: 'bg-sage-lighter text-sage-dark',
  },
  Sanctuary: {
    label: 'Sanctuary',
    description: 'Unlimited access',
    color: 'bg-charcoal text-cream',
  },
};
