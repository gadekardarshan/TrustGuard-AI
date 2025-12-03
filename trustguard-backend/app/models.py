from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    url: Optional[str] = None
    text: Optional[str] = None
    linkedin_profile_url: Optional[str] = None
    resume_text: Optional[str] = None

class AnalyzeResponse(BaseModel):
    trust_score: int
    label: str
    reasons: List[str]
    recommended_action: str
    user_analysis: Optional[dict] = None
