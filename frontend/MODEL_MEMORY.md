# GameVault — Model Memory

## Project Goal

GameVault is a game-library and progress-tracking application. Users maintain a personal game library, track play status across five states (Playing, On Hold, Dropped, Plan to Play, Completed), log mission-by-mission progress organized by Acts/Chapters, write reviews with nested comments, and like/dislike content.

## Current Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Class Merger:** clsx + tailwind-merge

### Backend (planned)
- FastAPI (Python)
- PostgreSQL with SQLAlchemy
- psycopg driver

## Current Architecture

```
frontend/
├── src/
│   ├── main.tsx              # Entry point — renders App inside BrowserRouter
│   ├── App.tsx               # Root component — defines all V1 routes
│   ├── index.css             # Tailwind directives + CSS design tokens (dark-first)
│   │
│   ├── components/ui/        # Shared primitive components
│   │   ├── Skeleton.tsx      # Loading skeleton with pulse animation
│   │   ├── EmptyState.tsx    # Empty state placeholder
│   │   └── ErrorState.tsx    # Error state with retry button
│   │
│   ├── components/home/      # Home page sections (Phase 3)
│   │   ├── ContinuePlaying.tsx
│   │   ├── LibrarySection.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── CommunityReviews.tsx
│   │   └── ProgressOverview.tsx
│   │
│   ├── components/layout/    # Layout components
│   │   ├── AppShell.tsx      # Main layout wrapper (Header + Sidebar/MobileNav + Content)
│   │   ├── Header.tsx        # Sticky header with branding and desktop nav
│   │   ├── Sidebar.tsx       # Fixed-width desktop sidebar navigation
│   │   ├── MobileNavigation  # Bottom tab bar for mobile (< lg)
│   │   ├── Breadcrumb.tsx    # Navigation trail for nested routes
│   │   ├── Footer.tsx        # Simple footer (unused in shell, available for pages)
│   │   └── PageWrapper.tsx   # Consistent page container (unused, padding inline)
│   │
│   ├── pages/                # Route-level page components (placeholders)
│   │   ├── HomePage.tsx
│   │   ├── LibraryPage.tsx
│   │   ├── GameDetailsPage.tsx
│   │   ├── MissionDetailPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── CommunityPage.tsx
│   │
│   ├── services/             # Data layer — abstracts mock vs real API
│   │   ├── api.ts            # Base fetch wrapper with config
│   │   ├── games.ts          # Game CRUD + listing functions (mock)
│   │   ├── missions.ts       # Mission functions (mock)
│   │   ├── progress.ts       # Progress tracking functions (mock)
│   │   ├── reviews.ts        # Reviews, comments, reactions (mock)
│   │   ├── homeService.ts    # Home page mock data (Phase 3)
│   │   └── libraryService.ts # Library page mock data + filter/sort (Phase 4)
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useMediaQuery.ts  # Responsive breakpoint detection
│   │
│   ├── types/                # TypeScript interfaces
│   │   ├── game.ts           # Game, GameStatus enums
│   │   ├── mission.ts        # Mission type
│   │   ├── progress.ts       # Progress tracking type
│   │   └── review.ts         # Review, Comment, Reaction types
│   │
│   ├── utils/                # Utility functions
│   │   └── cn.ts             # clsx + twMerge wrapper for Tailwind classes
│   │
│   └── assets/               # Static files (images, etc.)
│
├── public/                   # Public static assets
├── vite.config.ts            # Vite config with @ path alias
├── tailwind.config.js        # Tailwind config with custom theme
├── postcss.config.js         # PostCSS for Tailwind processing
└── tsconfig.json             # TypeScript configuration
```

## Design System

### Color Palette (Dark-First)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0B0F1A` | Main background (deep navy-black) |
| `--bg-secondary` | `#131825` | Surface / card backgrounds |
| `--bg-tertiary` | `#1C2236` | Elevated surfaces, hover states |
| `--text-primary` | `#F0F0F5` | Primary text (off-white) |
| `--text-secondary` | `#9CA3AF` | Secondary / muted text |
| `--text-muted` | `#6B7280` | Disabled / placeholder text |
| `--accent-primary` | `#7C5CFC` | Primary action color (restrained purple) |
| `--accent-secondary` | `#3B82F6` | Secondary accent (blue) |
| `--status-playing` | `#10B981` | Playing status |
| `--status-completed` | `#7C5CFC` | Completed status |
| `--status-on-hold` | `#F59E0B` | On Hold status |
| `--status-dropped` | `#EF4444` | Dropped status |
| `--status-plan-to-play` | `#6366F1` | Plan to Play status |

