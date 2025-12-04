# TrustGuard AI 🛡️

**TrustGuard AI** is an advanced job scam detection platform that analyzes job postings and verifies companies using multi-layered AI analysis. Combining **rule-based heuristics**, **domain reputation checking**, **company verification via web scraping**, and **Nvidia NIM Cloud AI semantic analysis**, it provides comprehensive trust scores and risk assessments to protect job seekers from fraudulent listings.

## 🚀 Key Features

*   **🛡️ Multi-Layered Detection**: Combines regex rules, domain checks, company verification, and AI semantic analysis
*   **🏢 Company Verification**: Automatically scrapes and verifies company websites using Firecrawl.dev
    - SSL/HTTPS security checks
    - Contact page verification
    - Privacy policy & legal information validation
    - Social media presence verification
    - AI-powered legitimacy analysis
*   **📊 Combined Trust Scoring**: Weighs both job posting analysis (60%) and company verification (40%) for comprehensive risk assessment
*   **🔍 Automatic Company Detection**: Extracts company names from job descriptions and automatically finds company websites
*   **🧠 Nvidia Cloud AI Analysis**: Integrated with **Nvidia NIM (Mixtral 8x7B)** for powerful, cloud-based scam detection
*   **🎣 Phishing Detection**: Flags "Security Alert" and "Unusual Login" phishing attempts
*   **⚡ Fail-Secure Logic**: Automatically flags high-risk keywords ("fake", "scam") with 0 trust score
*   **✅ Strict Validation**: Enforces minimum text length (50 chars) for quality analysis
*   **🔗 Domain Verification**: Checks if application links match the company's official domain
*   **🎨 Modern UI**: Built with Next.js 14 and Tailwind CSS v4 for a premium, glassmorphism-inspired experience

## 🛠️ Tech Stack

### Backend
*   **Framework**: Python, FastAPI, Uvicorn
*   **AI/LLM**: Nvidia NIM Cloud API (Mistral 8x7B Instruct)
*   **Web Scraping**: Firecrawl.dev API for company verification
*   **Libraries**: Pydantic, BeautifulSoup4, TLDExtract, Validators

### Frontend
*   **Framework**: Next.js 14, React
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **UI Components**: Custom glassmorphism design

---

## 📦 Installation & Setup

