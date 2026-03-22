"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum


class IndustryEnum(str, Enum):
    FINTECH = "FinTech"
    HEALTHCARE = "Healthcare"
    ECOMMERCE = "E-commerce"
    SAAS = "SaaS"
    EDUCATION = "Education"
    MANUFACTURING = "Manufacturing"
    OTHER = "Other"

INDUSTRY_WEIGHTS = {
    "FinTech": {
        "Strategic Risks": 0.10, "Operational Risks": 0.05, "Technology & AI Risks": 0.05,
        "Data & Privacy Risks": 0.15, "Security Risks": 0.20, "Legal & Compliance Risks": 0.20,
        "Market & Financial Risks": 0.20, "Ethical & Reputational Risks": 0.05
    },
    "Healthcare": {
        "Strategic Risks": 0.05, "Operational Risks": 0.15, "Technology & AI Risks": 0.05,
        "Data & Privacy Risks": 0.25, "Security Risks": 0.15, "Legal & Compliance Risks": 0.20,
        "Market & Financial Risks": 0.05, "Ethical & Reputational Risks": 0.10
    },
    "E-commerce": {
        "Strategic Risks": 0.15, "Operational Risks": 0.15, "Technology & AI Risks": 0.15,
        "Data & Privacy Risks": 0.15, "Security Risks": 0.15, "Legal & Compliance Risks": 0.05,
        "Market & Financial Risks": 0.15, "Ethical & Reputational Risks": 0.05
    },
    "SaaS": {
        "Strategic Risks": 0.10, "Operational Risks": 0.15, "Technology & AI Risks": 0.20,
        "Data & Privacy Risks": 0.20, "Security Risks": 0.20, "Legal & Compliance Risks": 0.05,
        "Market & Financial Risks": 0.05, "Ethical & Reputational Risks": 0.05
    },
    "Education": {
        "Strategic Risks": 0.10, "Operational Risks": 0.10, "Technology & AI Risks": 0.05,
        "Data & Privacy Risks": 0.20, "Security Risks": 0.15, "Legal & Compliance Risks": 0.10,
        "Market & Financial Risks": 0.05, "Ethical & Reputational Risks": 0.25
    },
    "Manufacturing": {
        "Strategic Risks": 0.15, "Operational Risks": 0.25, "Technology & AI Risks": 0.10,
        "Data & Privacy Risks": 0.05, "Security Risks": 0.10, "Legal & Compliance Risks": 0.10,
        "Market & Financial Risks": 0.15, "Ethical & Reputational Risks": 0.10
    },
    "Other": {
        "Strategic Risks": 0.125, "Operational Risks": 0.125, "Technology & AI Risks": 0.125,
        "Data & Privacy Risks": 0.125, "Security Risks": 0.125, "Legal & Compliance Risks": 0.125,
        "Market & Financial Risks": 0.125, "Ethical & Reputational Risks": 0.125
    }
}


class BusinessModelEnum(str, Enum):
    STARTUP = "Startup"
    SME = "SME"
    ENTERPRISE = "Enterprise"


class TargetMarketEnum(str, Enum):
    B2B = "B2B"
    B2C = "B2C"
    GOVERNMENT = "Government"
    HYBRID = "Hybrid"


class DataSensitivityEnum(str, Enum):
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"


class AIUsageEnum(str, Enum):
    NONE = "None"
    ASSISTIVE = "Assistive AI"
    CORE = "Core AI Product"


class SeverityEnum(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class BusinessProfileRequest(BaseModel):
    """Request model for business profile input"""
    business_name: str = Field(..., min_length=1, max_length=200)
    industry: IndustryEnum
    business_model: BusinessModelEnum
    target_market: TargetMarketEnum
    product_description: str = Field(..., min_length=10, max_length=5000)
    technology_stack: List[str] = Field(default=[], max_items=10)
    data_sensitivity: DataSensitivityEnum
    deployment_region: str = Field(default="Global", max_length=100)
    regulatory_environment: List[str] = Field(default=[], max_items=10)
    ai_usage_level: AIUsageEnum

    class Config:
        json_schema_extra = {
            "example": {
                "business_name": "TechFinance Solutions",
                "industry": "FinTech",
                "business_model": "Startup",
                "target_market": "B2B",
                "product_description": "AI-powered fraud detection platform for financial institutions",
                "technology_stack": ["AI", "Cloud", "Web"],
                "data_sensitivity": "High",
                "deployment_region": "Global",
                "regulatory_environment": ["GDPR", "PCI-DSS"],
                "ai_usage_level": "Core AI Product"
            }
        }


class RiskItem(BaseModel):
    """Data model for individual risk entry"""
    risk_title: str
    risk_description: str
    business_impact: str
    severity: SeverityEnum
    likelihood: str
    risk_score: float = Field(..., ge=0, le=100)
    mitigation_strategy: str
    monitoring_method: str
    responsible_area: str


class RiskCategory(BaseModel):
    """Data model for risk category"""
    category_name: str
    category_description: str
    risks: List[RiskItem]
    total_risk_score: float = Field(..., ge=0, le=100)


class RiskAssessmentResponse(BaseModel):
    """Response model for complete risk assessment"""
    business_name: str
    assessment_date: str
    categories: List[RiskCategory]
    overall_risk_score: float = Field(..., ge=0, le=100)
    executive_summary: str
    key_recommendations: List[str]
    raw_analysis: Optional[str] = None  # Raw LLM output for debugging


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    message: str
    model: str
