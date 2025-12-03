from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    url: Optional[str] = None
    text: Optional[str] = None

class AnalyzeResponse(BaseModel):
    trust_score: int
    label: str
    reasons: List[str]
    recommended_action: str
