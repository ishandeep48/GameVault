from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base
from uuid import UUID,uuid4




class User(Base):
    __tablename__ = "users"

    id:Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True),primary_key=True,default=uuid4)
    username:Mapped[str] = mapped_column(String(50), unique=True, nullable=False,index=True)
    email:Mapped[str] = mapped_column(String(100), unique=True, nullable=False,index=True)
    password_hash:Mapped[str] = mapped_column(String(255), nullable=False)
    first_name:Mapped[str] = mapped_column(String(255),nullable=False)
    last_name:Mapped[str|None]=mapped_column(String(255),nullable=True)
