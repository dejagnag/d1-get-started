/**
 * Mock data for Anne Wellness — full week schedule with multiple sessions per day.
 * Today is 2 April 2026. Sessions run Thu 2 Apr → Thu 9 Apr.
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

// ── Category images ───────────────────────────────────────────────────────────
// Plato-inspired: bright, clean, architecturally minimal

export const CATEGORY_IMAGES: Record<Category, string> = {
  // Light wood sauna bench — warm natural light, clean Scandi lines
  Sauna: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop',
  // Outdoor wooden cold plunge tub — natural setting, crisp water
  'Cold Plunge': 'https://images.unsplash.com/photo-1612540139110-4f9b3b85b102?w=800&h=500&fit=crop',
  // Bright yoga studio with natural light streaming through large windows
  Yoga: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=500&fit=crop',
  // Serene person seated outdoors in soft morning light — breathwork/meditation
  Breathwork: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&h=500&fit=crop',
};

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  Sauna:         { bg: 'bg-wood-lighter',  text: 'text-wood-dark',  border: 'border-wood-light' },
  'Cold Plunge': { bg: 'bg-sky-50',        text: 'text-sky-700',    border: 'border-sky-200' },
  Yoga:          { bg: 'bg-sage-lighter',  text: 'text-sage-dark',  border: 'border-sage-light' },
  Breathwork:    { bg: 'bg-purple-50',     text: 'text-purple-700', border: 'border-purple-200' },
};

// ── Session hero images (one clean image per session type) ────────────────────

const IMG = {
  saunaFinnish:   'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop',
  saunaInfrared:  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop',
  saunaSteam:     'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&h=500&fit=crop',
  coldPlunge:     'https://images.unsplash.com/photo-1612540139110-4f9b3b85b102?w=800&h=500&fit=crop',
  coldRecovery:   'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=800&h=500&fit=crop',
  coldContrast:   'https://images.unsplash.com/photo-1575377222312-dd1a63a51638?w=800&h=500&fit=crop',
  yogaVinyasa:    'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=500&fit=crop',
  yogaYin:        'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=500&fit=crop',
  yogaPower:      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&h=500&fit=crop',
  breathBox:      'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&h=500&fit=crop',
  breathWimHof:   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
  breathSound:    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=500&fit=crop',
  breathPrana:    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop',
};

// ── Session descriptions ──────────────────────────────────────────────────────

const DESC = {
  saunaFinnish: 'Step into an authentic Finnish löyly experience. This guided session takes you through the full heat ritual — including proper sauna etiquette, timed rounds, and a cool-down protocol. Heated birch branches (whisks) are available on request.',
  saunaInfrared: 'Infrared technology heats your body directly at a lower ambient temperature — highly accessible for those sensitive to intense heat. This session focuses on deep-tissue detoxification with curated sound healing.',
  saunaSteam: 'A luxurious journey combining dry Finnish sauna heat with aromatic eucalyptus steam. The session alternates between hot and cool environments to stimulate circulation and deeply cleanse the skin. Ends with a warm herbal tea ceremony.',
  coldPlunge: 'A structured cold-water immersion experience. You\'ll learn proper breathing techniques before and during the plunge, understand the science of cold shock response, and build mental resilience through controlled exposure.',
  coldRecovery: 'A recovery-focused session for athletes. Combines targeted cold immersion with static stretching and breathing protocols to flush lactic acid, reduce inflammation, and accelerate recovery.',
  coldContrast: 'The ultimate contrast experience — alternating between our 90°C Finnish sauna and a 10°C cold plunge across three timed rounds. Gold standard for cardiovascular conditioning, mood uplift, and skin health.',
  yogaVinyasa: 'An energising vinyasa flow linking breath with movement through sun salutations, standing postures, and heart openers. All levels welcome — modifications provided throughout.',
  yogaYin: 'A slow, meditative practice targeting the deep connective tissues. Poses are held for 3–5 minutes each, encouraging deep release and nervous system down-regulation. Perfect after a sauna session.',
  yogaPower: 'A challenging power vinyasa for intermediate and advanced practitioners. Expect arm balances, inversions, and core work. Precise, encouraging, infused with Ashtanga roots.',
  breathBox: 'Introducing Box Breathing (4-4-4-4) — the technique used by Navy SEALs for stress management. Marcus walks you through the science, guides multiple rounds, and finishes with integration journaling.',
  breathWimHof: 'Based on the Wim Hof Method — controlled breathing, cold exposure mindset, and meditation. Experience the intense clarity and energy surge that follows a full breathwork set.',
  breathSound: 'An immersive 90-minute experience combining active breathwork with live crystal singing bowl sound healing. Guided into a state of deep relaxation and heightened awareness.',
  breathPrana: 'Classical yogic pranayama — Nadi Shodhana, Kapalabhati, and Ujjayi — followed by a 20-minute guided Yoga Nidra relaxation. A weekday reset before a busy day.',
};

const BRING = {
  sauna: ['Towel (two if possible)', 'Swimwear or sarong', 'Water bottle', 'Flip-flops'],
  cold: ['Swimwear', 'Warm dry clothes for after', 'Towel', 'Water bottle'],
  yoga: ['Yoga mat', 'Comfortable activewear', 'Small towel', 'Water bottle'],
  breathwork: ['Comfortable clothes', 'Yoga mat or blanket', 'Water bottle'],
};

// ── Helper to create a session ────────────────────────────────────────────────

let _id = 0;
function s(
  name: string,
  category: Category,
  desc: string,
  date: string,
  start: string,
  end: string,
  dur: number,
  instructor: Instructor,
  total: number,
  remaining: number,
  price: number,
  img: string,
  bring: string[],
): Session {
  return {
    id: `s${++_id}`,
    name, category, description: desc, date,
    startTime: start, endTime: end, durationMinutes: dur,
    instructor, spotsTotal: total, spotsRemaining: remaining,
    priceZAR: price, heroImage: img, whatToBring: bring,
  };
}

// ── Full weekly schedule (Thu 2 Apr → Thu 9 Apr 2026) ────────────────────────

export const SESSIONS: Session[] = [

  // ── Thursday 2 Apr (today) ────────────────────────────────────────────────
  s('Morning Pranayama & Breath',   'Breathwork', DESC.breathPrana,   '2026-04-02', '06:30', '07:30', 60,  INSTRUCTORS.marcus,  16, 10, 160, IMG.breathPrana,  BRING.breathwork),
  s('Guided Ice Bath Immersion',    'Cold Plunge', DESC.coldPlunge,   '2026-04-02', '07:00', '08:00', 60,  INSTRUCTORS.themba,   8,  4, 200, IMG.coldPlunge,   BRING.cold),
  s('Traditional Finnish Sauna',   'Sauna',       DESC.saunaFinnish, '2026-04-02', '09:00', '10:30', 90,  INSTRUCTORS.annika,  12,  5, 250, IMG.saunaFinnish, BRING.sauna),
  s('Restorative Yin Yoga',        'Yoga',        DESC.yogaYin,      '2026-04-02', '18:00', '19:15', 75,  INSTRUCTORS.priya,   12,  7, 220, IMG.yogaYin,      BRING.yoga),
  s('Box Breathwork Fundamentals', 'Breathwork',  DESC.breathBox,    '2026-04-02', '18:30', '19:30', 60,  INSTRUCTORS.marcus,  16, 11, 180, IMG.breathBox,    BRING.breathwork),

  // ── Friday 3 Apr ─────────────────────────────────────────────────────────
  s('Sunrise Vinyasa Flow',        'Yoga',        DESC.yogaVinyasa,  '2026-04-03', '06:30', '07:30', 60,  INSTRUCTORS.priya,   14,  9, 200, IMG.yogaVinyasa,  BRING.yoga),
  s('Cold Plunge & Recovery',      'Cold Plunge', DESC.coldRecovery, '2026-04-03', '07:00', '08:00', 60,  INSTRUCTORS.themba,  10,  6, 180, IMG.coldRecovery, BRING.cold),
  s('Infrared Sauna Journey',      'Sauna',       DESC.saunaInfrared,'2026-04-03', '10:00', '11:00', 60,  INSTRUCTORS.annika,   8,  3, 300, IMG.saunaInfrared,BRING.sauna),
  s('Power Flow Yoga',             'Yoga',        DESC.yogaPower,    '2026-04-03', '17:30', '18:45', 75,  INSTRUCTORS.priya,   12,  5, 230, IMG.yogaPower,    BRING.yoga),
  s('Sound & Breathwork Journey',  'Breathwork',  DESC.breathSound,  '2026-04-03', '19:00', '20:30', 90,  INSTRUCTORS.marcus,  12,  4, 350, IMG.breathSound,  BRING.breathwork),

  // ── Saturday 4 Apr ───────────────────────────────────────────────────────
  s('Traditional Finnish Sauna',   'Sauna',       DESC.saunaFinnish, '2026-04-04', '08:00', '09:30', 90,  INSTRUCTORS.annika,  12,  8, 250, IMG.saunaFinnish, BRING.sauna),
  s('Guided Ice Bath Immersion',   'Cold Plunge', DESC.coldPlunge,   '2026-04-04', '09:00', '10:00', 60,  INSTRUCTORS.themba,   8,  5, 200, IMG.coldPlunge,   BRING.cold),
  s('Sunrise Vinyasa Flow',        'Yoga',        DESC.yogaVinyasa,  '2026-04-04', '09:30', '10:30', 60,  INSTRUCTORS.priya,   14, 10, 200, IMG.yogaVinyasa,  BRING.yoga),
  s('Box Breathwork Fundamentals', 'Breathwork',  DESC.breathBox,    '2026-04-04', '11:00', '12:00', 60,  INSTRUCTORS.marcus,  16, 12, 180, IMG.breathBox,    BRING.breathwork),
  s('Sauna & Steam Ritual',        'Sauna',       DESC.saunaSteam,   '2026-04-04', '15:00', '16:30', 90,  INSTRUCTORS.annika,  10,  7, 350, IMG.saunaSteam,   BRING.sauna),
  s('Restorative Yin Yoga',        'Yoga',        DESC.yogaYin,      '2026-04-04', '17:00', '18:15', 75,  INSTRUCTORS.priya,   12,  9, 220, IMG.yogaYin,      BRING.yoga),

  // ── Sunday 5 Apr ─────────────────────────────────────────────────────────
  s('Morning Pranayama & Breath',  'Breathwork',  DESC.breathPrana,  '2026-04-05', '08:00', '09:00', 60,  INSTRUCTORS.marcus,  16, 13, 160, IMG.breathPrana,  BRING.breathwork),
  s('Contrast Therapy Circuit',    'Cold Plunge', DESC.coldContrast, '2026-04-05', '09:00', '10:30', 90,  INSTRUCTORS.themba,  12,  8, 380, IMG.coldContrast, BRING.cold),
  s('Power Flow Yoga',             'Yoga',        DESC.yogaPower,    '2026-04-05', '10:30', '11:45', 75,  INSTRUCTORS.priya,   12,  6, 230, IMG.yogaPower,    BRING.yoga),
  s('Infrared Sauna Journey',      'Sauna',       DESC.saunaInfrared,'2026-04-05', '15:00', '16:00', 60,  INSTRUCTORS.annika,   8,  4, 300, IMG.saunaInfrared,BRING.sauna),

  // ── Monday 6 Apr ─────────────────────────────────────────────────────────
  s('Cold Plunge & Recovery',      'Cold Plunge', DESC.coldRecovery, '2026-04-06', '06:00', '07:00', 60,  INSTRUCTORS.themba,  10,  7, 180, IMG.coldRecovery, BRING.cold),
  s('Sunrise Vinyasa Flow',        'Yoga',        DESC.yogaVinyasa,  '2026-04-06', '06:30', '07:30', 60,  INSTRUCTORS.priya,   14, 11, 200, IMG.yogaVinyasa,  BRING.yoga),
  s('Traditional Finnish Sauna',   'Sauna',       DESC.saunaFinnish, '2026-04-06', '09:00', '10:30', 90,  INSTRUCTORS.annika,  12,  9, 250, IMG.saunaFinnish, BRING.sauna),
  s('Box Breathwork Fundamentals', 'Breathwork',  DESC.breathBox,    '2026-04-06', '12:00', '13:00', 60,  INSTRUCTORS.marcus,  16, 14, 180, IMG.breathBox,    BRING.breathwork),
  s('Power Flow Yoga',             'Yoga',        DESC.yogaPower,    '2026-04-06', '18:00', '19:15', 75,  INSTRUCTORS.priya,   12,  8, 230, IMG.yogaPower,    BRING.yoga),
  s('Wim Hof Breathing Method',    'Breathwork',  DESC.breathWimHof, '2026-04-06', '19:00', '20:00', 60,  INSTRUCTORS.marcus,  14,  7, 220, IMG.breathWimHof, BRING.breathwork),

  // ── Tuesday 7 Apr ────────────────────────────────────────────────────────
  s('Morning Pranayama & Breath',  'Breathwork',  DESC.breathPrana,  '2026-04-07', '06:30', '07:30', 60,  INSTRUCTORS.marcus,  16, 10, 160, IMG.breathPrana,  BRING.breathwork),
  s('Guided Ice Bath Immersion',   'Cold Plunge', DESC.coldPlunge,   '2026-04-07', '07:00', '08:00', 60,  INSTRUCTORS.themba,   8,  3, 200, IMG.coldPlunge,   BRING.cold),
  s('Infrared Sauna Journey',      'Sauna',       DESC.saunaInfrared,'2026-04-07', '09:00', '10:00', 60,  INSTRUCTORS.annika,   8,  5, 300, IMG.saunaInfrared,BRING.sauna),
  s('Restorative Yin Yoga',        'Yoga',        DESC.yogaYin,      '2026-04-07', '17:30', '18:45', 75,  INSTRUCTORS.priya,   12,  6, 220, IMG.yogaYin,      BRING.yoga),
  s('Sound & Breathwork Journey',  'Breathwork',  DESC.breathSound,  '2026-04-07', '18:30', '20:00', 90,  INSTRUCTORS.marcus,  12,  2, 350, IMG.breathSound,  BRING.breathwork),

  // ── Wednesday 8 Apr ──────────────────────────────────────────────────────
  s('Cold Plunge & Recovery',      'Cold Plunge', DESC.coldRecovery, '2026-04-08', '06:00', '07:00', 60,  INSTRUCTORS.themba,  10,  8, 180, IMG.coldRecovery, BRING.cold),
  s('Sunrise Vinyasa Flow',        'Yoga',        DESC.yogaVinyasa,  '2026-04-08', '07:00', '08:00', 60,  INSTRUCTORS.priya,   14,  9, 200, IMG.yogaVinyasa,  BRING.yoga),
  s('Sauna & Steam Ritual',        'Sauna',       DESC.saunaSteam,   '2026-04-08', '10:00', '11:30', 90,  INSTRUCTORS.annika,  10,  6, 350, IMG.saunaSteam,   BRING.sauna),
  s('Box Breathwork Fundamentals', 'Breathwork',  DESC.breathBox,    '2026-04-08', '12:00', '13:00', 60,  INSTRUCTORS.marcus,  16, 12, 180, IMG.breathBox,    BRING.breathwork),
  s('Contrast Therapy Circuit',    'Cold Plunge', DESC.coldContrast, '2026-04-08', '17:00', '18:30', 90,  INSTRUCTORS.themba,  12,  9, 380, IMG.coldContrast, BRING.cold),
  s('Wim Hof Breathing Method',    'Breathwork',  DESC.breathWimHof, '2026-04-08', '19:00', '20:00', 60,  INSTRUCTORS.marcus,  14,  7, 220, IMG.breathWimHof, BRING.breathwork),

  // ── Thursday 9 Apr ───────────────────────────────────────────────────────
  s('Morning Pranayama & Breath',  'Breathwork',  DESC.breathPrana,  '2026-04-09', '06:30', '07:30', 60,  INSTRUCTORS.marcus,  16, 11, 160, IMG.breathPrana,  BRING.breathwork),
  s('Power Flow Yoga',             'Yoga',        DESC.yogaPower,    '2026-04-09', '07:00', '08:15', 75,  INSTRUCTORS.priya,   12,  5, 230, IMG.yogaPower,    BRING.yoga),
  s('Traditional Finnish Sauna',   'Sauna',       DESC.saunaFinnish, '2026-04-09', '09:00', '10:30', 90,  INSTRUCTORS.annika,  12,  8, 250, IMG.saunaFinnish, BRING.sauna),
  s('Guided Ice Bath Immersion',   'Cold Plunge', DESC.coldPlunge,   '2026-04-09', '12:00', '13:00', 60,  INSTRUCTORS.themba,   8,  4, 200, IMG.coldPlunge,   BRING.cold),
  s('Restorative Yin Yoga',        'Yoga',        DESC.yogaYin,      '2026-04-09', '18:00', '19:15', 75,  INSTRUCTORS.priya,   12,  7, 220, IMG.yogaYin,      BRING.yoga),
  s('Sound & Breathwork Journey',  'Breathwork',  DESC.breathSound,  '2026-04-09', '19:00', '20:30', 90,  INSTRUCTORS.marcus,  12,  5, 350, IMG.breathSound,  BRING.breathwork),
];

// ── Featured session IDs (for home screen) ───────────────────────────────────

export const FEATURED_SESSION_IDS = ['s3', 's19', 's28']; // Finnish Sauna, Contrast, Sound Journey

// ── Membership tiers ─────────────────────────────────────────────────────────

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
