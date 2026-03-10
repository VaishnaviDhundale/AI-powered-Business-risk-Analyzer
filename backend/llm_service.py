"""
LLM Integration Service for Gemini API (Google AI)
"""
import httpx
import json
import asyncio
from typing import Optional
import logging
from config import settings
from prompts import create_risk_assessment_prompt, parse_json_response

# configure logging as early as possible
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Gemini API setup
try:
    import google.genai as genai
    if settings.GEMINI_API_KEY:
        _gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
        _gemini_available = True
        logger.info("Gemini API configured successfully")
    else:
        _gemini_client = None
        _gemini_available = False
        logger.warning("GEMINI_API_KEY not set")
except ImportError:
    _gemini_client = None
    _gemini_available = False
    logger.warning("google-genai not installed")


class LLMService:
    """Service for interacting with Gemini API"""
    
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = settings.GEMINI_MODEL
        self.timeout = 120.0  # 2 minute timeout
        
    def _get_headers(self) -> dict:
        """Return request headers with authentication"""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    async def generate_risk_assessment(self, business_profile: dict) -> dict:
        """
        Generate risk assessment using Gemini API
        
        Args:
            business_profile: Dictionary with business information
            
        Returns:
            Parsed JSON response with risk assessment
        """
        
        # Create prompt
        prompt = create_risk_assessment_prompt(business_profile)
        
        logger.info(f"Sending request to {self.model_name}")
        
        try:
            from pydantic import TypeAdapter
            from models import RiskAssessmentResponse
            # We construct a response schema that returns just the "categories", "executive_summary", "overall_risk_score", and "key_recommendations" 
            # as defined in models.py (or we can just ask it to return exactly the RiskAssessmentResponse structure)
            
            # Use asyncio.to_thread to run the synchronous Gemini call with response schema
            response = await asyncio.to_thread(
                _gemini_client.models.generate_content,
                model=self.model_name,
                contents=prompt,
                config=genai.types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=RiskAssessmentResponse
                )
            )
            
            # Extract generated text
            generated_text = response.text
            
            logger.info("Successfully received response from Gemini")
            logger.info(f"Raw response length: {len(generated_text)}")
            logger.info(f"Raw response preview: {generated_text[:500]}")
            
            # Parse JSON from response
            import json
            assessment = json.loads(generated_text)
            assessment["raw_analysis"] = generated_text  # Store for debugging
            
            return assessment
                
        except Exception as e:
            logger.error(f"Gemini API Error: {str(e)}")
            import traceback
            with open("gemini_error.log", "w") as f:
                f.write(f"Error type: {type(e).__name__}\n")
                f.write(f"Error message: {str(e)}\n\n")
                traceback.print_exc(file=f)
                
            # return fallback sample instead of raising
            return {
                "business_name": business_profile.get("business_name", ""),
                "assessment_date": __import__("datetime").datetime.utcnow().isoformat(),
                "overall_risk_score": 0,
                "executive_summary": "Unable to reach Gemini API; presenting placeholder analysis.",
                "key_recommendations": [
                    "Validate your GEMINI_API_KEY and network connectivity",
                    "Consider running a local model during outages"
                ],
                "categories": [
                    {
                        "category_name": "Service Availability",
                        "category_description": "This category appears when the LLM cannot be contacted.",
                        "total_risk_score": 0,
                        "risks": [
                            {
                                "risk_title": "Gemini API Error",
                                "risk_description": f"Received error from Gemini endpoint: {str(e)}",
                                "business_impact": "Low (demo only)",
                                "severity": "Low",
                                "likelihood": "Low",
                                "risk_score": 0,
                                "mitigation_strategy": "Check API credentials and try again later.",
                                "monitoring_method": "Monitor application logs & Google AI status.",
                                "responsible_area": "DevOps"
                            }
                        ]
                    }
                ]
            }


async def test_llm_connection() -> bool:
    """
    Test connection to Gemini API with a simple prompt
    """
    service = LLMService()
    
    if not service.api_key:
        logger.warning("GEMINI_API_KEY not set in environment")
        return False
    
    if not _gemini_available:
        logger.warning("Gemini API not configured")
        return False
    
    test_prompt = "Say 'API connection successful' in one sentence."
    
    try:
        response = await asyncio.to_thread(
            _gemini_client.models.generate_content,
            model=service.model_name,
            contents=test_prompt
        )
        
        if response.text:
            logger.info("Gemini connection test successful")
            return True
        else:
            logger.error("Gemini connection test failed: no response")
            return False
                
    except Exception as e:
        logger.error(f"Gemini connection test error: {str(e)}")
        return False
