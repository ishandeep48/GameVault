from backend.app.db.database import engine
from models import Base

# Create all tables in the database based on the defined models. This line ensures that the
#  database schema is created according to the models defined in the `Users` module.
Base.metadata.create_all(bind=engine)