### Typography

- **Font Family:** System font stack (`font-sans`) — inherits OS default sans-serif
- **Headings:** Bold, tight letter-spacing (-0.025em)
- **Body:** Regular weight, normal line-height (1.6)
- **Small text:** 0.875rem / 0.75rem for captions and metadata

### Spacing Conventions

- Base unit: 4px (Tailwind default scale)
- Common spacings: 4, 8, 12, 16, 24, 32, 48, 64
- Section gaps: 24–32px
- Card padding: 16–24px

### Border Radius

- Small (badges, inputs): `0.375rem` (6px)
- Medium (cards, modals): `0.75rem` (12px)
- Large (overlays, hero sections): `1rem` (16px)
- Full (avatars, pills): `9999px`

### Glassmorphism Rules

**Use for:** Navigation bars, header elements, modal overlays, selected/active cards

**Implementation:**
```css
background: rgba(19, 24, 37, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Avoid:** Every card being transparent, excessive blur (>24px), glowing borders, huge gradients, holographic effects

### Button Styles

- **Primary:** Solid accent color (`--accent-primary`), white text, medium padding
- **Secondary:** Transparent with border, accent-colored border and text
- **Ghost:** No border, subtle hover background tint
- **Danger:** Red accent for destructive actions
- All buttons: `transition-colors duration-200`, visible focus ring

### Card Styles

- Background: `--bg-secondary` or glass variant
- Border: 1px solid `rgba(255,255,255,0.06)`
- Radius: `0.75rem`
- Padding: `1rem` to `1.5rem`
- Hover: subtle background shift to `--bg-tertiary`

### Icon Conventions

- Use Lucide React icons exclusively
- Default icon size: 20px (use `size="default"` or explicit `w-5 h-5`)
- Icon-only buttons must have `aria-label`
- Icons follow text color hierarchy (primary, secondary, muted)

### Animation Conventions

- Transitions: 150–300ms for hover/focus states
- Skeleton pulse: subtle opacity shift, respects `prefers-reduced-motion`
- No auto-playing animations on page load
- Page transitions are NOT required in V1

## Important Decisions

| Decision | Rationale |
|----------|-----------|
| Dark mode is the primary/default appearance | Gaming audience expects dark UI; reduces eye strain |
| Light mode is NOT a V1 priority | Infrastructure can be added later without breaking dark-first design |
| Glassmorphism is subtle and purposeful | Enhances hierarchy, not decoration |
| Missions do NOT require sequential completion | Players may skip around; `mission_order` is for display/navigation only |
| Progress tracks individual mission completion independently | Each mission has its own completed flag |
| Review reactions are separate data entities | Allows proper tracking and avoids coupling |
| Service layer abstracts mock vs real API | Enables seamless transition from mock to FastAPI without UI changes |
| No large UI framework (no shadcn, MUI, etc.) | Keeps bundle small; custom components give full control |
| TypeScript is used throughout | Better developer experience and fewer runtime errors |
| `clsx` + `tailwind-merge` for conditional classes | Prevents Tailwind class conflicts in dynamic scenarios |

## Completed Work

### Phase 0 — Project Setup ✅ COMPLETED

**Date:** September 18, 2025

- [x] Vite + React 19 + TypeScript ~6.0 project initialized
- [x] Tailwind CSS v3.4 installed and configured with custom theme
- [x] React Router DOM v7 installed
- [x] Lucide React v1 installed (icons available but not yet used in placeholders)
- [x] clsx + tailwind-merge installed for class merging
- [x] Vite configured with `@/` path alias pointing to `src/`
- [x] TypeScript configured with baseUrl, paths, and erasableSyntaxOnly
- [x] Global CSS (`index.css`) with:
  - Tailwind directives (@tailwind base/components/utilities)
  - CSS custom properties for all design tokens
  - Glassmorphism utility class (.glass)
  - Card, Button, Input, Badge component styles in @layer components
  - Scrollbar styling, focus-visible states, selection colors
  - prefers-reduced-motion media query
- [x] Dark-first theme established (bg-primary: #0B0F1A, text-primary: #F0F0F5)
- [x] Folder structure created:
  ```
  src/
  ├── components/ui/     — Skeleton, EmptyState, ErrorState
  ├── pages/            — 6 placeholder page components
  ├── services/         — api, games, missions, progress, reviews (mock)
  ├── hooks/            — useMediaQuery with breakpoint constants
  ├── types/            — Game, Mission, Progress, Review + index.ts
  ├── utils/            — cn() class merger
  └── assets/           — static files directory
  ```
- [x] App.tsx with all 6 V1 routes defined (BrowserRouter wrapper)
- [x] main.tsx entry point with StrictMode + BrowserRouter
- [x] Reusable UI components:
  - **Skeleton** — supports count, variant (rect/circle/text/rounded), respects reduced-motion
  - **EmptyState** — icon, title, description, optional action button
  - **ErrorState** — title, description, retry button
- [x] Placeholder page components with skeleton examples:
  - HomePage.tsx, LibraryPage.tsx, GameDetailsPage.tsx
  - MissionDetailPage.tsx, ProfilePage.tsx, CommunityPage.tsx
- [x] Mock data service architecture (all return Promises for seamless Phase 10 swap):
  - **api.ts** — Base fetch wrapper (throws "not implemented" until Phase 10)
  - **games.ts** — getGames(), getGameById(), searchGames() with mock data
  - **missions.ts** — getMissionsByGame(), getActsByGame(), getMissionById()
  - **progress.ts** — getProgress(), getMissionProgress(), updateMissionProgress()
  - **reviews.ts** — CRUD for reviews, comments, and reactions
- [x] TypeScript types: Game (with GameStatus const object), Mission, Act, Progress, Review, Comment, ReactionType
- [x] Environment config: .env.example with VITE_API_URL
- [x] Favicon placeholder in public/
- [x] Build verified — zero errors, zero warnings
- [x] Dev server verified — starts on localhost:5173

**Dependencies installed:**
| Package | Version | Purpose |
|---------|---------|--------|
| react | 19.2.x | UI library |
| react-dom | 19.2.x | DOM rendering |
| react-router-dom | 7.18.x | Client-side routing |
| tailwindcss | 3.4.x | Utility CSS framework |
| postcss | 8.5.x | CSS processing |
| autoprefixer | 10.6.x | Vendor prefixing |
| lucide-react | 1.47.x | Icon library |
| clsx | 2.1.x | Conditional class values |
| tailwind-merge | 3.7.x | Tailwind class conflict resolution |

**Build output:** ~264 KB JS (83 KB gzipped), ~11 KB CSS (3.3 KB gzipped)

### Phase 1 — Design System & Component Library ✅ COMPLETED

**Date:** September 18, 2025

- [x] Finalized color palette and design tokens in both CSS variables + Tailwind config
- [x] Accent colors defined as direct hex values (`#7C5CFC`) in Tailwind for opacity modifier support
- [x] Base UI components built:
  - **Button** — variants: primary, secondary, ghost, danger; states: default/hover/active/focus/disabled/loading; icon-only variant with aria-labels
  - **Input** — text input with default/hover/focus/error/disabled states, error message support
  - **Textarea** — resizable textarea with same state variants as Input
  - **Select** — dropdown select with native options styling
  - **Badge** — generic badge (default/secondary/outline variants, sm/md sizes)
  - **StatusBadge** — game status pills with color + icon for Playing/Completed/On Hold/Dropped/Plan to Play; uses direct hex values in Tailwind config for opacity support
  - **Card** — three variants: default, elevated (shadow), glass; plus CardHeader/CardTitle/CardDescription/CardContent/CardFooter sub-components
  - **Avatar** — image with fallback initials, sm/md/lg sizes, error handling for broken images
  - **Modal** — accessible dialog with focus trap, escape key dismissal, overlay click, configurable size (sm/md/lg/xl), scrollable content area
  - **Tabs** — keyboard-accessible tablist/tabpanel pattern with aria roles
  - **Tooltip** — lightweight tooltip with configurable position (top/bottom/left/right), delay, touch-device support; supplementary only
