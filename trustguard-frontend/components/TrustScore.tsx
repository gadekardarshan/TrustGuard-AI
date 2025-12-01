import React from 'react';
import { AnalyzeResponse } from '@/app/utils/api';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import clsx from 'clsx';

interface TrustScoreProps {
    result: AnalyzeResponse;
}

export default function TrustScore({ result }: TrustScoreProps) {
    const { trust_score, label, reasons, recommended_action, user_analysis } = result;

    let colorClass = 'text-red-500';
    let bgClass = 'bg-red-500/10 border-red-500/20';
    let Icon = ShieldX;

    if (trust_score >= 60) {
        colorClass = 'text-green-500';
        bgClass = 'bg-green-500/10 border-green-500/20';
        Icon = ShieldCheck;
    } else if (trust_score >= 30) {
        colorClass = 'text-yellow-500';
        bgClass = 'bg-yellow-500/10 border-yellow-500/20';
        Icon = ShieldAlert;
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Card */}
            <div className={clsx("p-6 rounded-2xl border backdrop-blur-sm", bgClass)}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={clsx("p-4 rounded-full bg-slate-950/50", colorClass)}>
                            <Icon size={48} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-100">{trust_score}/100</h2>
                            <p className={clsx("text-lg font-medium", colorClass)}>{label}</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Risk Level</p>
                        <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden mx-auto md:ml-auto">
                            <div
                                className={clsx("h-full transition-all duration-1000 ease-out", colorClass.replace('text-', 'bg-'))}
                                style={{ width: `${trust_score}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* User Context Analysis */}
            {user_analysis && user_analysis.profile_found && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                        <Info size={20} />
                        Personalized Analysis
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 italic border-l-2 border-indigo-500/50 pl-3">
                        {user_analysis.context}
                    </p>
                    {user_analysis.risk_factors && user_analysis.risk_factors.length > 0 ? (
                        <ul className="space-y-2">
                            {user_analysis.risk_factors.map((factor, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-orange-300 text-sm">
                                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                    <span>{factor}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-green-400 text-sm flex items-center gap-2">
                            <CheckCircle size={16} />
                            No specific profile mismatches found.
                        </p>
                    )}
                </div>
            )}

            {/* Reasons & Action */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Analysis Report</h3>
                    <ul className="space-y-3">
                        {reasons.map((reason, idx) => (
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
