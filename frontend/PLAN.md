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

## 🔒 CURRENT PRIORITY: Authentication + Profile

**Status:** Frontend mock authentication implemented. Backend not connected.
**Roadmap Impact:** Normal feature roadmap temporarily paused while authentication/backend work is being developed.

### Authentication Implementation (Mock)

- [x] **Mock Auth Service** (`src/services/authService.ts`)
  - Single source of truth for all auth logic
  - Permanent demo account: `demo@gamevault.local` / `GameVault@123`
  - Temporary signup users created entirely in frontend (no fake database)
  - Session persistence via localStorage
  - Login, signup, session management functions
  - Form validation helpers

- [x] **Auth Context & Hook** (`src/contexts/AuthContext.tsx`, `src/hooks/useAuth.ts`)
  - React Context Provider wrapping the entire app (in `main.tsx`)
  - `useAuth()` hook for accessing auth state and actions
  - `login(user)` — sets authenticated state + persists session
  - `logout()` — clears session + resets state
  - Auto-restores session from localStorage on mount

- [x] **Type Definitions** (`src/types/auth.ts`)
  - `User`, `AuthState`, `LoginFormData`, `SignupFormData`

- [x] **Login Page** (`src/pages/LoginPage.tsx`)
  - Email + Password fields with validation
  - Error display for invalid credentials
  - Loading state during submission
  - Redirects to `/home` on success
  - Link to signup page

- [x] **Signup Page** (`src/pages/SignupPage.tsx`)
  - First Name, Last Name, Date of Birth, Email, Password, Confirm Password
  - Full frontend validation with per-field error messages
  - Duplicate demo email check
  - Loading state during submission
  - Creates temporary mock user session
  - Redirects to `/home` on success
  - Link to login page

- [x] **Auth Layout** (`src/components/layout/AuthLayout.tsx`)
  - Shared centered card layout for auth pages
  - GameVault branding, title, subtitle, footer link
  - Responsive (works 320px → 1440px+)

- [x] **Password Input Component** (`src/components/ui/PasswordInput.tsx`)
  - Password field with show/hide toggle
  - Eye/EyeOff icons from Lucide React
  - Same error/helper-text support as Input component

- [x] **Protected Routes** (`src/components/layout/PrivateRoute.tsx`)
  - Wraps routes that require authentication
  - Redirects unauthenticated users to `/login`
  - Preserves intended destination in `location.state`

- [x] **Protected Routes Configuration** (in `App.tsx`)
  - Public: `/login`, `/signup`, `/home`, `/games/:gameId`, `/games/:gameId/missions/:missionId`, `/community`
  - Auth-gated (shows locked state): `/library`
  - Protected (redirects to login): `/profile`
  - Root `/` redirects to `/home`
  - Catch-all `*` redirects to `/home`

- [x] **Profile Page** (`src/pages/ProfilePage.tsx`)
  - Displays authenticated user's: First Name, Last Name, Email, Date of Birth, Member Since
  - Uses auth context (not hardcoded)
  - Avatar with initials fallback
  - Logout button within profile
  - Security note about mock authentication

- [x] **Application Shell Auth Integration**
  - **Header**: Shows user initials + name dropdown when authenticated; "Sign In" link when not. Dropdown contains Profile and Logout links.
  - **Sidebar**: Shows user info (initials + name) when authenticated; "Sign In" link when not. Logout button in sidebar.
  - **MobileNavigation**: Shows Home/Library/Community/Profile/Logout tabs when authenticated; Home/Community/Sign-In when not (Library requires login).

### Public Browsing + Auth-Gated Features (V1)

- [x] **Public Route Configuration** (`src/App.tsx`)
  - `/home`, `/games/:gameId`, `/games/:gameId/missions/:missionId`, `/community` — fully public, no auth required
  - `/library` — accessible but shows locked overlay when unauthenticated
  - `/profile` — protected route (redirects to `/login`)

- [x] **LockedOverlay Component** (`src/components/ui/LockedOverlay.tsx`)
  - Reusable component for auth-gated sections
  - Shows translucent dark overlay with lock icon, title, description, and login CTA buttons
  - Used on: ContinuePlaying section, LibrarySection, LibraryPage, CommunityPage

- [x] **Home Page Public Behavior** (`src/pages/HomePage.tsx`)
  - Continue Playing — visible but locked overlay when unauthenticated (keeps existing UI underneath)
  - Your Library — visible but locked overlay when unauthenticated (keeps skeleton structure)
  - ActivityFeed — hidden completely when unauthenticated
  - ProgressOverview — hidden completely when unauthenticated
  - CommunityReviews — always visible, readable by all users

- [x] **Library Page Locked State** (`src/pages/LibraryPage.tsx`)
  - Shows locked overlay with "Please Login to Use the Library" message
  - Skeleton/structure remains visible underneath for visual consistency
  - Login and Create Account buttons open respective pages

