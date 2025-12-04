from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AnalyzeRequest(BaseModel):
    url: Optional[str] = None
    text: Optional[str] = None

class AnalyzeResponse(BaseModel):
    trust_score: int
    label: str
    reasons: List[str]
    recommended_action: str

# New models for company analysis
class CompanyInfo(BaseModel):
    domain: str
    company_name: str
    description: str
    emails: List[str]
    phones: List[str]
    social_media: Dict[str, bool]
    has_contact_info: bool

class CompanyAnalysisRequest(BaseModel):
    company_url: str

class CompanyAnalysisResponse(BaseModel):
    success: bool
    company_info: Optional[CompanyInfo] = None
    company_trust_score: int
    legitimacy_indicators: Dict[str, Any]
    risk_factors: List[str]
    recommended_action: str

# Enhanced models for job analysis with company verification
class EnhancedAnalyzeRequest(BaseModel):
    job_url: Optional[str] = None
    job_description: Optional[str] = None
    company_url: Optional[str] = None  # Optional company website for verification

class EnhancedAnalyzeResponse(BaseModel):
    # Job analysis results
    trust_score: int
    label: str
    reasons: List[str]
    recommended_action: str
    
    # Company verification (if company_url provided)
    company_verified: bool = False
    company_trust_score: Optional[int] = None
    company_name: Optional[str] = None
    company_risk_factors: Optional[List[str]] = None
    
    # Combined analysis
    combined_trust_score: Optional[int] = None  # Weighted average if company analyzed