- [x] Layout components built:
  - **Header** — responsive header with logo, desktop nav links, mobile hamburger menu toggle, profile link; glassmorphism background
  - **Sidebar** — collapsible sidebar for desktop navigation with auto-collapse on smaller screens, active route highlighting, profile section at bottom
  - **Footer** — simple footer with copyright and links
  - **PageWrapper** — consistent page container with responsive padding
- [x] Domain-specific foundations built:
  - **GameCard** (`components/games/GameCard.tsx`) — cover art image (with placeholder fallback), title, genres, status badge overlay, progress bar, current mission indicator; interactive hover effects; keyboard accessible
  - **MissionRow** (`components/missions/MissionRow.tsx`) — completion checkbox with CheckCircle2/Circle icons, order number display, expand/collapse toggle for act grouping, current state highlight (accent border + background), independent completion (no sequential enforcement)
  - **ReviewCard** (`components/reviews/ReviewCard.tsx`) — avatar + username + star rating header, review content with read-more truncation, like/dislike buttons with counts, reply action, more options button; time-ago formatting
- [x] Enhanced skeleton components:
  - **Skeleton** (updated) — base primitive with rect/circle/rounded variants, respects prefers-reduced-motion
  - **SkeletonText** — multi-line horizontal bars with configurable line count and width
  - **SkeletonAvatar** — circular placeholder with sm/md/lg sizes
  - **SkeletonImage** — rectangular placeholder with aspect ratio support (square/portrait/landscape/cover)
