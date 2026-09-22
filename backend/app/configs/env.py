from pydantic_settings import BaseSettings,SettingsConfigDict

# Initialization of all the env variables. add here when add a new env var
class Settings(BaseSettings):
    DATABASE_URL:str
    ACCESS_TOKEN_EXPIRY_MINUTES:int
    JWT_SECRET_KEY:str
    JWT_ALGORITHM:str
    model_config =SettingsConfigDict(env_file=".env")


settings=Settings()