- [x] **Game Details Public** (`src/pages/GameDetailsPage.tsx`)
  - Full game info, description, metadata — public
  - Missions tab — public browsing (links to mission detail pages)
  - Reviews tab — public reading; like/dislike actions gated with `authRequired` prop on ReviewCard
  - "Add to Library" button visible but navigates to login when unauthenticated

- [x] **Mission Detail Public** (`src/pages/MissionDetailPage.tsx`)
  - Mission info, description — public
  - Reviews section — public reading; interactions gated

- [x] **Community Page Public** (`src/pages/CommunityPage.tsx`)
  - Full community browsing with search
  - All reviews readable by all users
  - Like/dislike/reply actions gated via ReviewCard `authRequired` prop

- [x] **ReviewCard Auth Gating** (`src/components/reviews/ReviewCard.tsx`)
  - New props: `authRequired`, `onAuthRequired`
  - When authRequired is true, action buttons show login hint tooltip and call onAuthRequired callback
  - Works as a reusable abstraction — parent decides what happens (navigate to /login, open modal, etc.)

- [x] **Navigation Auth Gating** (`src/components/layout/Header.tsx`, `Sidebar.tsx`, `MobileNavigation.tsx`)
  - Library nav items redirect to `/login` when unauthenticated (authRequired flag on nav items)
  - Profile nav item redirects to `/login` when unauthenticated
  - Mobile nav hides Library tab for unauthenticated users, shows Sign In button instead

### Files Created
```
src/types/auth.ts                          # Auth type definitions
src/services/authService.ts                # Mock auth service (single source of truth)
src/contexts/AuthContext.tsx               # Auth context provider
src/hooks/useAuth.ts                       # Auth hook (re-exports from context)
src/components/ui/PasswordInput.tsx        # Password field with visibility toggle
src/components/layout/AuthLayout.tsx       # Shared auth page layout
src/components/layout/PrivateRoute.tsx     # Protected route wrapper
src/pages/LoginPage.tsx                    # Login page
src/pages/SignupPage.tsx                   # Signup page
```

### Files Modified
```
src/main.tsx               # Added AuthProvider wrapper
src/App.tsx                # Added auth routes, protected routing, redirects + public browsing routes
src/components/layout/Header.tsx       # User dropdown menu + logout integration + authRequired nav items
src/components/layout/Sidebar.tsx      # User info section + logout button + authRequired nav items
src/components/layout/MobileNavigation.tsx  # Auth-aware navigation tabs (hides Library when unauthenticated)
src/pages/ProfilePage.tsx              # Full profile implementation
src/types/index.ts                     # Added auth type exports
src/components/reviews/ReviewCard.tsx  # Added authRequired + onAuthRequired props for action gating
```

### New Files Created (Public Browsing V1)
```
src/components/ui/LockedOverlay.tsx    # Reusable locked-section overlay component
Logics/AUTH_LOGIC.md                   # Auth logic reference for backend integration
```

### Architecture

**Current (Mock):**
```
React UI
    ↓
Auth Context / Hook
    ↓
Mock Auth Service
    ↓
Hardcoded frontend values + localStorage
```

**Future (Real Backend):**
```
React UI
    ↓
Auth Context / Hook
    ↓
Auth Service
    ↓
FastAPI
    ↓
PostgreSQL
```

The UI layer does not need to be redesigned when the mock service is replaced with the real API.

---

## Phase 5 — Game Details Page ✅ PARTIALLY COMPLETED (Public Browsing V1)

- [x] Hero banner / cover image area (basic implementation)
- [x] Game info section: title, description, release date, genre tags
- [x] Missions tab with act grouping and mission links
- [x] Reviews tab with ReviewCard components
- [ ] Status selector (update play status) — not in V1 public scope
- [ ] Progress overview bar — not in V1 public scope
- [x] "Add to Library" button (auth-gated)
- **Note:** Full Phase 5 implementation (status selector, progress bar, review summary) deferred until backend is connected.

---

## Phase 6 — Missions Page / Section

- [ ] Mission list grouped by Act/Chapter
- [ ] Collapsible act sections
- [ ] Mission row component: title, order number, completion checkbox
- [ ] Progress indicator per mission
- [ ] Click to navigate to mission detail page

---

## Phase 7 — Mission Detail Page ✅ PARTIALLY COMPLETED (Public Browsing V1)