- [x] Toast notification system (`Toast.tsx`) — Provider pattern with context, four types (success/error/warning/info), auto-dismiss after configurable duration (default 4s), accessible live region
- [x] Progress bar component (`ProgressBar.tsx`) — accessible with role="progressbar", aria values, percentage label, multiple sizes (sm/md/lg), color variants (default/success/warning/danger)
- [x] Build verified — zero TypeScript errors, zero build warnings
- [x] Dev server verified — starts on localhost:5173 without console errors

**New files created in Phase 1:**
```
src/components/ui/
├── Button.tsx          # Primary/secondary/ghost/danger/icon-only buttons
├── Input.tsx           # Text input with error states
├── Textarea.tsx        # Resizable textarea
├── Select.tsx          # Dropdown select
├── Badge.tsx           # Generic badge + StatusBadge for game statuses
├── Card.tsx            # Card + CardHeader/CardTitle/CardDescription/CardContent/CardFooter
├── Avatar.tsx          # Image avatar with fallback initials
├── Modal.tsx           # Accessible modal/dialog foundation
├── Tabs.tsx            # Keyboard-accessible tab navigation
├── Tooltip.tsx         # Lightweight tooltip for icon controls
├── Toast.tsx           # Toast notification system (Provider + context)
├── ProgressBar.tsx     # Accessible progress bar with percentage
├── Skeleton.tsx        # Base skeleton primitive (updated from Phase 0)
├── SkeletonText.tsx    # Multi-line text skeleton
├── SkeletonAvatar.tsx  # Avatar image skeleton
└── SkeletonImage.tsx   # Image placeholder skeleton

src/components/games/
└── GameCard.tsx        # Game cover, title, genres, status, progress

src/components/missions/
└── MissionRow.tsx      # Completion checkbox, order number, act grouping

src/components/reviews/
└── ReviewCard.tsx      # Avatar, rating, content, like/dislike actions

src/components/layout/
├── Header.tsx          # Responsive header with mobile hamburger
├── Sidebar.tsx         # Collapsible desktop sidebar
├── Footer.tsx          # Simple footer
└── PageWrapper.tsx     # Consistent page container
```

