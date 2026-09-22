from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.database import engine
from app.configs.postgres import create_tables
import uvicorn
from sqlalchemy import text

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Runs when the application starts
    await create_tables()

    yield

    # Runs when the application shuts down
    await engine.dispose()


app = FastAPI(title="GameVault API",lifespan=lifespan)

@app.get("/")
# Default test route to check if the API is running
def root():
    return {
    "message": "GameVault API is walking"
    }

# Database test
@app.get("/db-test")
# Test route to check if the database connection is working
async def db_test():
    async with engine.connect() as connection:
        result = await connection.execute(text("SELECT 1"))
        return {
            "database": "connected",
            "result": result.scalar()
        }

# Include all the routers here 
from app.routers import api_router
app.include_router(api_router)



from app.test_routes import api_router as test_router
app.include_router(test_router)
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
