# Anne Wellness

A polished mobile-first wellness booking app for **Anne Wellness**, a premium sauna and wellness centre in the northern suburbs of Johannesburg, South Africa.

Built with React + TypeScript + Vite + Tailwind CSS, with a Scandinavian-minimal design language.

---

## Features

| Screen | Description |
|---|---|
| **Login** | Email/password + Google & Apple social login (dummy — any input works) |
| **Home** | Personalised greeting, category tiles, featured sessions, upcoming booking summary |
| **Browse** | Full session schedule filterable by category and date |
| **Session Detail** | Hero image, description, instructor bio, what to bring, confirm booking |
| **My Bookings** | Upcoming (cancellable) and past (book-again) sessions |
| **Profile** | Avatar, membership tier, settings links, logout |

### Sessions & categories
- **Sauna** — Traditional Finnish Sauna, Infrared Sauna Journey, Sauna & Steam Ritual
- **Cold Plunge** — Guided Ice Bath Immersion, Cold Plunge & Recovery, Contrast Therapy Circuit
- **Yoga** — Sunrise Vinyasa Flow, Restorative Yin Yoga, Power Flow Yoga
- **Breathwork** — Box Breathwork Fundamentals, Wim Hof Method, Sound & Breathwork Journey, Morning Pranayama

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **React Router v6** (client-side routing)
- All data is hardcoded mock data — no backend required

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To build for production:

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── context/
│   └── AppContext.tsx     # Auth state & bookings (React Context)
├── data/
│   └── mockData.ts        # All mock sessions, instructors, categories
├── types/
│   └── index.ts           # TypeScript interfaces
├── components/
│   ├── BottomNav.tsx      # Fixed mobile bottom tab bar
│   ├── CategoryBadge.tsx  # Coloured category pill
│   ├── CategoryTile.tsx   # Home screen quick-access tiles
│   ├── SessionCard.tsx    # Session list card (compact & full)
│   └── BookingCard.tsx    # Booking list card with actions
├── pages/
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── BrowsePage.tsx
│   ├── SessionDetailPage.tsx
│   ├── BookingsPage.tsx
│   └── ProfilePage.tsx
├── App.tsx                # Router + auth guard
├── main.tsx               # Entry point
└── index.css              # Tailwind + global styles
```

---

## Design

- **Colour palette:** warm creams, muted sage greens, light wood tones, charcoal text
- **Typography:** DM Sans (Google Fonts)
- **Aesthetic:** Nordic spa — generous whitespace, rounded corners, soft shadows
- **Layout:** Mobile-first (max-width 448 px), responsive on desktop
- **Navigation:** Fixed bottom tab bar on mobile

---

*Anne Wellness · Johannesburg · Northern Suburbs · "Find your calm. Embrace the contrast."*
