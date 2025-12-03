from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from app.models import AnalyzeResponse, AnalyzeRequest
from app.services.analyzer import Analyzer
import sys

# Force UTF-8 encoding for Windows console
if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

app = FastAPI(title="TrustGuard AI API", version="1.1.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for hackathon/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = Analyzer()

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_scam(
    job_url: str = Form(None),
    job_description: str = Form(None)
):
    # 1. Input Constraints & Validation
    if not job_url and not job_description:
        raise HTTPException(status_code=400, detail="Please provide either a Job URL or Job Description.")
    
    # Validate Job Description Length
    if job_description:
        if len(job_description) < 50:
            raise HTTPException(status_code=400, detail="Job description is too short. Please provide at least 50 characters for accurate analysis.")
        if len(job_description) > 20000:
            raise HTTPException(status_code=400, detail="Job description is too long (max 20,000 characters).")

    # 2. Construct Request Object
    
    # Sanitize inputs
    sanitized_text = job_description
    if sanitized_text:
        sanitized_text = sanitized_text.replace("₹", "Rs. ").replace("\u20b9", "Rs. ")
        sanitized_text = sanitized_text.replace("–", "-").replace("—", "-")
        sanitized_text = sanitized_text.replace("“", '"').replace("”", '"')
        sanitized_text = sanitized_text.replace("‘", "'").replace("’", "'")
        sanitized_text = sanitized_text.encode('ascii', 'ignore').decode('ascii')

    try:
        request_data = AnalyzeRequest(
            url=job_url,
            text=sanitized_text
        )
        
        result = analyzer.analyze(request_data)
        return result
    except Exception as e:
        safe_error = str(e).encode('ascii', 'replace').decode('ascii')
        print(f"Error analyzing request: {safe_error}")
        raise HTTPException(status_code=500, detail=safe_error)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
