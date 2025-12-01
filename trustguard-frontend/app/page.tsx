'use client';

import { useState } from 'react';
import { analyzeContent, AnalyzeResponse } from './utils/api';
import TrustScore from '@/components/TrustScore';
import { Shield, Search, AlertCircle, Loader2, Link as LinkIcon, FileText } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url && !text) {
      setError('Please provide either a URL or Text to analyze.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeContent(url, text, linkedinUrl);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 ring-1 ring-indigo-500/20">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          TrustGuard AI
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Instant scam detection for job posts, websites, and messages.
          Powered by AI to protect you from fraud.
        </p>
      </header>

      {/* Analysis Form */}
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <form onSubmit={handleAnalyze} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <LinkIcon size={16} />
                Website / Job URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com/job-post"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <LinkIcon size={16} className="text-blue-400" />
                Your LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              />
              <p className="text-xs text-slate-500">
                Used to check if the job is a realistic match for your profile.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FileText size={16} />
              Job Description / Message Text
            </label>
            <textarea
              rows={5}
              placeholder="Paste the job description, email content, or WhatsApp message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} />
                Check Trust Score
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && <TrustScore result={result} />}

      {/* Footer */}
      <footer className="mt-20 text-center text-slate-600 text-sm">
        <p>© 2025 TrustGuard AI. Hackathon Project.</p>
        <p className="mt-1">Disclaimer: Scores are automated estimates. Always verify independently.</p>
      </footer>
    </main>
  );
}
