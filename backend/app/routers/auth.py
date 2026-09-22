from fastapi import APIRouter,Depends,HTTPException,Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.schemas.users import UserSignUp,UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authenticate"]
)

# Signup route for gamevault 
from app.services.auth_services import signupUser,create_access_token
from app.configs.env import settings
max_age_jwt = settings.ACCESS_TOKEN_EXPIRY_MINUTES
@router.post("/signup")
async def signup_route(user:UserSignUp,response:Response,db:AsyncSession = Depends(get_db)):
    try:
        new_user = await signupUser(user,db)
    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )
    token=create_access_token(str(new_user.id))
    
    print(token)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=max_age_jwt
    )
    return {
        "message":"User created successfully"
    }
    
    
from app.services.auth_services import loginUser
@router.post("/login")
async def login_route(user:UserLogin,respone:Response):
    
    token = await loginUser(user)
    
    respone.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=max_age_jwt
    )
    
    return{
        "message": "Login Successful"
    }
    
    
    
    