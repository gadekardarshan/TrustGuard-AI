import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

class LLMClient:
    def __init__(self):
        self.api_key = os.getenv("MODELSLAB_API_KEY")
        self.api_url = "https://modelslab.com/api/v7/llm/chat/completions"
        self.model_id = "gpt-5"

    def analyze(self, job_text: str, context: str = "") -> dict:
        """
        Analyzes text using GPT-5 via ModelsLab API to detect scam patterns.
        Returns a dictionary with structured risk flags and scam probability.
        """
        if not job_text:
            return {"llm_score": 0}

        # Heuristic fallback for explicit keywords (Fail-Secure)
        if "fake" in job_text.lower() or "scam" in job_text.lower():
             return {
                "hidden_fees": True,
                "domain_mismatch": False,
                "messaging_apps": False,
                "unrealistic_salary": False,
                "vague_role": False,
                "company_unclear": False,
                "llm_score": 100 # Max scam score
            }

        prompt = f"""
You are a job scam detection AI.

Analyze the following job description and return the findings in pure JSON only.

Job description:
\"""{job_text}\"""

Context (User Profile):
\"""{context}\"""

Evaluate the following:

1. Are there hints of hidden fees or deposits?
2. Does the application URL match the company name?
3. Is the job using Telegram/WhatsApp for hiring?
4. Is the salary unrealistic for the hours?
5. Is the job description vague?
6. Is the company identity unclear?
7. Final scam probability score from 0 to 100 (0 = Safe, 100 = Scam).

Return JSON only in this format:
{{
    "hidden_fees": true/false,
    "domain_mismatch": true/false,
    "messaging_apps": true/false,
    "unrealistic_salary": true/false,
    "vague_role": true/false,
    "company_unclear": true/false,
    "llm_score": number
}}
"""

        payload = {
            "key": self.api_key,
            "model_id": self.model_id,
            "messages": [{"role": "user", "content": prompt}]
        }

        try:
            response = requests.post(self.api_url, json=payload, headers={"Content-Type": "application/json"}, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            content = data.get('choices', [{}])[0].get('message', {}).get('content', '')
            
            # Clean content
            content = content.strip()
            if content.startswith("```json"):
                content = content[7:]
            if content.endswith("```"):
                content = content[:-3]
            content = content.strip()

            return json.loads(content)

        except Exception as e:
            safe_error = str(e).encode('ascii', 'replace').decode('ascii')
            print(f"LLM API Error: {safe_error}")
            return {"llm_score": 0, "error": safe_error}

