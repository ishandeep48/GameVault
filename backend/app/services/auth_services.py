from app.schemas.users import UserSignUp,UserLogin
from sqlalchemy import select , or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import User
import bcrypt
from datetime import datetime,timedelta,timezone
import jwt


# Signup service ( the basic logic of the signup , created a new entry in the db ) stays heree
async def signupUser(user_data:UserSignUp,db:AsyncSession):

    existing_username = await db.scalar(
        select(User).where(
            User.username == user_data.username
        )
    )
    if(existing_username):
        raise ValueError("Username already exists")

    existing_email = await db.scalar(
        select(User).where(
            User.email == user_data.email
        )
    )

    if(existing_email):
        raise ValueError("Email already exists")

    hashed_password = hash_password(user_data.password)

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name
    )

    db.add(new_user)

    await db.commit()
    await db.refresh(new_user)

    return new_user

        
from fastapi import Depends
from app.db.database import get_db
# Service to login a user an return a acces token
async def loginUser(user:UserLogin , db:AsyncSession= Depends(get_db)):
    result = await db.execute(
        select(User).where(
            User.id == user.username
        )
    )
    user_db= result.scalar_one_or_none()
    if(user_db is None):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password"
        )
    req_password = user.password
    hash_password = user_db.password_hash
    
    correct_password = verify_password(req_password,hash_password)
    
    if(correct_password == False):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password"
        )
    
    token = create_access_token(user_db.id)
    
    return token
    
    
    
# Craete a hash for the password
def hash_password(password:str)->str:
    password_bytes=password.encode("utf-8")
    print(password_bytes)
    salt=bcrypt.gensalt(10)
    hashed_password = bcrypt.hashpw(password_bytes,salt)
    return hashed_password.decode("utf-8")


def verify_password(password:str,hash_password:str)->bool:
    password_bytes=password.encode("utf-8")
    hashed_password_bytes = hash_password.encode("utf-8")
    return bcrypt.checkpw(password_bytes,hashed_password_bytes)


# Service to create JWT Access Token at the time of login 
from app.configs.env import settings
def create_access_token(user_id:str):
    ACCESS_TOKEN_EXPIRY_MINUTES =  settings.ACCESS_TOKEN_EXPIRY_MINUTES
    JWT_SECRET_KEY=settings.JWT_SECRET_KEY
    JWT_ALGORITHM=settings.JWT_ALGORITHM
    
    expire = datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRY_MINUTES)
    
    payload ={
        "sub":user_id,
        "exp" : expire
    }
    
    token=jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )
    return token

def verify_token(token:str):
    JWT_SECRET_KEY=settings.JWT_SECRET_KEY
    JWT_ALGORITHMS=settings.JWT_ALGORITHM
    try:
        payload=jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHMS]
        )
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    
    
    
from fastapi import Cookie,HTTPException
from app.db.database import get_db
from fastapi import Depends
async def get_current_user(access_token:str|None=Cookie(default=None),db:AsyncSession=Depends(get_db)):
    if access_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not Authenticated"
        )
    
    payload =verify_token(access_token)
    
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired"
        )
        
    user_id = payload.get("sub")
    
    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    
    result=await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if(user is None):
        raise HTTPException(
            status_code=401,
            detail="User does not exist"
        )
    
    return user_id