**Key technical decisions in Phase 1:**
- Accent colors use direct hex values (`#7C5CFC`) in Tailwind config (not CSS variable refs) to enable opacity modifiers like `bg-gv-accent/10` and `focus:border-gv-accent/50`
- Status colors also use direct hex values for the same reason
- Modal uses focus trap pattern with Escape key dismissal and body scroll lock
- Toast system uses React Context Provider pattern — components call `useToast()` hook
- Tooltip is lightweight (no dependency) but supports touch devices via toggle on tap
- MissionRow does NOT enforce sequential completion — each mission's completed state is independent
- GameCard receives all data through props — no internal fetching or state management
- All interactive elements have visible focus states and keyboard handlers

### Phase 2 — Layout & Navigation Shell ✅ COMPLETED

**Date:** September 18, 2025

- [x] Created **AppShell** component — unified layout wrapper combining Header + Sidebar/MobileNav + Content
- [x] Created **Breadcrumb** component — shows navigation trail for nested routes (`/games/:id`, `/games/:id/missions/:id`)
- [x] Created **MobileNavigation** component — bottom tab bar for mobile (< lg breakpoint) with Home, Library, Community, Profile tabs
- [x] Updated **Header** — simplified to logo + desktop nav links + profile link; removed hamburger menu (replaced by bottom nav on mobile)
- [x] Updated **Sidebar** — cleaned up, removed toggle/collapse functionality (not needed in final layout), kept as fixed-width desktop sidebar
- [x] Wrapped all routes in `App.tsx` with `<AppShell>`
- [x] Updated all 6 page components — removed redundant `min-h-screen`, added consistent padding (`px-4 md:px-6 py-6`)
- [x] Build verified — zero TypeScript errors, zero build warnings

**New files created in Phase 2:**
```
src/components/layout/
├── AppShell.tsx        # Main layout wrapper (Header + Sidebar/MobileNav + Content)
├── Breadcrumb.tsx      # Navigation trail for nested routes
└── MobileNavigation.tsx# Bottom tab bar for mobile (< lg)
```

**Modified files in Phase 2:**
```
src/components/layout/
├── Header.tsx          # Simplified: removed hamburger menu, kept desktop nav + profile
├── Sidebar.tsx         # Cleaned up: fixed width, no toggle button

src/App.tsx             # Wrapped all routes with <AppShell>

src/pages/
├── HomePage.tsx        # Removed min-h-screen, added consistent padding
├── LibraryPage.tsx     # Same
├── GameDetailsPage.tsx # Same
├── MissionDetailPage.tsx # Same
├── ProfilePage.tsx     # Same
└── CommunityPage.tsx   # Same
```

**Layout structure:**
```
Desktop (lg+):
┌─────────────────────────────────────────────────────┐
│ Header (sticky top, glassmorphism)                  │
├──────────┬──────────────────────────────────────────┤
│ Sidebar  │ Page Content                             │
│ (fixed   │ Breadcrumb (nested routes only)          │
│ width)   │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘

Tablet (md-lg):
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├─────────────────────────────────────────────────────┤
│ Page Content                                        │
│ Breadcrumb (nested routes only)                     │
└─────────────────────────────────────────────────────┘

Mobile (< md):
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├─────────────────────────────────────────────────────┤
│ Page Content                                        │
├─────────────────────────────────────────────────────┤
│ MobileNavigation (bottom tab bar)                   │
└─────────────────────────────────────────────────────┘
```

**Key technical decisions in Phase 2:**
- AppShell is the single wrapper for all routes — no page needs to know about layout structure
- Breadcrumb only renders on nested routes (paths containing `/games/`) — not cluttering flat pages
- MobileNavigation uses bottom tab bar pattern (standard mobile UX) instead of hamburger menu
- Sidebar is fixed-width (224px desktop, 240px xl+) — no collapse toggle needed for final layout
- Header uses `bg-gv-bg-primary/80 backdrop-blur-lg` instead of glass utility for better performance
- All nav items share a single source of truth (`navItems` array) in each component
- Active route detection: exact match OR startsWith (for nested sub-routes)
- No horizontal overflow: `min-w-0` on flex children, `overflow-x-hidden` on body
- Breakpoint: `lg` (1024px) is the primary split between desktop and mobile layouts

### Phase 3 — Home Page ✅ COMPLETED

**Date:** September 18, 2025

