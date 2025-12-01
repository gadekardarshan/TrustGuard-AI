from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import AnalyzeRequest, AnalyzeResponse
from app.services.analyzer import Analyzer
import sys
import os

# Force UTF-8 encoding for Windows console
if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

app = FastAPI(title="TrustGuard AI API", version="1.0.0")

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
async def analyze_scam(request: AnalyzeRequest):
    if not request.url and not request.text:
        raise HTTPException(status_code=400, detail="Please provide either a URL or Text to analyze.")
    
    # Sanitize input to prevent UnicodeEncodeError on Windows consoles
    if request.text:
        # Replace Rupee symbol with ASCII equivalent
        request.text = request.text.replace("₹", "Rs. ")
        request.text = request.text.replace("\u20b9", "Rs. ")
        
        # Replace common non-ASCII punctuation
        request.text = request.text.replace("–", "-").replace("—", "-")
        request.text = request.text.replace("“", '"').replace("”", '"')
        request.text = request.text.replace("‘", "'").replace("’", "'")
        
        # Remove any other non-ASCII characters to be safe
        request.text = request.text.encode('ascii', 'ignore').decode('ascii')
        print(f"Sanitized input length: {len(request.text)}")

    try:
        result = analyzer.analyze(request)
        return result
    except Exception as e:
        # Log error safely
        print(f"Error analyzing request: {str(e).encode('ascii', 'replace').decode('ascii')}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
