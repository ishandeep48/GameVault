from fastapi import APIRouter,Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.models import User
router = APIRouter(
    prefix="",
    tags=["Test"]
)


@router.get("/get-user-list")
async def get_user_list(db:AsyncSession=Depends(get_db)):
    result = await db.execute(
        select(User)
    )
    
    rows = result.scalars().all()
    
    return rows