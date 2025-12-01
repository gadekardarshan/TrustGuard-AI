# TrustGuard AI 🛡️

**TrustGuard AI** is an advanced scam detection platform designed to analyze job postings, messages, and websites. It uses a multi-layered approach combining **Rule-Based Heuristics**, **Domain Reputation Analysis**, and **LLM Semantic Analysis (GPT-5)** to provide a comprehensive Trust Score and detailed risk assessment.

![TrustGuard AI Demo](https://via.placeholder.com/800x400?text=TrustGuard+AI+Dashboard)

## 🚀 Key Features

*   **🛡️ Multi-Layered Detection**: Combines regex rules, domain checks, and AI analysis.
*   **🧠 Advanced AI Analysis**: Uses GPT-5 (via ModelsLab) to detect subtle scam patterns like hidden fees, vague descriptions, and manipulative language.
*   **⚡ Fail-Secure Logic**: Automatically flags high-risk keywords ("fake", "scam") with a 0 Trust Score.
*   **🔗 Domain Verification**: Checks if application links match the company's official domain.
*   **💬 Messaging App Detection**: Flags suspicious requests to move conversation to Telegram or WhatsApp.
*   **🎨 Modern UI**: Built with Next.js 14 and Tailwind CSS for a premium, glassmorphism-inspired experience.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS v4
*   **Backend**: Python, FastAPI, Uvicorn
*   **AI/LLM**: ModelsLab API (GPT-5 / Llama-3)
*   **Tools**: Regex, TLDExtract, Pydantic

---

## 📦 How to Run the Project

### Prerequisites
*   **Python 3.9+** installed.
*   **Node.js 18+** installed.
*   **API Key**: You need a `MODELSLAB_API_KEY` for the AI features.

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

4.  Set up Environment Variables:
    *   Create a `.env` file in the `trustguard-backend` folder.
    *   Add your API key:
        ```env
        MODELSLAB_API_KEY=your_actual_api_key_here
        ```

5.  Run the Server:
    ```bash
    python -m uvicorn app.main:app --reload --port 8080
    ```
    *   The backend will start at `http://localhost:8080`.

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

**1. Subtle Scam (Altera Finance)**
> "Job Title: Operations Assistant. Company: Altera Finance Group. Apply via: https://alterafinance-careers.com/apply. Once approved, contact our HR mentor on Telegram for mandatory orientation. Minor administrative charges may apply."

**2. Obvious Scam**
> "Earn ₹50,000/week! No experience needed. Just pay a refundable deposit of ₹1,499 to start working immediately. WhatsApp only."

**3. Legit Job**
> "Software Engineer at Microsoft. Apply via careers.microsoft.com. No fees required."

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📜 License

This project is open-source and available under the MIT License.
