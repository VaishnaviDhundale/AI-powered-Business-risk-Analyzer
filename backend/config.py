"""
Configuration management for AI Risk Assessment Backend
"""
from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # API Configuration
    API_TITLE: str = "AI Business Risk Assessment Generator"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # CORS Configuration
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5000",
    ]
    
    # Gemini Configuration (Primary LLM API)
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL: str = "gemini-2.5-flash"  # Fast and capable model
    # Inference Configuration
    MAX_TOKENS: int = 2048
    TEMPERATURE: float = 0.7
    TOP_P: float = 0.95
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
