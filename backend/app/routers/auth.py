from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.schemas.users import UserSignUp,UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authenticate"]
)

# Signup route for gamevault 
from app.services.auth_services import signupUser

@router.post("/signup")
async def signup_route(user:UserSignUp,db:AsyncSession = Depends(get_db)):
    try:
        new_user = await signupUser(user,db)
    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )

    return {
        "message":"User created successfully",
        "user_id":new_user.id
    }
