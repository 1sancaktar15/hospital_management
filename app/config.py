from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str
    admin_email: str

    class Config:
        env_file = ".env"

settings = Settings()
