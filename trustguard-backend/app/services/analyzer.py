from app.models import AnalyzeRequest, AnalyzeResponse
from app.services.domain_checker import DomainChecker
from app.services.rules_engine import RulesEngine
from app.services.llm_client import LLMClient
from app.services.linkedin_service import LinkedInService

class Analyzer:
    def __init__(self):
        self.domain_checker = DomainChecker()
        self.rules_engine = RulesEngine()
        self.llm_client = LLMClient()
        self.linkedin_service = LinkedInService()

    def analyze(self, request: AnalyzeRequest) -> AnalyzeResponse:
        # 1. Domain Analysis
        domain_reputation_score = 0
        domain_reasons = []
        if request.url:
            domain_result = self.domain_checker.analyze_url(request.url)
            domain_reputation_score = domain_result["score_deduction"] # This is actually a deduction, so it's "Risk Score"
            domain_reasons = domain_result["reasons"]

        # 2. Rules Engine Analysis
        rules_data = self.rules_engine.analyze(request.text or "")
        
        # 3. LLM Semantic Analysis
        context = ""
        user_analysis_result = None
        if request.linkedin_profile_url:
             user_profile = self.linkedin_service.extract_profile(request.linkedin_profile_url)
             if user_profile:
                 # We can pass this to LLM
                 context = f"User Profile: {user_profile}"
                 user_analysis_result = {"profile_found": True, "context": context}

        llm_data = self.llm_client.analyze(request.text or "", context)

        # 4. Scoring Engine
        from app.services.scoring_engine import ScoringEngine
        scoring_engine = ScoringEngine()
        
        score_result = scoring_engine.combine(rules_data, llm_data, domain_reputation_score)
        
        # Collect Reasons
        all_reasons = []
        all_reasons.extend(domain_reasons)
        
        # Map rules to reasons
        if rules_data["domain_mismatch"]: all_reasons.append("Application link does not match company domain")
        if rules_data["messaging_apps"]: all_reasons.append("Uses Telegram/WhatsApp for hiring")
        if rules_data["hidden_fees"]: all_reasons.append("Mentions hidden fees or deposits")
        if rules_data["low_hours_high_pay"]: all_reasons.append("Unrealistic high pay for low hours")
        if rules_data["vague_description"]: all_reasons.append("Vague job description")
        if rules_data["missing_manager_name"]: all_reasons.append("No hiring manager or recruiter name")
        
        # Map LLM flags to reasons
        if llm_data.get("hidden_fees"): all_reasons.append("AI detected hidden fees")
        if llm_data.get("unrealistic_salary"): all_reasons.append("AI detected unrealistic salary")
        if llm_data.get("company_unclear"): all_reasons.append("AI detected unclear company identity")

        return AnalyzeResponse(
            trust_score=score_result["final_score"],
            label=score_result["risk_level"],
            reasons=list(set(all_reasons)),
            recommended_action="Proceed with caution." if score_result["final_score"] > 60 else "Do NOT pay or share personal details.",
            user_analysis=user_analysis_result
        )