### Prerequisites
*   **Python 3.9+** installed
*   **Node.js 18+** installed
*   **Firecrawl API Key**: Get free key from [firecrawl.dev](https://www.firecrawl.dev/)
*   **Nvidia API Key**: Get key from [build.nvidia.com](https://build.nvidia.com/)

### 1️⃣ Backend Setup (FastAPI)

1.  **Navigate to backend folder:**
    ```bash
    cd trustguard-backend
    ```

2.  **Create virtual environment** (optional but recommended):
    ```bash
    python -m venv venv
    
    # Windows
    venv\Scripts\activate
    
    # Mac/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure API Keys:**
    ```bash
    # Copy example env file
    cp .env.example .env
    
    # Edit .env and add your keys:
    # FIRECRAWL_API_KEY=your_api_key_here
    # LLM_API_KEY=nvapi-... (Nvidia NIM Key)
    ```

5.  **Start Backend**:

6.  **Run the server:**
    ```bash
    python -m uvicorn app.main:app --reload --port 8081
    ```
    Backend will start at `http://localhost:8081`

### 2️⃣ Frontend Setup (Next.js)

1.  **Navigate to frontend folder:**
    ```bash
    cd trustguard-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Go to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

### Option 1: Job Description + Company Verification (Recommended)

1. Copy job description from any source (LinkedIn, Indeed, etc.)
2. Paste into "Job Description" field
3. Optionally add company website URL (e.g., `https://company.com`)
4. Click "Analyze Job"
5. View comprehensive analysis with company verification

**Example:**
```
Job Description: "Senior Software Engineer at TechCorp..."
Company URL: https://techcorp.com
↓
Result: Combined trust score (60% job + 40% company)
```

### Option 2: Company Career Page URL

For jobs posted on company websites (not job boards):

```
Job URL: https://company.com/careers/job-posting
↓
System automatically extracts job description and company info
```

**Note:** LinkedIn, Indeed, and Glassdoor URLs are blocked by anti-scraping protections. Use manual description method instead.

---

## 🧪 Testing Examples

### 1. Phishing Attempt
```
"Your account just logged in using a Windows device we haven't seen recently. 
Click the link below to verify this was you. If this wasn't you please change 
your password."
```
**Expected:** Very Low trust score, phishing warning

### 2. Suspicious Scam (Telegram for hiring)
```
"Job Title: Operations Assistant
Company: Altera Finance Group  
Apply via: https://alterafinance-careers.com/apply
Once approved, contact our HR mentor on Telegram for mandatory orientation. 
Minor administrative charges may apply."
```
**Expected:** Low trust score, multiple red flags

### 3. Legitimate Job
```
"Software Engineer at Microsoft
Apply via: careers.microsoft.com
We are looking for a skilled developer with 5+ years of experience in Python 
and React. No fees required."
```
**Expected:** High trust score

### 4. With Company Verification ✨
```
Job Description: "Full Stack Developer at ACME Corp..."
Company URL: https://acmecorp.com
↓
Result: 
- Job Trust Score: 75/100
- Company Trust Score: 85/100
- Combined Score: 79/100 (Verified)
```

---

## 📊 API Endpoints

### `POST /analyze`
Basic job analysis without company verification

**Request:**
```json
{
  "job_url": "optional",
  "job_description": "Job posting text..."
}
```

### `POST /analyze/enhanced` ⭐
Enhanced analysis with automatic company verification

**Request:**
```json
{
  "job_url": "optional", 
  "job_description": "Job posting text...",
  "company_url": "https://company.com" // optional, auto-detected
}
```

**Response:**
```json
{
  "trust_score": 75,
  "combined_trust_score": 79,
  "label": "Low Risk (Verified)",
  "company_verified": true,
  "company_trust_score": 85,
  "company_name": "ACME Corp",
  "reasons": [...],
  "company_risk_factors": [...]
}
```

### `POST /analyze/company`
Standalone company verification

### `GET /health/firecrawl`
Check Firecrawl API configuration status

---

## ⚙️ Features in Detail

### Company Verification Checks

The system performs 6-7 quality checks on companies:

1. **SSL/HTTPS Security**: Verifies encrypted connection
2. **Contact Information**: Checks for email, phone, address
3. **About/Contact Pages**: Validates presence of company information pages
4. **Privacy Policy & Terms**: Legal compliance verification
5. **Social Media Presence**: LinkedIn, Twitter, Facebook validation
6. **Content Quality**: AI analysis of website legitimacy
7. **Spam Detection**: Identifies spam language patterns

### Trust Score Calculation

```
Job Analysis (60%):
- Domain reputation
- Keyword patterns
- LLM semantic analysis

Company Verification (40%):
- Legitimacy indicators
- Website security
- Contact information
- AI legitimacy analysis

Combined Score = (Job × 0.6) + (Company × 0.4)
```

---

## 🔒 Privacy & Security

*   **Nvidia Cloud AI**: Semantic analysis runs on secure Nvidia NIM Cloud API
*   **No Data Collection**: Job descriptions are not stored or transmitted to third parties
*   **Open Source**: Full transparency with publicly available code
*   **API Key Security**: Environment variables for sensitive credentials

---

## 🚧 Known Limitations

*   **Job Board URLs**: LinkedIn, Indeed, and Glassdoor block automated scraping
    - **Workaround**: Copy job descriptions manually
*   **Rate Limiting**: Firecrawl API has usage limits
*   **API Dependency**: Requires valid Nvidia API key for semantic analysis

---

## 🛣️ Roadmap

- [ ] Domain age checking
- [ ] Enhanced company quality checks (business registration, reviews)
- [ ] Job history analysis (posting patterns)
- [ ] Browser extension for one-click analysis
- [ ] Support for more languages
- [ ] API integrations with job boards

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🙏 Acknowledgments

*   **Firecrawl.dev** - Web scraping API
*   **Nvidia NIM** - Cloud AI for semantic analysis
*   **FastAPI** - Modern Python web framework
*   **Next.js** - React framework

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ to protect job seekers from scams**
