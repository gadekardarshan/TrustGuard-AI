import React from 'react';
import { EnhancedAnalyzeResponse } from '@/app/utils/api';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, Building2 } from 'lucide-react';
import clsx from 'clsx';

interface TrustScoreProps {
    result: EnhancedAnalyzeResponse;
}

export default function TrustScore({ result }: TrustScoreProps) {
    const {
        trust_score,
        label,
        reasons,
        recommended_action,
        company_verified,
        company_trust_score,
        company_name,
        company_risk_factors,
        combined_trust_score
    } = result;

    // Use combined score if available, otherwise use job score
    const displayScore = combined_trust_score ?? trust_score;

    let colorClass = 'text-red-500';
    let bgClass = 'bg-red-500/10 border-red-500/20';
    let Icon = ShieldX;

    if (displayScore >= 60) {
        colorClass = 'text-green-500';
        bgClass = 'bg-green-500/10 border-green-500/20';
        Icon = ShieldCheck;
    } else if (displayScore >= 30) {
        colorClass = 'text-yellow-500';
        bgClass = 'bg-yellow-500/10 border-yellow-500/20';
        Icon = ShieldAlert;
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Card */}
            <div className={clsx("p-6 rounded-2xl border backdrop-blur-sm", bgClass)}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={clsx("p-4 rounded-full bg-slate-950/50", colorClass)}>
                            <Icon size={48} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-100">
                                {displayScore}/100
                                {company_verified && combined_trust_score && (
                                    <span className="text-xs ml-2 text-cyan-400">(Combined)</span>
                                )}
                            </h2>
                            <p className={clsx("text-lg font-medium", colorClass)}>{label}</p>
                            {company_verified && company_name && (
                                <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                                    <Building2 size={14} />
                                    {company_name}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Risk Level</p>
                        <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden mx-auto md:ml-auto">
                            <div
                                className={clsx("h-full transition-all duration-1000 ease-out", colorClass.replace('text-', 'bg-'))}
                                style={{ width: `${displayScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Verification Section */}
            {company_verified && company_trust_score !== undefined && (
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <Building2 size={20} />
                        Company Verification
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-sm">Company Trust Score</span>
                            <span className={clsx(
                                "text-lg font-semibold",
                                company_trust_score >= 70 ? "text-green-400" :
                                    company_trust_score >= 50 ? "text-yellow-400" : "text-red-400"
                            )}>
                                {company_trust_score}/100
                            </span>
                        </div>
                        {trust_score !== displayScore && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300 text-sm">Job Posting Score</span>
                                    <span className="text-slate-100 text-lg font-semibold">{trust_score}/100</span>
                                </div>
                                <div className="pt-2 border-t border-slate-700">
                                    <p className="text-xs text-slate-400 italic">
                                        Combined score weighs both job analysis (60%) and company verification (40%)
                                    </p>
                                </div>
                            </>
                        )}
                        {company_risk_factors && company_risk_factors.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Company Risk Factors:</h4>
                                <ul className="space-y-2">
                                    {company_risk_factors.slice(0, 5).map((factor: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-orange-300 text-xs">
                                            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                                            <span>{factor}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Reasons & Action */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Analysis Report</h3>
                    <ul className="space-y-3">
                        {reasons.map((reason: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                <AlertTriangle size={16} className="mt-0.5 text-yellow-500 shrink-0" />
                                <span>{reason}</span>
                            </li>
                        ))}
                        {reasons.length === 0 && (
                            <li className="text-slate-400 italic">No specific threats detected.</li>
                        )}
                    </ul>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Recommendation</h3>
                    <div className="flex-1 flex items-center justify-center text-center p-4 bg-slate-950/30 rounded-lg border border-slate-800/50">
                        <p className="text-slate-100 font-medium leading-relaxed">
                            {recommended_action}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
