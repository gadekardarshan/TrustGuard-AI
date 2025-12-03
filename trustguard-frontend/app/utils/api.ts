const API_URL = 'http://localhost:8081';

export const analyzeScam = async (jobUrl: string, jobDescription: string) => {
    const formData = new FormData();
    if (jobUrl) formData.append('job_url', jobUrl);
    if (jobDescription) formData.append('job_description', jobDescription);

    const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Analysis failed');
    }

    return await response.json();
};
