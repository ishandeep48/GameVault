# GameVault — Frontend Implementation Plan

## Overview

GameVault is a game-library and progress-tracking application. Users maintain a personal library, track play status, log mission progress, write reviews with nested comments, and react to content.

**Backend:** FastAPI + PostgreSQL  
**Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + React Router + Lucide Icons

---

## Phase 0 — Project Setup ✅ COMPLETED

- [x] Initialize Vite + React + TypeScript project
- [x] Install and configure Tailwind CSS v3
- [x] Install React Router DOM
- [x] Install Lucide React icons
- [x] Create folder structure (components, pages, services, hooks, types, utils, assets)
- [x] Configure Vite with path aliases (`@/`)
- [x] Set up global CSS with design tokens and Tailwind directives
- [x] Implement dark-first theme foundation
- [x] Create reusable UI foundations:
  - Skeleton component (respects `prefers-reduced-motion`)
  - EmptyState component
  - ErrorState component
- [x] Set up routing with placeholder pages for all V1 routes
- [x] Create mock data service architecture (api, games, missions, progress, reviews)
- [x] Verify project builds and runs without errors

---

## Phase 1 — Design System & Component Library ✅ COMPLETED

- [x] Finalize color palette and design tokens in CSS variables + Tailwind config
- [x] Build base UI components:
  - Button (variants: primary, secondary, ghost, danger, icon-only)
  - Input / Textarea / Select
  - Badge / Status pill (with status labels and icons)
  - Card (default, elevated, glass variants + CardHeader/CardTitle/CardDescription/CardContent/CardFooter)
  - Avatar (with fallback initials)
  - Modal / Dialog (accessible with focus trap, escape key, overlay click)
  - Tabs (keyboard accessible tablist/tabpanel pattern)
  - Tooltip (lightweight, supplementary only)
- [x] Create layout components:
  - Header / Navbar (responsive with mobile hamburger menu)
  - Sidebar (collapsible, desktop-only toggle)
  - Footer
  - PageWrapper with consistent padding/margins
- [x] Build domain-specific foundations:
  - GameCard (cover art, title, genres, status badge, progress bar, current mission)
  - MissionRow (completion checkbox, order number, expand/collapse for acts, current state highlight)
  - ReviewCard (avatar, username, star rating, content with read-more, like/dislike/reply actions)
- [x] Enhanced skeleton components:
  - Skeleton (base primitive with rect/circle/rounded variants)
  - SkeletonText (multi-line text bars)
  - SkeletonAvatar
  - SkeletonImage (with aspect ratio support)
- [x] Toast notification system (success/error/warning/info, auto-dismiss, accessible)
- [x] Progress bar component (accessible with percentage label, multiple sizes and colors)
- [x] Verify build passes with zero TypeScript errors
- [x] Verify dev server starts without console errors

---

## Phase 2 — Layout & Navigation Shell ✅ COMPLETED

- [x] Implement responsive navigation shell (AppShell)
- [x] Mobile-first responsive breakpoints: 320px, 375px, 768px, 1024px, 1440px+
- [x] Sticky header with GameVault branding
- [x] Active route highlighting in nav (desktop sidebar + mobile bottom bar)
- [x] Breadcrumb component for nested routes (`/games/:id`, `/games/:id/missions/:id`)
- [x] Desktop layout: Header + Sidebar + Content
- [x] Tablet layout: Header + Content (sidebar hidden)
- [x] Mobile layout: Header + BottomNav + Content

---

## Phase 3 — Home Page ✅ COMPLETED

- [x] Continue Playing hero section with game artwork, progress bar, and continue button
- [x] Your Library compact section (horizontal scrollable cards)
- [x] Recent Activity feed with Lucide icons and relative timestamps
- [x] Community Reviews section using existing ReviewCard component
- [x] Progress Overview stats (Playing, Completed, On Hold, Plan to Play counts + weekly missions)
- [x] Mock data service (`homeService.ts`) with realistic mock data
- [x] Loading states for all sections (skeleton components)
- [x] Empty states for all sections (EmptyState component)
- [x] Error state with retry functionality
- [x] Responsive layout: single-column mobile, two-column activity/reviews on desktop

---

## Phase 4 — Library Page ✅ COMPLETED

- [x] Page header: title "Library", subtitle "Your games, your progress."
- [x] Search bar with Lucide search icon (case-insensitive, partial match)
- [x] Status filter pills: All, Playing, On Hold, Dropped, Plan to Play, Completed
- [x] Sort dropdown: Recently Updated, Alphabetically, Progress
- [x] Responsive game grid using existing GameCard component (2-col mobile → 3-col tablet → 4-col desktop → 5-col xl+)
- [x] Mock data service (`libraryService.ts`) with 12 games across all statuses
- [x] Loading state: skeleton grid matching final layout structure
- [x] Empty states: empty library, no search results, no games for selected status
- [x] Error state with retry functionality
- [x] Game card navigation to `/games/:id` via React Router
- [x] Build verified — zero TypeScript errors, zero build warnings

---

## Phase 5 — Game Details Page

