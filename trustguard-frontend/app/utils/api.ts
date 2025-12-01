const API_URL = 'http://localhost:8080';

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
    };
}

export async function analyzeContent(url?: string, text?: string, linkedinUrl?: string): Promise<AnalyzeResponse> {
    const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: url || null,
            text: text || null,
            linkedin_profile_url: linkedinUrl || null,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Analysis failed');
    }

    return response.json();
}
