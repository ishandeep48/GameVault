# GameVault

A full-stack game library and progress-tracking application built with FastAPI (backend) and React/Vite (frontend).

## Project Structure

```
GameVault/
├── backend/          # API server with FastAPI, SQLAlchemy, asyncpg
│   ├── app/
│   │   ├── configs/  # Configuration management
│   │   ├── db/       # Database connections and sessions
│   │   ├── models/   # SQLAlchemy ORM models
│   │   ├── routers/  # API route definitions
│   │   ├── schemas/  # Pydantic request/response schemas
│   │   └── services/ # Business logic layer
│   └── .env          # Environment variables
├── frontend/         # React application with Vite, TypeScript, Tailwind CSS
└── PLAN.md           # Project roadmap and development phases
```

## Tech Stack

### Backend
- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy (Async)** - ORM for database operations
- **asyncpg** - Async PostgreSQL driver
- **Pydantic** - Data validation using schemas
- **bcrypt** - Password hashing
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Utility-first styling
- **React Router DOM v7** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   ```bash
   .backend\scripts\activate
   ```

3. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

4. The API will be available at `http://127.0.0.1:8000`

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql+asyncpg://postgres:2004@localhost:5432/gamevault
```

## API Endpoints

- `GET /` - Health check endpoint
- `GET /db-test` - Database connection test
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User authentication

See [PLAN.md](./PLAN.md) for the complete API roadmap.

## Development Workflow

This project follows a phased development approach:
1. Read memory → Read plan → Implement → Test → Update memory → Stop
2. Implement ONE phase at a time

For detailed information, see:
- [PLAN.md](./PLAN.md) - Full project roadmap
- [frontend/README.md](./frontend/README.md) - Frontend-specific documentation
