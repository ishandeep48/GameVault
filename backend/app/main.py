from fastapi import FastAPI
import uvicorn
from sqlalchemy import text

app = FastAPI(title="GameVault API")

@app.get("/")
# Default test route to check if the API is running
def root():
    return {
    "message": "GameVault API is walking"
    }

# Database test
from app.db.database import engine

@app.get("/db-test")
# Test route to check if the database connection is working
def db_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {
            "database": "connected",
            "result": result.scalar()
        }

# Include all the routers here 
from app.routers import api_router
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