- [x] Created **ContinuePlaying** component — hero section with game artwork (gradient overlay), status badge, act/mission info, progress bar, and continue button; empty state when no game is being played
- [x] Created **LibrarySection** component — compact horizontal scrollable grid of GameCard components with "View All" link; skeleton loading states
- [x] Created **ActivityFeed** component — lightweight feed of recent user actions (mission complete, game start, status change, review posted) with Lucide icons and relative timestamps
- [x] Created **CommunityReviews** component — small selection of community reviews using existing ReviewCard, with context links to games/missions
- [x] Created **ProgressOverview** component — stats grid showing Playing/Completed/On Hold/Plan to Play counts + weekly missions completed indicator
- [x] Created **homeService.ts** — mock data service with realistic data for all home page sections (games with status/progress, activity items, community reviews with user info, progress stats)
- [x] Updated **HomePage.tsx** — main page assembling all sections in visual hierarchy order; handles loading/error states; uses React Router navigation
- [x] Build verified — zero TypeScript errors, zero build warnings

**New files created in Phase 3:**
```
src/components/home/
├── ContinuePlaying.tsx    # Hero section with game artwork and progress
├── LibrarySection.tsx     # Compact horizontal scrollable library cards
├── ActivityFeed.tsx       # Recent activity items with Lucide icons
├── CommunityReviews.tsx   # Community reviews using ReviewCard
├── ProgressOverview.tsx   # Game status counts + weekly missions
└── index.ts               # Barrel export

src/services/
└── homeService.ts         # Mock data for all home page sections
```

**Home page layout structure:**
```
Desktop (lg+):
┌─────────────────────────────────────────────────────┐
│ Continue Playing (full width hero)                  │
├─────────────────────────────────────────────────────┤
│ Your Library (horizontal scrollable cards)          │
├──────────────────┬──────────────────────────────────┤
│ Recent Activity  │ Community Reviews                │
│ (2-column grid)  │                                  │
├──────────────────┴──────────────────────────────────┤
│ Progress Overview (stats grid + weekly missions)    │
└─────────────────────────────────────────────────────┘

Mobile (< lg):
┌─────────────────────────────────────────────────────┐
│ Continue Playing (stacked artwork + info)           │
├─────────────────────────────────────────────────────┤
│ Your Library (horizontal scrollable cards)          │
├─────────────────────────────────────────────────────┤
│ Recent Activity (full width)                        │
├─────────────────────────────────────────────────────┤
│ Community Reviews (full width)                      │
├─────────────────────────────────────────────────────┤
│ Progress Overview (2-col stats grid)                │
└─────────────────────────────────────────────────────┘
```

