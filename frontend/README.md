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
├── components/        # Reusable UI components
│   └── ui/           # Shared UI primitives (Skeleton, EmptyState, ErrorState)
├── pages/            # Route-level page components
├── services/         # Data layer (API integration)
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── assets/           # Static files and media
```

## Development Workflow

This project follows a phased development approach. See [PLAN.md](../PLAN.md) for the full roadmap and [MODEL_MEMORY.md](../MODEL_MEMORY.md) for current state and decisions.

**Rule:** Implement ONE phase at a time. Read memory → Read plan → Implement → Test → Update memory → Stop.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run oxlint for code quality checks |
| `npm run preview` | Preview production build locally |

## Design System

Dark-first design with:
- Deep navy/charcoal background palette
- Restrained purple/blue accent colors
- Subtle glassmorphism for navigation and overlays
- Accessible focus states and semantic HTML

See [MODEL_MEMORY.md](../MODEL_MEMORY.md) for full design tokens.
