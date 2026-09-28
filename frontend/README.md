# GameVault Frontend

A game-library and progress-tracking application frontend built with React, Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **TypeScript ~6.0** — Type safety
- **Tailwind CSS v3.4** — Utility-first styling
- **React Router DOM v7** — Client-side routing
- **Lucide React** — Icon library
- **clsx + tailwind-merge** — Conditional class merging
- **oxlint** — Linting and code quality
- **Axios** — HTTP client with cookie support

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Backend API running at `http://localhost:8000`

### Installation & Development

```bash
# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── auth/         # Authentication-related components
│   │   └── LoginModal.tsx
│   ├── games/        # Game-specific components
│   │   └── GameCard.tsx
│   ├── home/         # Home page components
│   │   ├── ContinuePlaying.tsx      # Recently played section
│   │   ├── LibrarySection.tsx       # User's game library preview
│   │   ├── ActivityFeed.tsx         # Recent activity timeline
│   │   ├── CommunityReviews.tsx     # Social reviews feed
│   │   └── ProgressOverview.tsx     # Overall progress stats
│   ├── layout/       # Layout and navigation components
│   │   ├── Header.tsx              # Top navigation bar with user menu
│   │   ├── MobileNavigation.tsx    # Responsive mobile drawer
│   │   ├── Sidebar.tsx             # Desktop sidebar navigation
│   │   ├── AppShell.tsx            # Main layout wrapper
│   │   ├── AuthLayout.tsx          # Layout for auth pages (login/signup)
│   │   ├── Breadcrumb.tsx          # Navigation breadcrumbs
│   │   ├── Footer.tsx              # Page footer
│   │   └── PrivateRoute.tsx        # Route guard for protected routes
│   ├── missions/     # Mission tracking components
│   │   └── MissionRow.tsx          # Individual mission display row
│   ├── pages/        # Page-level components (route views)
│   │   ├── HomePage.tsx            # Landing page with activity feed
│   │   ├── LibraryPage.tsx         # User's complete game library
│   │   ├── GameDetailsPage.tsx     # Detailed game info and missions
│   │   ├── MissionDetailPage.tsx   # Individual mission view
│   │   ├── CommunityPage.tsx       # Social reviews and discussions
│   │   ├── ProfilePage.tsx         # User profile with DOB display
│   │   ├── LoginPage.tsx           # Login form (username/password)
│   │   └── SignupPage.tsx          # Registration (with password confirmation)
│   └── ui/           # Shared UI primitives and base components
│       ├── Button.tsx              # Primary action buttons
│       ├── Input.tsx               # Text input fields
│       ├── Select.tsx              # Dropdown selectors
│       ├── Avatar.tsx              # User avatar component
│       ├── Badge.tsx               # Status badges (playing, completed)
│       ├── Card.tsx                # Content cards with hover effects
│       ├── Modal.tsx               # Dialog/modals
│       ├── Tabs.tsx                # Tabbed interfaces
│       ├── ProgressBar.tsx         # Progress bars for game completion
│       ├── Skeleton.tsx            # Loading skeletons
│       ├── ErrorState.tsx          # Error display states
│       ├── EmptyState.tsx          # Empty list states
│       ├── Tooltip.tsx             # Tooltips and help text
│       └── Toast.tsx               # Notification toasts
├── pages/            # Route-level page components (same as above)
├── services/         # Data layer with API integration
│   ├── api.ts                    # Axios instance with cookie support
│   ├── authService.ts            # Auth operations (login, signup, logout)
│   ├── games.ts                  # Game CRUD and search operations
│   ├── homeService.ts            # Home page data aggregation
│   ├── libraryService.ts         # Library filtering and sorting
│   ├── missions.ts               # Mission tracking and progress
│   ├── progress.ts               # Progress updates for missions
│   └── reviews.ts                # Review creation and reactions
├── hooks/            # Custom React hooks (user session, auth guards)
├── types/            # TypeScript type definitions
│   ├── User.ts                   # User model with DOB field
│   ├── Game.ts                   # Game data structure
│   ├── Mission.ts                # Mission and act tracking
│   ├── Progress.ts               # Progress records per mission
│   ├── Review.ts                 # Reviews, comments, reactions
│   └── index.ts                  # Type exports
├── utils/            # Utility functions (validation, formatters)
└── assets/           # Static files and media
```

## Development Workflow

This project follows a phased development approach. See [PLAN.md](../PLAN.md) for the full roadmap and [MODEL_MEMORY.md](../MODEL_MEMORY.md) for current state and decisions.

**Rule:** Implement ONE phase at a time. Read memory → Read plan → Implement → Test → Update memory → Stop.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run oxlint for code quality checks |

## Authentication Flow

The application uses cookie-based authentication with the following endpoints:

- **Signup**: POST `/api/v1/auth/signup` — Requires username, email, password, date of birth, and password confirmation
- **Login**: POST `/api/v1/auth/login` — Uses username (not email) for login
- **Logout**: POST `/api/v1/auth/logout` — Clears the access_token cookie

The `authService.ts` handles all authentication operations with proper validation:
- Username must be 3-30 characters
- Email must be valid format
- Password minimum 8 characters
- Date of birth is required for signup
- Password confirmation must match

## Design System

Dark-first design with:
- Deep navy/charcoal background palette
- Restrained purple/blue accent colors
- Subtle glassmorphism for navigation and overlays
- Accessible focus states and semantic HTML

See [MODEL_MEMORY.md](../MODEL_MEMORY.md) for full design tokens.
