from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
from sqlalchemy.orm import sessionmaker
from app.configs.env import settings


DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL)
SessionLocal = async_sessionmaker(expire_on_commit=False, autoflush=False, bind=engine)




async def get_db():
    async with SessionLocal() as db:
        yield db
