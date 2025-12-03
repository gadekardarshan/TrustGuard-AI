# TrustGuard AI 🛡️

**TrustGuard AI** is an advanced scam detection platform designed to analyze job postings, messages, and websites. It uses a multi-layered approach combining **Rule-Based Heuristics**, **Domain Reputation Analysis**, and **Local LLM Semantic Analysis (Nvidia Nemotron)** to provide a comprehensive Trust Score and detailed risk assessment.

![TrustGuard AI Dashboard](https://via.placeholder.com/800x400?text=TrustGuard+AI+Dashboard)

## 🚀 Key Features

*   **🛡️ Multi-Layered Detection**: Combines regex rules, domain checks, and AI analysis.
*   **🧠 Local AI Analysis**: Integrated with **Nvidia Nemotron-4 9B** (running locally) for privacy-first, offline-capable scam detection.
*   **📄 Resume Analysis**: Upload your PDF resume to check if a job matches your profile level.
*   **🎣 Phishing Detection**: Specifically trained to flag "Security Alert" and "Unusual Login" phishing attempts.
*   **⚡ Fail-Secure Logic**: Automatically flags high-risk keywords ("fake", "scam") with a 0 Trust Score.
*   **✅ Strict Validation**: Enforces minimum text length (50 chars) and valid LinkedIn URLs to ensure quality analysis.
*   **🔗 Domain Verification**: Checks if application links match the company's official domain.
*   **🎨 Modern UI**: Built with Next.js 14 and Tailwind CSS for a premium, glassmorphism-inspired experience.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS v4
*   **Backend**: Python, FastAPI, Uvicorn, PyPDF
*   **AI/LLM**: Nvidia Nemotron-4 9B (Local Inference via vLLM/Ollama)
*   **Tools**: Regex, TLDExtract, Pydantic

---

## 📦 How to Run the Project

### Prerequisites
*   **Python 3.9+** installed.
*   **Node.js 18+** installed.
*   **Local LLM Server**: You need a local LLM running on port `8000` (e.g., using vLLM or Ollama with `nvidia-nemotron`).

### 1️⃣ Backend Setup (FastAPI)

1.  Navigate to the backend folder:
    ```bash
    cd trustguard-backend
    ```

2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Start Local LLM**: Ensure your local AI model is running at `http://127.0.0.1:8000`.

5.  Run the Server:
    ```bash
    python -m uvicorn app.main:app --reload --port 8081
    ```
    *   The backend will start at `http://localhost:8081`.

### 2️⃣ Frontend Setup (Next.js)

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd trustguard-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the Development Server:
    ```bash
    npm run dev
    ```

4.  Open your browser:
    *   Go to [http://localhost:3000](http://localhost:3000) to use the app!

---

## 🧪 Testing the App

Try entering these sample inputs to see the detection in action:

**1. Phishing Attempt (New!)**
> "Your account just logged in using a Windows device we haven't seen recently. Click the link below to verify this was you. If this wasn't you please change your password."

**2. Subtle Scam (Altera Finance)**
> "Job Title: Operations Assistant. Company: Altera Finance Group. Apply via: https://alterafinance-careers.com/apply. Once approved, contact our HR mentor on Telegram for mandatory orientation. Minor administrative charges may apply."

**3. Invalid Input (Validation Check)**
> "Hello" (Will trigger a validation error for being too short)

**4. Legit Job**
> "Software Engineer at Microsoft. Apply via careers.microsoft.com. No fees required. We are looking for a skilled developer with 5+ years of experience..."

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📜 License

This project is open-source and available under the MIT License.