- [x] Mission header with title and description
- [x] Context link back to parent game
- [x] Mission reviews section with ReviewCard components
- [ ] Completion toggle — authenticated only, not in public scope
- [ ] Write own review form — deferred until backend is connected
- [ ] Nested comments / replies for mission reviews — deferred
- **Note:** Full Phase 7 implementation (completion toggle, write review) deferred.

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
- Real backend authentication (mock auth is implemented; FastAPI integration in Phase 10)
- Play status selector & progress bar on Game Details (deferred until backend connected)

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
    │   ├── layout/            # Header, Sidebar, Footer, PageWrapper, AppShell, MobileNavigation, Breadcrumb, AuthLayout, PrivateRoute
    │   ├── games/             # GameCard, GameHero, etc.
    │   ├── missions/          # MissionRow, MissionList, ActSection
    │   ├── reviews/           # ReviewCard, ReviewForm, CommentThread
    │   └── ui/                # Shared primitives: Button, Input, Badge, Card, Modal, Tabs, Avatar, Skeleton, EmptyState, ErrorState, PasswordInput
    ├── pages/                 # Route-level page components (placeholders now)
    │   ├── HomePage.tsx
    │   ├── LibraryPage.tsx
    │   ├── GameDetailsPage.tsx
    │   ├── MissionDetailPage.tsx
    │   ├── ProfilePage.tsx
    │   ├── CommunityPage.tsx
    │   ├── LoginPage.tsx        # Mock login page (Authentication phase)
    │   └── SignupPage.tsx     # Mock signup page (Authentication phase)
    ├── services/              # API and mock data layer
    │   ├── api.ts             # Base fetch wrapper / axios config
    │   ├── games.ts           # Game-related service functions
    │   ├── missions.ts        # Mission-related service functions
    │   ├── progress.ts        # Progress tracking service functions
    │   ├── reviews.ts         # Review and reaction service functions
    │   └── authService.ts     # Mock authentication service (Authentication phase)
    ├── contexts/              # React Context providers
    │   └── AuthContext.tsx    # Authentication context provider (Authentication phase)
    ├── hooks/                 # Custom React hooks
    │   ├── useMediaQuery.ts   # Responsive breakpoint hook
    │   └── useAuth.ts         # Authentication hook (Authentication phase)
    ├── types/                 # TypeScript type definitions
    │   ├── game.ts
    │   ├── mission.ts
    │   ├── progress.ts
    │   ├── review.ts
    │   ├── auth.ts              # Auth types (Authentication phase)
    │   └── index.ts
    ├── utils/                 # Utility functions
    │   └── cn.ts              # Tailwind class merger (clsx + twMerge)
    └── assets/                # Static assets (images, icons, etc.)
```

## Controlled Frontend Audit — Checkpoint (2026-09-19)

**Status: identified, not yet fixed.** The audit found build-blocking TypeScript issues in the game and mission detail pages (incorrect service type references, an undefined `Tabs` component, and an incompatible `MissionRow` call), plus unused imports. The required `Link` import is present in `CommunityPage.tsx`, so the reported runtime `Link is not defined` issue is not reproducible from the current source. Auth audit also found that `LockedOverlay` is rendered as a sibling rather than a true overlay in several places, so it does not reliably cover the underlying personal-content skeleton; the Library page also renders personal mock data while logged out. Existing auth entry points navigate to full pages, while the current requirements call for modal authentication for in-app gated actions. These findings will be handled in controlled groups and documented after validation.

### Group 1 — Routing & Runtime Errors (completed 2026-09-19)

Validated with `npm run build` and `npm run lint`. Corrected the game and mission detail pages to use domain types, added the missing `Tabs` import, passed `MissionRow` the props it accepts, and removed stale imports. The application now builds. Lint reports only existing advisory warnings; no lint errors remain. `CommunityPage.tsx` retains its existing React Router `Link` import.

### Group 2 — Authentication & Public Boundaries (completed 2026-09-19)

Validated with `npm run build` and `npm run lint`. `LockedOverlay` now covers its positioned content instead of creating a separate block. Logged-out Home retains visible Continue Playing and Your Library structures beneath locked overlays while hiding Recent Activity and Progress Overview. Logged-out Library renders a locked skeleton only and avoids fetching personal mock data. Added `LoginModal` for in-app gated actions (including Add to Library and review reactions), preserving direct `/login` and `/signup` pages. Community remains publicly readable without a full-page lock; `/profile` still redirects to `/login` when unauthenticated.

### Groups 3–5 — Architecture, UI, and Consistency (completed 2026-09-19)

Removed the ineffective dynamic service import from the mission page and aligned Home community-review interactions with the same logged-out modal gate. Visual checks confirmed the locked overlays do not displace content, public content remains available, and the Library route presents a non-sensitive skeleton. No broad refactor or backend work was performed. Current known limitations remain mock data/authentication and the absence of implemented review/comment creation flows.

### Navigation polish (completed 2026-09-19)

The Signup form uses John Doe example placeholders. On desktop, the left navigation now collapses into an icon rail using an accessible expand/collapse control, with a dark tinted, translucent glass treatment. Mobile navigation remains unchanged.
