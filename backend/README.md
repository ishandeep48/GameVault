# GameVault Backend API

FastAPI-based RESTful API server for the GameVault application.

## Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy (Async)** - Object-relational mapper with async support
- **asyncpg** - Async PostgreSQL driver
- **Pydantic** - Data validation using schemas
- **bcrypt** - Password hashing
- **Alembic** - Database migration tool
- **Uvicorn** - ASGI server

## Prerequisites

- Python 3.12+
- PostgreSQL database
- pip or uv

## Installation

### Option 1: Using `pyproject.toml` (Recommended)

```bash
# Install dependencies from pyproject.toml
pip install -e .
```

### Option 2: Manual Installation

```bash
# Create virtual environment
python -m venv .backend
. .backend\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install fastapi uvicorn sqlalchemy asyncpg pydantic-settings bcrypt alembic
```

## Configuration

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql+asyncpg://postgres:<YOUR_DB_PASSWORD>@localhost:5432/gamevault
```

The database URL format follows SQLAlchemy's asyncpg connection string syntax.

## Running the Server

### Method 1: Using Virtual Environment (Recommended)

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
. .backend\Scripts\activate

# Run the server with auto-reload
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Method 2: Direct Execution (No Virtual Environment)

```bash
cd backend
python -m uvicorn app.main:app --reload
```

## API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/`                   | Health check / root endpoint   |
| GET    | `/db-test`            | Database connection test       |
| POST   | `/api/v1/auth/signup` | User registration (with password confirmation) |
| POST   | `/api/v1/auth/login`  | User authentication            |
| POST   | `/api/v1/auth/logout` | User logout                    |

## Development

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Project Structure

```
backend/
├── app/
│   ├── configs/      # Configuration management (env.py, postgres.py)
│   │   └── env.py                    # Pydantic settings for environment variables
│   │   └── postgres.py               # Database initialization and table creation
│   ├── db/           # Database connections and sessions
│   │   ├── database.py
│   │   └── __init__.py
│   ├── models/       # SQLAlchemy ORM models
│   │   ├── Base.py                   # Base model with timestamps (created_at, updated_at)
│   │   └── Users.py                  # User model with DOB field
│   ├── routers/      # API route definitions
│   │   ├── auth.py                   # Authentication routes (signup, login, logout)
│   │   └── __init__.py               # Router prefix configuration (/api/v1)
│   ├── schemas/      # Pydantic request/response schemas
│   │   └── users.py                  # UserSignUp and UserLogin schemas
│   ├── services/     # Business logic layer
│   │   └── auth_services.py          # Authentication service (signup, login, logout)
│   ├── main.py       # Application entry point
│   └── __init__.py
├── .env              # Environment variables
├── pyproject.toml    # Project configuration and dependencies
├── alembic/          # Database migrations
│   ├── versions/
│   └── env.py
├── alembic.ini       # Alembic configuration
├── nul               # Null file (Windows compatibility)
└── README.md         # This file
```

## Troubleshooting

### Database Connection Issues

Ensure PostgreSQL is running and accessible:

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Test connection (replace <YOUR_DB_PASSWORD> with your actual password)
psql postgresql+asyncpg://postgres:<YOUR_DB_PASSWORD>@localhost:5432/gamevault
```

### Password Confirmation Error During Signup

The signup endpoint validates password confirmation. Ensure both passwords match:

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "<YOUR_PASSWORD>",
    "confirm_password": "<YOUR_PASSWORD>"
  }'
```

### Port Already in Use

The server runs on port 8000 by default. To change it, modify `app/main.py`:

```python
uvicorn.run(app, host="127.0.0.1", port=YOUR_PORT)
```

## License

Proprietary - GameVault Application
