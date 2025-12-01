import random

class LinkedInService:
    def __init__(self):
        pass

    def extract_profile(self, profile_url: str) -> dict:
        """
        Mock implementation to simulate extracting user data from a LinkedIn profile.
        In a real app, this would use an official API or a scraping service (with permission).
        """
        if not profile_url or "linkedin.com/in/" not in profile_url:
            return None

        # Simulate different user personas based on URL hash or random
        # For demo purposes, we'll return a "Fresher" profile to test the mismatch logic
        return {
            "name": "Demo User",
            "headline": "Fresh Graduate | Seeking Entry Level Opportunities",
            "experience_years": 0,
            "skills": ["Python", "Java", "HTML", "CSS"],
            "current_role": "Student",
            "is_student": True
        }

    def analyze_fit(self, user_profile: dict, job_text: str) -> dict:
        """
        Analyzes if the job is a realistic fit for the user.
        """
        if not user_profile or not job_text:
            return {"score_deduction": 0, "reasons": []}

        score_deduction = 0
        reasons = []
        job_text_lower = job_text.lower()

        # Logic 1: Senior role offered to Fresher
        if user_profile["experience_years"] < 2:
            if "senior" in job_text_lower or "lead" in job_text_lower or "manager" in job_text_lower:
                # Unless it's "campus manager" or similar, usually suspicious if they target freshers for senior roles
                if "campus" not in job_text_lower:
                    score_deduction += 15
                    reasons.append("Suspicious: Senior role offered to a fresher/student")

        # Logic 2: Mismatch in skills (Simple keyword check)
        # If job requires "Expert" in something user doesn't have, but they got "Selected"
        if "selected" in job_text_lower:
            # If user is student and job offers high salary
            if user_profile["is_student"] and ("50,000" in job_text_lower or "1,00,000" in job_text_lower or "lpa" in job_text_lower):
                 score_deduction += 10
                 reasons.append("Unrealistic salary offer for a student profile")

        return {
            "score_deduction": score_deduction,
            "reasons": reasons,
            "user_context": f"Analyzed for {user_profile['name']} ({user_profile['headline']})"
        }