- [ ] Hero banner / cover image area
- [ ] Game info section: title, description, release date, genre tags
- [ ] Status selector (update play status)
- [ ] Progress overview bar
- [ ] Tabs: Overview | Missions | Reviews
- [ ] Review summary with average rating

---

## Phase 6 — Missions Page / Section

- [ ] Mission list grouped by Act/Chapter
- [ ] Collapsible act sections
- [ ] Mission row component: title, order number, completion checkbox
- [ ] Progress indicator per mission
- [ ] Click to navigate to mission detail page

---

## Phase 7 — Mission Detail Page

- [ ] Mission header with title and description
- [ ] Completion toggle
- [ ] Mission review section (write own review)
- [ ] Nested comments / replies for mission reviews
- [ ] Like/dislike reactions on missions

---

## Phase 8 — Reviews System

- [ ] Review card component: author, rating, content, date, reactions
- [ ] Write new review form (star rating + text)
- [ ] Edit own reviews
- [ ] Delete own reviews
- [ ] Nested comment thread with reply functionality
- [ ] Like/dislike toggle on reviews and comments

---

## Phase 9 — Profile Page

- [ ] User profile header: avatar, username, bio
- [ ] Stats overview: games completed, total playtime, review count
- [ ] Library tab (user's personal library)
- [ ] Reviews tab (user's written reviews)
- [ ] Activity timeline (recent actions)

---

## Phase 10 — API Integration

- [ ] Replace mock data with real FastAPI calls
- [ ] Configure axios or fetch wrapper with base URL
- [ ] Implement request/response interceptors
- [ ] Handle auth tokens (JWT) when auth is added
- [ ] Error handling and retry logic
- [ ] Loading states tied to API responses

---

## Phase 11 — Loading / Error / Empty States

- [ ] Integrate Skeleton components across all pages
- [ ] Consistent error state UI with retry buttons
- [ ] Meaningful empty states per page (e.g., "No games in library yet")
- [ ] Toast notification system for user feedback
- [ ] Global error boundary component

---

## Phase 12 — Responsive & Accessibility Audit

- [ ] Test all pages at 320px, 375px, 768px, 1024px, 1440px+
- [ ] Fix horizontal overflow issues
- [ ] Verify keyboard navigation across all interactive elements
- [ ] Check focus states and visible outlines
- [ ] Validate ARIA labels on icon-only controls
- [ ] Ensure sufficient color contrast ratios (WCAG AA)
- [ ] Test with screen reader basics

---

## Phase 13 — Optimization

- [ ] Code splitting via React.lazy() for route-level lazy loading
- [ ] Image optimization and lazy loading
- [ ] Memoize expensive components where needed
- [ ] Bundle size analysis and tree-shaking verification
- [ ] Remove unused dependencies
- [ ] Performance profiling with React DevTools

---

## Out of Scope (V1)

The following are intentionally excluded from V1:

- Recommendations engine
- Game data scraping / auto-importing
- WebRTC (voice/video calls, screen sharing)
- RAG / AI chatbot / AI-generated content
- Machine learning features
- Redis caching
- Microservices architecture
- User authentication (will be added in a later phase)

---

## File Structure

```
frontend/
├── PLAN.md                    # This file — implementation roadmap
├── MODEL_MEMORY.md            # Persistent project memory for the LLM
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   └── favicon.ico
└── src/
    ├── main.tsx               # Application entry point
    ├── App.tsx                # Router setup and root component
    ├── index.css              # Global styles, Tailwind directives, design tokens
    ├── components/
    │   ├── layout/            # Header, Sidebar, Footer, PageWrapper
    │   ├── games/             # GameCard, GameHero, etc.
    │   ├── missions/          # MissionRow, MissionList, ActSection
    │   ├── reviews/           # ReviewCard, ReviewForm, CommentThread
    │   └── ui/                # Shared primitives: Button, Input, Badge, Card, Modal, Tabs, Avatar, Skeleton, EmptyState, ErrorState
    ├── pages/                 # Route-level page components (placeholders now)
    │   ├── HomePage.tsx
    │   ├── LibraryPage.tsx
    │   ├── GameDetailsPage.tsx
    │   ├── MissionDetailPage.tsx
    │   ├── ProfilePage.tsx
    │   └── CommunityPage.tsx
    ├── services/              # API and mock data layer
    │   ├── api.ts             # Base fetch wrapper / axios config
    │   ├── games.ts           # Game-related service functions
    │   ├── missions.ts        # Mission-related service functions
    │   ├── progress.ts        # Progress tracking service functions
    │   └── reviews.ts         # Review and reaction service functions
    ├── hooks/                 # Custom React hooks
    │   └── useMediaQuery.ts   # Responsive breakpoint hook
    ├── types/                 # TypeScript type definitions
    │   ├── game.ts
    │   ├── mission.ts
    │   ├── progress.ts
    │   ├── review.ts
    │   └── index.ts
    ├── utils/                 # Utility functions
    │   └── cn.ts              # Tailwind class merger (clsx + twMerge)
    └── assets/                # Static assets (images, icons, etc.)
```
