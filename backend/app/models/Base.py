from sqlalchemy import func
from sqlalchemy.orm import Mapped,mapped_column,DeclarativeBase
from datetime import datetime



class Base(DeclarativeBase):
    created_at:Mapped[datetime] =  mapped_column(server_default=func.now(),nullable=False)
    updated_at:Mapped[datetime | None] =  mapped_column(nullable=True)
    deleted_at:Mapped[datetime | None] =  mapped_column(nullable=True)
    pass