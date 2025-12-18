import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Wallet, ArrowRight, QrCode } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToast: (msg: string, type?: 'success' | 'error') => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, lang, onAddToast }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const t = TRANSLATIONS[lang].deposit;

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    onAddToast(t.copied, "success");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = () => {
    if (!amount) {
        onAddToast(t.error, "error");
        return;
    }
    onAddToast(`${activeTab === 'deposit' ? t.deposit : t.withdraw} ${t.success}`, "success");
    onClose();
  };

  // Mock Data
  const walletAddress = "0xF51B4c6Ea596F7cf668afC4B138498193dF97813";
  const contractAddress = "0x22b6ff5f36948355e51b1c1727815e2c9b352cbf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Close Button */}
        <div className="absolute top-4 right-4 z-10">
            <button 
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 py-5 text-sm font-bold transition-colors relative ${
                    activeTab === 'deposit' 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
                {t.deposit}
                {activeTab === 'deposit' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
            </button>
            <button
                onClick={() => setActiveTab('withdraw')}
                className={`flex-1 py-5 text-sm font-bold transition-colors relative ${
                    activeTab === 'withdraw' 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
                {t.withdraw}
                {activeTab === 'withdraw' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
            </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
            
            {/* Network & Currency */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.network}</span>
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        BNB Chain
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                        USDT
                    </span>
                </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>{activeTab === 'deposit' ? t.amount : t.withdrawAmount}</span>
                    <span>{t.balance}: 50.00 USDT</span>
                </div>
                <div className="relative group">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t.placeholder}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-4 pr-20 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all group-hover:border-blue-300 dark:group-hover:border-slate-600"
                    />
                    <button 
                        onClick={() => setAmount('50')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                    >
                        {t.max}
                    </button>
                </div>
            </div>

            {/* Addresses Section (Only for Deposit usually, simplified here) */}
            <div className="space-y-4">
                {/* Payment Address */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                        <span>{t.paymentAddr}</span>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                            <QrCode className="w-3.5 h-3.5" />
                            <span>{t.qr}</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-4 pr-12 text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                            {walletAddress}
                        </div>
                        <button 
                            onClick={() => handleCopy(walletAddress, 'wallet')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-500 transition-colors"
                        >
                            {copiedField === 'wallet' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Contract Address */}
                <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t.contractAddr}</span>
                    <div className="relative group">
                        <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-4 pr-12 text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                            {contractAddress}
                        </div>
                        <button 
                            onClick={() => handleCopy(contractAddress, 'contract')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-500 transition-colors"
                        >
                            {copiedField === 'contract' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button 
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {t.submit}
                <ArrowRight className="w-5 h-5" />
            </button>

        </div>
      </div>
    </div>
  );
};

export default DepositModal;