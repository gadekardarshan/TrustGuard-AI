const API_URL = 'http://localhost:8081';

export interface AnalyzeResponse {
    trust_score: number;
    label: string;
    reasons: string[];
    recommended_action: string;
    user_analysis?: {
        profile_found: boolean;
        context?: string;
        risk_factors?: string[];
        error?: string;
        source?: string;
    };
}

export const analyzeScam = async (formData: FormData): Promise<AnalyzeResponse> => {
    try {
        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            body: formData, // fetch automatically sets Content-Type to multipart/form-data
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Analysis failed');
        }

        return await response.json();
    } catch (error: any) {
        console.error("API Error:", error);
        throw new Error(error.message || "Network error occurred");
    }
};
