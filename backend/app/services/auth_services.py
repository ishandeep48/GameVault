from app.schemas.users import UserSignUp,UserLogin
from sqlalchemy import select , or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import User
import bcrypt

async def signupUser(user_data:UserSignUp,db:AsyncSession):
    # existing_user= db.scalar(
    #     select(User).where(
    #         or_(
    #             User.username == user_data.username,
    #             User.email == user_data.email
    #         )
    #     )

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

        
    



def hash_password(password:str)->str:
    password_bytes=password.encode("utf-8")
    print(password_bytes)
    salt=bcrypt.gensalt(10)
    hashed_password = bcrypt.hashpw(password_bytes,salt)
    return hashed_password.decode("utf-8")