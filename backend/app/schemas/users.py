from pydantic import BaseModel,EmailStr,Field
from datetime import date

class UserSignUp(BaseModel):
    username:str = Field(min_length=3,max_length=30)
    first_name:str=Field(min_length=1,max_length=30,alias="firstName")
    last_name:str | None = Field(default=None, max_length=30,alias="lastName")
    password:str = Field(min_length=8)
    email:EmailStr
    confirm_password:str = Field(min_length=8,alias="confirmPassword")
    date_of_birth: date = Field(alias="dateOfBirth")

class UserLogin(BaseModel):
    username:str
    password:str=Field(min_length=8)