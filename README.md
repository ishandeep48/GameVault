# GameVault

A full-stack game library and progress-tracking application built with FastAPI (backend), React/Vite (frontend), TypeScript, and PostgreSQL.

## Features

- **Game Library Management** — Track your games with status (playing, completed, on hold)
- **Progress Tracking** — Mission-based progress for each game
- **Social Reviews** — Community reviews, comments, and reactions
- **Activity Feed** — Real-time activity timeline
- **Authentication** — Secure login/signup with JWT tokens stored in HttpOnly cookies

## Project Structure

```
GameVault/
├── backend/
│   ├── app/
│   │   ├── configs/      # Configuration management (env.py, postgres.py)
│   │   ├── db/           # Database connections and sessions
│   │   │   └── database.py
│   │   ├── models/       # SQLAlchemy ORM models with timestamps
│   │   │   ├── Base.py                   # Base model (created_at, updated_at)
│   │   │   └── Users.py                  # User model with DOB field
│   │   ├── routers/      # API route definitions (/api/v1/auth)
│   │   │   ├── auth.py                   # Signup, login, logout endpoints
│   │   │   └── __init__.py               # Router prefix configuration
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   │   └── users.py                  # UserSignUp and UserLogin schemas
│   │   ├── services/     # Business logic layer (auth_services.py)
│   │   ├── main.py       # Application entry point with ASGI app
│   │   └── __init__.py
│   ├── alembic/          # Database migrations
│   ├── .env              # Environment variables
│   ├── pyproject.toml    # Project configuration and dependencies
│   └── README.md         # Backend-specific documentation
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (auth, home, layout, missions, ui)
│   │   ├── pages/        # Route-level page components
│   │   ├── services/     # API integration with Axios and cookie support
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript type definitions (User, Game, Mission, etc.)
│   │   └── utils/        # Utility functions and validators
│   ├── package.json      # Node.js dependencies and scripts
│   ├── vite.config.ts    # Vite configuration
│   └── README.md         # Frontend-specific documentation
├── PLAN.md               # Full project roadmap and development phases
└── MODEL_MEMORY.md       # Current state, decisions, and memory
```

## Tech Stack

### Backend
- **FastAPI** — Modern web framework for building APIs with automatic OpenAPI documentation
- **SQLAlchemy (Async)** — ORM for database operations with async support
- **asyncpg** — Async PostgreSQL driver optimized for Python 3.12+
- **Pydantic** — Data validation using schemas
- **bcrypt** — Password hashing and security
- **Alembic** — Database migration tool
- **Uvicorn** — ASGI server with auto-reload

### Frontend
- **React 19** — UI library with latest features
- **Vite 8** — Build tool and dev server with HMR
- **TypeScript ~6.0** — Type safety across the codebase
- **Tailwind CSS v3.4** — Utility-first styling with dark mode support
- **React Router DOM v7** — Client-side routing
- **Lucide React** — Icon library
- **clsx + tailwind-merge** — Conditional class merging
- **Axios** — HTTP client with cookie support for authentication

## Getting Started

### Backend

#### Installation & Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies from pyproject.toml (recommended)
pip install -e .
```

#### Running the Server

**Option 1: Using Virtual Environment (Recommended)**

```bash
# Activate virtual environment
.backend\scripts\activate

# Run server with auto-reload
uvicorn app.main:app --reload
```

**Option 2: Direct Execution (No Virtual Environment)**

```bash
python -m uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Frontend

#### Installation & Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (if not already installed)
npm install
```

#### Running the Application

**Development Mode:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Production Build:**

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql+asyncpg://postgres:<YOUR_DB_PASSWORD>@localhost:5432/gamevault
ACCESS_TOKEN_EXPIRY_MINUTES=60
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
JWT_ALGORITHM=HS256
```

The database URL format follows SQLAlchemy's asyncpg connection string syntax.

## API Endpoints

### Authentication Routes (v1)

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/`                   | Health check / root endpoint   |
| GET    | `/db-test`            | Database connection test       |
| POST   | `/api/v1/auth/signup` | User registration (with password confirmation) |
| POST   | `/api/v1/auth/login`  | User authentication            |
| POST   | `/api/v1/auth/logout` | User logout                    |

### Signup Requirements
- Username: 3-30 characters, unique
- Email: Valid email format, unique
- Password: Minimum 8 characters
- Date of birth: Required (YYYY-MM-DD)
- Password confirmation: Must match password

See [PLAN.md](./PLAN.md) for the complete API roadmap.

## Development Workflow

This project follows a phased development approach:
1. Read memory → Read plan → Implement → Test → Update memory → Stop
2. Implement ONE phase at a time

For detailed information, see:
- [PLAN.md](./PLAN.md) - Full project roadmap and phases
- [frontend/README.md](./frontend/README.md) - Frontend-specific documentation
- [backend/README.md](./backend/README.md) - Backend-specific documentation
