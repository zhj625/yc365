
import React from 'react';
import { ListChecks } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginViewProps {
  lang: Language;
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ lang, onLogin }) => {
  const t = TRANSLATIONS[lang].auth;

  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-40 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 极简圆形图标 */}
      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-800 mb-8">
        <ListChecks className="w-10 h-10 text-slate-200 dark:text-slate-700" strokeWidth={1.5} />
      </div>
      
      {/* 居中状态文本 */}
      <h2 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-10 tracking-tight">
        {t.pleaseLogin}
      </h2>
      
      {/* 醒目的蓝色圆角引导按钮 */}
      <button 
        id="tour-login-btn"
        onClick={onLogin}
        className="px-12 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-[20px] shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center min-w-[180px]"
      >
        {t.connectBtn}
      </button>
    </div>
  );
};

export default LoginView;