**Key technical decisions in Phase 3:**
- ContinuePlaying uses `aspect-[4/1]` on desktop for cinematic feel, stacks to `aspect-[2/1]` on mobile
- LibrarySection cards are horizontally scrollable with `overflow-x-auto` — no wrapping until tablet+ breakpoints
- ActivityFeed and CommunityReviews use a 2-column grid on desktop (`lg:grid-cols-2`) but stack on mobile
- ProgressOverview uses a 4-col stats grid on desktop, 2-col on mobile
- All sections have dedicated skeleton loading states that match the final layout structure
- EmptyState component reused for all empty section scenarios with appropriate icons
- homeService.ts provides realistic mock data with proper TypeScript types
- HomePage uses individual useState hooks (not a single state object) to avoid unnecessary re-renders when only one section updates
- Error boundary is inline in HomePage (not a global error boundary — that's Phase 11)
- Game artwork images use `loading="eager"` for the hero (above fold), `loading="lazy"` for library cards
- Relative time formatting uses a simple getTimeAgo function (no date-fns dependency needed yet)
- Visual hierarchy: Continue Playing gets most visual attention through size and gradient overlay; Progress Overview is visually secondary with muted styling

### Phase 4 — Library Page ✅ COMPLETED

**Date:** September 18, 2025

- [x] Created **libraryService.ts** — mock data service with 12 games across all statuses (playing, completed, on_hold, dropped, plan_to_play), plus `filterAndSortUserGames()` for in-memory filtering/sorting and `getLibraryStats()` for status counts
- [x] Updated **LibraryPage.tsx** — full implementation with:
  - Page header: "Library" + subtitle + game count
  - Search bar (Lucide search icon, case-insensitive partial match)
  - Status filter pills (All, Playing, On Hold, Dropped, Plan to Play, Completed) with active state styling
  - Sort dropdown (Recently Updated, Alphabetically, Progress) with backdrop click dismissal
  - Responsive game grid: 2-col mobile → 3-col tablet → 4-col desktop → 5-col xl+
  - Loading state: skeleton grid matching final layout structure
  - Empty states: empty library, no search results, no games for selected status
  - Error state with retry functionality
- [x] Build verified — zero TypeScript errors, zero build warnings

**New files created in Phase 4:**
```
src/services/
└── libraryService.ts    # Mock data + filter/sort logic for library page
```

**Modified files in Phase 4:**
```
src/pages/
└── LibraryPage.tsx      # Full implementation (replaced placeholder)
```

**Library page layout structure:**
```
┌─────────────────────────────────────────────────────┐
│ Library                                             │
│ Your games, your progress.                          │
├─────────────────────────────────────────────────────┤
│ [🔍 Search your library...]                         │
│                                                     │
│ [All] [Playing] [On Hold] [Dropped] [Plan to Play]  │
│                                        [Sort ▼]     │
│                                                     │
│ 12 games                                            │
├─────────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │ Card │ │ Card │ │ Card │ │ Card │ │ Card │      │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │ Card │ │ Card │ │ Card │ │ Card │ │ Card │      │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │
└─────────────────────────────────────────────────────┘

Mobile (< sm):
┌─────────────────────────────────────────────────────┐
│ Library                                             │
│ Your games, your progress.                          │
├─────────────────────────────────────────────────────┤
│ [🔍 Search...]                                      │
│ [All] [Playing] [On Hold] ... (scrollable)          │
│                                                     │
│ 12 games                                            │
├─────────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐                                    │
│ │ Card │ │ Card │                                    │
│ └──────┘ └──────┘                                    │
│ ┌──────┐ ┌──────┐                                    │
│ │ Card │ │ Card │                                    │
│ └──────┘ └──────┘                                    │
└─────────────────────────────────────────────────────┘
```

**Key technical decisions in Phase 4:**
- `filterAndSortUserGames()` is a pure function — no side effects, easy to test and swap with API later
- Search is immediate (no debounce needed for local in-memory filtering of ~12 items)
- Sort dropdown uses backdrop click pattern for dismissal (standard mobile/desktop UX)
- Game cards use existing `GameCard` component — no duplicate implementation
- Filter pills use `aria-pressed` for accessibility; sort button uses `aria-expanded`/`aria-haspopup`
- Empty states distinguish between three scenarios: empty library, no search results, no games for selected status
- Skeleton grid matches final layout structure (same number of columns) to prevent layout shift during loading
- Mock data includes 12 games with realistic variety across all statuses and progress levels
- `UserGame` type combines Game + user-specific metadata (status, progress, currentMission, timestamps)
- Sort options: Recently Updated (by updatedAt/startedAt), Alphabetically (localeCompare), Progress (descending)
- Responsive grid uses Tailwind's responsive breakpoints: 2-col at base/sm, 3-col at md, 4-col at lg, 5-col at xl
- Game count updates dynamically based on current filter/search state
- Filter + search work together — both conditions must be satisfied for a game to appear

Phase 4 is COMPLETE. Ready to begin **Phase 5 — Game Details Page**.

Next phase will implement:
- Hero banner / cover image area
- Game info section: title, description, release date, genre tags
- Status selector (update play status)
- Progress overview bar
- Tabs: Overview | Missions | Reviews
- Review summary with average rating

## Known Issues

None at this time.

## Future Work

### Intentionally Postponed (Not in V1)

- Recommendations engine
- Game data scraping / automatic importing
- WebRTC (voice/video calls, screen sharing)
- RAG / AI chatbot / AI-generated content
- Machine learning features
- Redis caching layer
- Microservices architecture
- User authentication system (will be added after core UI is built)

### Planned for Later Phases

- Light mode support (Phase 12+)
- Advanced animations and page transitions (Phase 13+)
- Real API integration with FastAPI (Phase 10)
- Authentication flow (separate phase)
- WebSocket connections for real-time updates (future)
