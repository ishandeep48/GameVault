# GameVault Frontend

A game-library and progress-tracking application frontend built with React, Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **TypeScript** — Type safety
- **Tailwind CSS v3** — Utility-first styling
- **React Router DOM v6** — Client-side routing
- **Lucide React** — Icon library
- **clsx + tailwind-merge** — Conditional class merging

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/ui/     # Shared UI primitives (Skeleton, EmptyState, ErrorState)
├── pages/            # Route-level page components
├── services/         # Data layer (mock data → real API in Phase 10)
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── assets/           # Static files
```

## Development Workflow

This project follows a phased development approach. See [PLAN.md](../PLAN.md) for the full roadmap and [MODEL_MEMORY.md](../MODEL_MEMORY.md) for current state and decisions.

**Rule:** Implement ONE phase at a time. Read memory → Read plan → Implement → Test → Update memory → Stop.

## Design System

Dark-first design with:
- Deep navy/charcoal background palette
- Restrained purple/blue accent colors
- Subtle glassmorphism for navigation and overlays
- Accessible focus states and semantic HTML

See [MODEL_MEMORY.md](../MODEL_MEMORY.md) for full design tokens.
