from app.db.database import engine
from app.models import Base

# Create all tables in the database based on the defined models. This line ensures that the
#  database schema is created according to the models defined in the `Users` module.

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)