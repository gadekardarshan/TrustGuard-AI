from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.models import AnalyzeResponse
from app.services.analyzer import Analyzer
from app.models import AnalyzeRequest # Keep for type hinting if needed, though we construct it manually now
import sys
import os
import io
from pypdf import PdfReader

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
    job_description: str = Form(None),
    linkedin_url: str = Form(None),
    resume_file: UploadFile = File(None)
):
    # 1. Input Constraints & Validation
    if not job_url and not job_description:
        raise HTTPException(status_code=400, detail="Please provide either a Job URL or Job Description.")
    
    if not linkedin_url and not resume_file:
        raise HTTPException(status_code=400, detail="Please provide either a LinkedIn URL or upload a Resume PDF.")

    # Validate Job Description Length
    if job_description:
        if len(job_description) < 50:
            raise HTTPException(status_code=400, detail="Job description is too short. Please provide at least 50 characters for accurate analysis.")
        if len(job_description) > 20000:
            raise HTTPException(status_code=400, detail="Job description is too long (max 20,000 characters).")

    # Validate LinkedIn URL
    if linkedin_url:
        if "linkedin.com" not in linkedin_url.lower():
             raise HTTPException(status_code=400, detail="Invalid LinkedIn URL. Please provide a valid profile link (e.g., https://www.linkedin.com/in/...).")

    # 2. Resume PDF Handling
    resume_text = ""
    if resume_file:
        if resume_file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF resume.")
        
        # Check file size (approx 5MB limit)
        # Note: UploadFile doesn't always have size populated immediately, but we can check after read or rely on server limits.
        # For simplicity, we'll read and check length.
        try:
            content = await resume_file.read()
            if len(content) > 5 * 1024 * 1024: # 5MB
                raise HTTPException(status_code=400, detail="Resume file is too large (max 5MB).")
            
            # Extract Text
            pdf_reader = PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                resume_text += page.extract_text() + "\n"
                
            # Basic check if extraction worked
            if not resume_text.strip():
                 print("Warning: Could not extract text from PDF (might be image-based).")
                 
        except Exception as e:
            print(f"Error processing PDF: {e}")
            raise HTTPException(status_code=400, detail="Failed to process PDF file. Please ensure it is a valid text-based PDF.")

    # 3. Construct Request Object
    # We need to adapt AnalyzeRequest or pass data directly. 
    # Let's update AnalyzeRequest model to include resume_text or handle it here.
    # For now, we'll pass it to analyzer.
    
    # Sanitize inputs
    sanitized_text = job_description
    if sanitized_text:
        sanitized_text = sanitized_text.replace("₹", "Rs. ").replace("\u20b9", "Rs. ")
        sanitized_text = sanitized_text.replace("–", "-").replace("—", "-")
        sanitized_text = sanitized_text.replace("“", '"').replace("”", '"')
        sanitized_text = sanitized_text.replace("‘", "'").replace("’", "'")
        sanitized_text = sanitized_text.encode('ascii', 'ignore').decode('ascii')

    try:
        # Create a request object-like structure or update the model
        # We will update the model in models.py to support resume_text
        request_data = AnalyzeRequest(
            url=job_url,
            text=sanitized_text,
            linkedin_profile_url=linkedin_url,
            resume_text=resume_text # New field we need to add to model
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
