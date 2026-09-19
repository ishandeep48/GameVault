from pydantic import BaseModel,EmailStr,Field

class UserSignUp(BaseModel):
    username:str = Field(min_length=3,max_length=30)
    first_name:str=Field(min_length=1,max_length=30)
    last_name:str | None = Field(default=None, max_length=30)
    password:str = Field(min_length=8)
    email:EmailStr


class UserLogin(BaseModel):
    username:str
    password:str=Field(min_length=8)
