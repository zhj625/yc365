
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Droplets, Plus, Wallet, Menu, Bell, 
  Copy, ChevronRight, LayoutGrid, Settings, 
  LayoutDashboard, ClipboardList, Calendar, 
  PieChart, Star, Moon, Globe, Sun, Compass 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onFaucetClick?: () => void;
  onLogoClick?: () => void;
  onDepositClick?: () => void;
  onStartTour?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  lang, 
  setLang, 
  searchQuery, 
  setSearchQuery,
  isLoggedIn,
  onLogin,
  onLogout,
  onFaucetClick,
  onLogoClick,
  onDepositClick,
  onStartTour
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang].header;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all group"
    >
      <span className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{icon}</span>
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-8 flex-1">
          <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black italic text-2xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              <span className="pr-0.5 pt-0.5">Y</span>
            </div>
            <span className="text-[26px] font-black italic tracking-tighter text-slate-900 dark:text-white transition-colors leading-none mt-0.5">
              YC<span className="text-blue-600 dark:text-blue-500">365</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full px-4 py-2.5 w-full max-w-sm transition-all focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 focus-within:shadow-sm border border-slate-200/50 dark:border-slate-700 focus-within:border-blue-200 dark:focus-within:border-blue-800">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-3" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {!isLoggedIn ? (
            <button 
              id="header-connect-btn"
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Wallet className="w-4 h-4" />
              <span>{t.connect}</span>
            </button>
          ) : (
            <>
              <button 
                id="tour-faucet-btn"
                onClick={onFaucetClick}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-full transition-all border border-transparent dark:border-slate-700/50"
              >
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{t.faucet}</span>
              </button>

              <div className="hidden md:flex items-center p-1 pl-1.5 pr-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group cursor-pointer">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm mr-3 group-hover:scale-105 transition-transform ring-1 ring-blue-100 dark:ring-slate-600">
                   <Wallet className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center h-full">
                   <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none mb-0.5 tracking-wider">{t.totalBalance}</span>
                   <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono leading-none tracking-tight">$2,450.00</span>
                </div>
              </div>

              <button 
                onClick={onDepositClick} 
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                <Plus className="w-4 h-4" strokeWidth={3} />
                <span>{t.deposit}</span>
              </button>

               <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
               </button>

              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 ml-1 cursor-pointer outline-none"
                >
                   <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 p-0.5 ring-2 transition-all ${isProfileOpen ? 'ring-blue-200 dark:ring-blue-800 scale-105' : 'ring-transparent hover:ring-blue-200 dark:hover:ring-blue-900'}`}>
                      <img 
                          src="https://picsum.photos/id/64/100/100" 
                          alt="Avatar" 
                          className="w-full h-full rounded-full object-cover" 
                      />
                   </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-5 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/50 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
                            <img 
                              src="https://picsum.photos/id/64/100/100" 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800" 
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full ring-1 ring-emerald-100 dark:ring-emerald-900"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-white text-lg leading-tight truncate">Anonymous</div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full w-fit border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-100 dark:hover:border-blue-800 transition-colors cursor-pointer group">
                            <span className="truncate">0xF51B...7813</span>
                            <Copy className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <MenuItem 
                        icon={<ChevronRight className="w-4 h-4" />} 
                        label={t.profile.disconnect} 
                        onClick={() => {
                          onLogout();
                          setIsProfileOpen(false);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
                       <div className="p-4 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                         <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{t.profile.points}</span>
                         <span className="text-xl font-black text-emerald-500 dark:text-emerald-400 font-mono tracking-tight group-hover:scale-105 transition-transform">0.00</span>
                       </div>
                       <div className="p-4 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                         <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{t.profile.currency}</span>
                         <span className="text-xl font-black text-emerald-500 dark:text-emerald-400 font-mono tracking-tight group-hover:scale-105 transition-transform">$0.00</span>
                       </div>
                    </div>

                    <div className="p-3 max-h-[450px] overflow-y-auto no-scrollbar space-y-1">
                      <div className="px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-2 mb-2">{t.profile.menuTitle}</div>
                      
                      <MenuItem icon={<LayoutGrid className="w-4 h-4" />} label={t.profile.overview} />
                      <MenuItem icon={<Settings className="w-4 h-4" />} label={t.profile.settings} />
                      <MenuItem icon={<LayoutDashboard className="w-4 h-4" />} label={t.profile.dashboard} />
                      <MenuItem icon={<ClipboardList className="w-4 h-4" />} label={t.profile.myOrders} />
                      <MenuItem icon={<Calendar className="w-4 h-4" />} label={t.profile.myEvents} />
                      <MenuItem icon={<PieChart className="w-4 h-4" />} label={t.profile.myPositions} />
                      <MenuItem icon={<Star className="w-4 h-4" />} label={t.profile.myWatchlist} />
                      
                      <MenuItem 
                        icon={<Compass className="w-4 h-4" />} 
                        label={t.profile.featureTour} 
                        onClick={() => {
                          setIsProfileOpen(false);
                          if (onStartTour) onStartTour();
                        }}
                      />

                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3 mx-2"></div>

                      <div className="px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">{t.profile.themeTitle}</div>
                      <div 
                        onClick={toggleTheme}
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer group transition-colors"
                      >
                         <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">
                           {isDark ? (
                              <Moon className="w-4 h-4 text-indigo-400 transition-colors" />
                           ) : (
                              <Sun className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                           )}
                           {t.profile.toggleTheme}
                         </div>
                         <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${isDark ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-slate-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isDark ? 'left-6' : 'left-1'}`}></div>
                         </div>
                      </div>

                       <div className="px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-4 mb-2">{t.profile.langTitle}</div>
                       <div className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer group transition-colors">
                         <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">
                           <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                           {t.profile.switchLang}
                         </div>
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleLanguage();
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all"
                         >
                           {t.profile.currentLang}
                           <Globe className="w-3 h-3" />
                         </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          
          <button className="lg:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="lg:hidden px-4 pb-3 space-y-3 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
         <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 mt-3 w-full">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-3" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-100 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isLoggedIn && (
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900">
                      <Wallet className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.mobile.balance}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-100 font-mono">$ 2,450.00</span>
                  </div>
               </div>
               <button onClick={onDepositClick} className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-blue-200 dark:shadow-none">
                  {t.mobile.deposit}
               </button>
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;
