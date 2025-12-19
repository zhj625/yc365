
import React, { useState } from 'react';
import { 
  Droplets, 
  Wallet, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  ArrowRight,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FaucetViewProps {
  lang: Language;
  onAddToast: (msg: string, type?: 'success' | 'error') => void;
  onBack?: () => void;
  onCloseTour?: () => void;
}

const FaucetView: React.FC<FaucetViewProps> = ({ lang, onAddToast, onBack, onCloseTour }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState<Date | null>(null);
  const t = TRANSLATIONS[lang].faucet;

  const handleClaim = () => {
    // 立即标记第3步完成，衔接后续回到主页后的引导
    if (onCloseTour) onCloseTour();
    
    setIsClaiming(true);
    // Simulate network request
    setTimeout(() => {
      setIsClaiming(false);
      setLastClaimTime(new Date());
      onAddToast(lang === 'en' ? "Successfully claimed 50 Test USDT!" : "成功领取 50 测试 USDT！", "success");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button */}
      {onBack && (
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 font-medium transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
        </button>
      )}

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden relative">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative p-8 sm:p-10 flex flex-col items-center text-center">
          
          {/* Header Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-3xl flex items-center justify-center mb-6 shadow-sm ring-4 ring-white dark:ring-slate-900">
            <Droplets className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            {t.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
            {t.desc}
          </p>

          {/* Wallet Info Box */}
          <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-8 flex flex-col gap-4">
             <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  {t.connected}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                  tBNB Chain
                </span>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                   <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      <Wallet className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                   </div>
                   <div className="flex flex-col items-start min-w-0">
                      <span className="text-xs text-slate-400 font-medium">{t.address}</span>
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate font-mono">0xF51B...7813</span>
                        <button className="text-slate-400 hover:text-blue-500 transition-colors">
                           <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                   </div>
                </div>

                <div className="h-8 w-px bg-slate-200 dark:border-slate-700 hidden sm:block"></div>

                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto bg-blue-50 dark:bg-blue-900/20 sm:bg-transparent rounded-xl sm:rounded-none p-3 sm:p-0">
                   <span className="text-xs text-slate-400 font-medium">{t.gasBalance}</span>
                   <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">0.0644 tBNB</span>
                </div>
             </div>
          </div>

          {/* Action Button */}
          <div className="w-full relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
            <button 
              id="tour-claim-btn"
              onClick={handleClaim}
              disabled={isClaiming || !!lastClaimTime}
              className={`relative w-full py-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                lastClaimTime 
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99]'
              }`}
            >
              {isClaiming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.minting}
                </>
              ) : lastClaimTime ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t.claimed}
                </>
              ) : (
                <>
                  {t.claim}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Cooldown Timer (if claimed) */}
          {lastClaimTime && (
             <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Clock className="w-4 h-4" />
                {t.cooldown} 23h 59m
             </div>
          )}

        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 px-8 py-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                 <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                 <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.reqTitle}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                       {t.reqDesc}
                       <a href="#" className="text-blue-500 hover:underline ml-1 inline-flex items-center gap-0.5">
                          {t.getBnb} <ExternalLink className="w-2.5 h-2.5" />
                       </a>
                    </p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                 <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.limitTitle}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                       {t.limitDesc}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-slate-400">
         {t.note}
      </div>
    </div>
  );
};

export default FaucetView;
