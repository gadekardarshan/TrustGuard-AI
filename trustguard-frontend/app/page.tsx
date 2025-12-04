'use client';
import { useState } from 'react';
import { analyzeEnhanced, type EnhancedAnalyzeResponse } from './utils/api';
import TrustScore from '@/components/TrustScore';
import { ShieldCheck, Briefcase, AlertTriangle, ArrowRight, Building2 } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [result, setResult] = useState<EnhancedAnalyzeResponse | null>(null);
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

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeEnhanced(jobUrl, jobDescription, companyUrl);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-cyan-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-100">AI-Powered Scam Detection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            TrustGuard AI
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Analyze job postings and websites instantly. Detect scams, hidden fees, and phishing attempts with advanced AI.
          </p>
        </header>

        {/* Main Input Section */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Job Information Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-pink-500/10">
                  <Briefcase className="w-6 h-6 text-pink-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Job Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Posting URL</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/jobs/..."
                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-2 ml-1">Paste the link to the job posting.</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1e293b] px-2 text-slate-500">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Description</label>
                  <textarea
                    rows={5}
                    placeholder="Paste the full job description here..."
                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-2 ml-1">
                    {jobDescription.length < 50 && jobDescription.length > 0 ? (
                      <span className="text-red-400">Too short ({jobDescription.length}/50 chars)</span>
                    ) : (
                      "Paste the text if you don't have a URL."
                    )}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1e293b] px-2 text-slate-500">OPTIONAL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    Company Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://company.com"
                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-2 ml-1">
                    {companyUrl ? (
                      <span className="text-cyan-400">✓ Company will be verified via web scraping</span>
                    ) : (
                      "Add company website to enable deeper verification"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4 mb-16">
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={clsx(
              "group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
              loading && "animate-pulse"
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Analyze Job
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <TrustScore result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
