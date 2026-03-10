"""
FastAPI Application - AI Business Risk Assessment Generator
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import logging
import os
from dotenv import load_dotenv

from config import settings
from models import (
    BusinessProfileRequest, 
    RiskAssessmentResponse,
    HealthResponse,
    RiskCategory,
    RiskItem
)
from llm_service import LLMService, test_llm_connection

# Load environment variables
load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="AI-powered business risk assessment and mitigation planning system",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM Service
llm_service = LLMService()


@app.get("/", tags=["Info"])
async def root():
    """Root endpoint"""
    return {
        "message": "AI Business Risk Assessment Generator API",
        "version": settings.API_VERSION,
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse, tags=["Info"])
async def health_check():
    """Check API health and LLM connection"""
    try:
        # Check if API key is configured
        if not llm_service.api_key:
            return HealthResponse(
                status="warning",
                message="API healthy but GEMINI_API_KEY not configured",
                model=llm_service.model_name
            )
        
        # Test LLM connection
        connection_ok = await test_llm_connection()
        
        if connection_ok:
            return HealthResponse(
                status="healthy",
                message="All systems operational",
                model=llm_service.model_name
            )
        else:
            return HealthResponse(
                status="degraded",
                message="LLM service not responding",
                model=llm_service.model_name
            )
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return HealthResponse(
            status="unhealthy",
            message=str(e),
            model=llm_service.model_name
        )


@app.post("/api/generate-risk-assessment", response_model=RiskAssessmentResponse, tags=["Risk Assessment"])
async def generate_risk_assessment(business_profile: BusinessProfileRequest):
    """
    Generate AI-powered business risk assessment
    
    This endpoint:
    1. Receives business profile information
    2. Sends to LLM for analysis
    3. Parses structured response
    4. Returns comprehensive risk assessment
    
    **Required:** GEMINI_API_KEY environment variable must be set
    """
    
    try:
        # Validate API key
        if not llm_service.api_key:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="LLM service not configured. Please set GEMINI_API_KEY environment variable."
            )
        
        # Convert request to dict
        profile_dict = business_profile.model_dump()
        
        logger.info(f"Processing risk assessment for: {business_profile.business_name}")
        
        # Generate assessment using LLM
        assessment_data = await llm_service.generate_risk_assessment(profile_dict)
        
        # Validate and format response
        response = RiskAssessmentResponse(
            business_name=business_profile.business_name,
            assessment_date=datetime.now().isoformat(),
            categories=assessment_data.get("categories", []),
            overall_risk_score=assessment_data.get("overall_risk_score", 50),
            executive_summary=assessment_data.get("executive_summary", "Assessment complete"),
            key_recommendations=assessment_data.get("key_recommendations", []),
            raw_analysis=assessment_data.get("raw_analysis")
        )
        
        logger.info(f"Successfully generated assessment for {business_profile.business_name}")
        return response
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Parsing error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to parse LLM response: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Error generating assessment: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating risk assessment: {str(e)}"
        )


@app.get("/api/config", tags=["Info"])
async def get_config():
    """Get API configuration (public info only)"""
    return {
        "model": llm_service.model_name,
        "max_tokens": settings.MAX_TOKENS,
        "temperature": settings.TEMPERATURE,
        "api_key_set": bool(llm_service.api_key),
        "cors_origins": settings.CORS_ORIGINS
    }


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    
    logger.info(f"Starting server on port {port}")
    logger.info(f"Using model: {llm_service.model_name}")
    logger.info(f"API Key configured: {bool(llm_service.api_key)}")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=settings.DEBUG
    )
