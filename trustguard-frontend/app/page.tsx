'use client';
import { useState } from 'react';
import { analyzeScam, AnalyzeResponse } from './utils/api';
import TrustScore from '@/components/TrustScore';
import { Shield, Search, AlertCircle, Loader2, Link as LinkIcon, FileText } from 'lucide-react';

export default function Home() {
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    // 1. Validate Job Input
    if (!jobUrl && !jobDescription) {
      setError("Please provide either a Job URL or Job Description.");
      return;
    }

    // 2. Validate Job Description Length
    if (jobDescription && jobDescription.length < 50) {
      setError("Job description is too short. Please provide at least 50 characters for accurate analysis.");
      return;
    }

    // 3. Validate LinkedIn URL (Optional now)
    if (linkedinUrl && !linkedinUrl.includes("linkedin.com")) {
      setError("Please enter a valid LinkedIn URL (must contain 'linkedin.com').");
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    if (jobUrl) formData.append('job_url', jobUrl);
    if (jobDescription) formData.append('job_description', jobDescription);
    if (linkedinUrl) formData.append('linkedin_url', linkedinUrl);
    if (resumeFile) formData.append('resume_file', resumeFile);

    try {
      const data = await analyzeScam(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            TrustGuard AI
          </h1>
          <p className="text-slate-400 text-lg">
            Advanced Scam Detection for Job Seekers. Analyze job posts and verify safety instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Section 1: Job Information */}
          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <span>💼</span> Job Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Job Posting URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/jobs/..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-1">Paste the link to the job posting.</p>
              </div>

              <div className="text-center text-slate-600 text-sm">- OR -</div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Job Description</label>
                <textarea
                  placeholder="Paste the full job description text here..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Your Information */}
          <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <span>👤</span> Your Context
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-1">Used to check if the job matches your profile level.</p>
              </div>

              <div className="text-center text-slate-600 text-sm">- OR -</div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Upload Resume (PDF)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    className="block w-full text-sm text-slate-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-emerald-500/10 file:text-emerald-400
                      hover:file:bg-emerald-500/20
                      cursor-pointer"
                    onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Max 5MB. Only used for analysis, not stored.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-center animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Analyze Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`
              px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all transform hover:scale-105
              ${loading
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-500/25'}
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin h-5 w-5 text-white" />
                Analyzing...
              </span>
            ) : (
              'Analyze for Scam Risk 🛡️'
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in-up">
            <TrustScore result={result} />
          </div>
        )}

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© 2025 TrustGuard AI. Hackathon Project.</p>
        </footer>
      </div>
    </main>
  );
}
