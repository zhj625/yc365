
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import FilterBar from './components/FilterBar';
import MarketCard from './components/MarketCard';
import MarketView from './components/MarketView';
import MarketCardSkeleton from './components/MarketCardSkeleton';
import FaucetView from './components/FaucetView'; 
import DepositModal from './components/DepositModal'; 
import Toast, { ToastProps } from './components/Toast';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import { MARKETS_DATA, TRANSLATIONS } from './constants';
import { Plus } from 'lucide-react';
import { Language, Market } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<Language>('en');
  
  // Navigation State
  const [view, setView] = useState<'list' | 'detail' | 'faucet'>('list');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  // Modal State
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  
  // Toast State
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Onboarding State
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(-1);

  useEffect(() => {
    const seen = localStorage.getItem('yc365_tour_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
        setCurrentOnboardingStep(0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const markets = MARKETS_DATA[lang];
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory, activeFilter, currentSort, lang]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleMarketClick = (market: Market) => {
      setSelectedMarket(market);
      setView('detail');
      window.scrollTo(0, 0);
      
      // 修复同步 Bug：如果用户在引导第 11 步（index 10）点击了卡片，直接推进到第 12 步（详情页分析）
      if (showOnboarding && currentOnboardingStep === 10) {
        setCurrentOnboardingStep(11);
      }
  };

  const handleBack = () => {
      setView('list');
      setSelectedMarket(null);
      // 如果从详情页引导中回退，引导进度也应回退到点击卡片步骤
      if (showOnboarding && currentOnboardingStep >= 11) {
          setCurrentOnboardingStep(10);
      }
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    if (view !== 'list') setView('list');
  };

  const handleFilterChange = (id: string) => {
    setActiveFilter(id);
    if (view !== 'list') setView('list');
  };

  const handleNavigateToFaucet = () => {
    setView('faucet');
    window.scrollTo(0, 0);
  }

  const handleTourClick = () => {
    setCurrentOnboardingStep(0);
    setShowOnboarding(true);
  };

  // 同步引导步骤与视图状态：确保引导框始终能找到对应的 DOM 元素
  const handleOnboardingStepChange = useCallback((index: number) => {
    setCurrentOnboardingStep(index);
    
    // 列表页步骤：0-10 (第 1-11 步)
    // 详情页步骤：11-14 (第 12-15 步)
    if (index >= 11) {
      if (view !== 'detail') {
        setSelectedMarket(markets[0]);
        setView('detail');
      }
    } 
    else {
      // 如果进度回退到列表页说明，视图必须切换回列表
      if (view !== 'list') {
        setView('list');
        setSelectedMarket(null);
      }
    }
  }, [view, markets]);

  const getFilteredAndSortedMarkets = (): Market[] => {
    let result = [...markets];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(query));
    }

    if (activeCategory === 'hot') {
        result = result.filter(m => m.isHot);
    } else if (activeCategory !== 'all') {
      result = result.filter(m => m.category === activeCategory);
    }

    if (activeFilter !== 'all') {
       result = result.filter(m => m.tags && m.tags.includes(activeFilter));
    }

    result.sort((a, b) => {
      switch (currentSort) {
        case 'total_volume':
          const getVol = (s: string) => {
            if (s.includes('M')) return parseFloat(s.replace(/[^0-9.]/g, '')) * 1000000;
            if (s.includes('K')) return parseFloat(s.replace(/[^0-9.]/g, '')) * 1000;
            return parseFloat(s.replace(/[^0-9.]/g, ''));
          };
          return getVol(b.volume) - getVol(a.volume);
        case '24h_volume':
           return (b.change24h || 0) - (a.change24h || 0);
        case 'expires_at':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case 'created_at':
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    return result;
  };

  const filteredMarkets = getFilteredAndSortedMarkets();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 dark:text-slate-100 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300 relative">
      <Onboarding 
        show={showOnboarding} 
        currentStepProp={currentOnboardingStep}
        onClose={() => {
            setShowOnboarding(false);
            setCurrentOnboardingStep(-1);
        }} 
        onStepChange={handleOnboardingStepChange}
        lang={lang} 
      />
      
      <Header 
        lang={lang} 
        setLang={setLang} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFaucetClick={handleNavigateToFaucet}
        onLogoClick={handleBack}
        onDepositClick={() => setIsDepositOpen(true)}
        onTourClick={handleTourClick}
      />
      
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>

      <DepositModal 
        isOpen={isDepositOpen} 
        onClose={() => setIsDepositOpen(false)} 
        lang={lang}
        onAddToast={addToast}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
        
        {view === 'list' && (
          <>
            <Hero lang={lang} />
            <Ticker lang={lang} onMarketClick={handleMarketClick} />
          </>
        )}
        
        {view !== 'faucet' && (
           <div className={view === 'list' ? "mt-0" : "mt-0"}>
              <FilterBar 
                  activeCategory={activeCategory} 
                  setActiveCategory={handleCategoryChange}
                  activeFilter={activeFilter}
                  setActiveFilter={handleFilterChange}
                  lang={lang}
                  currentSort={currentSort}
                  setCurrentSort={setCurrentSort}
                  hideFilters={view === 'detail'}
              />
           </div>
        )}
        
        {view === 'list' && (
            isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <MarketCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div id="market-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 animate-in fade-in zoom-in-95 duration-500">
                    {filteredMarkets.length > 0 ? (
                    filteredMarkets.map((market, idx) => (
                        <div key={market.id} onClick={() => handleMarketClick(market)} className="cursor-pointer" id={idx === 0 ? "onboarding-market-card" : undefined}>
                            <MarketCard market={market} lang={lang} />
                        </div>
                    ))
                    ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                        <p className="text-lg font-medium">{t.common.noMarkets}</p>
                    </div>
                    )}
                </div>
            )
        )}

        {view === 'detail' && selectedMarket && (
            <div className="mt-4">
                <MarketView 
                    key={selectedMarket.id}
                    market={selectedMarket} 
                    lang={lang} 
                    onBack={handleBack} 
                    onAddToast={addToast}
                />
            </div>
        )}

        {view === 'faucet' && (
            <div className="mt-8">
               <FaucetView lang={lang} onAddToast={addToast} onBack={handleBack} />
            </div>
        )}

      </main>

      <Footer />

      {view === 'list' && (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in duration-500">
            <button 
            id="fab-create"
            onClick={() => addToast("Opening Event Creator...", "success")}
            className="group relative flex items-center gap-3 pl-3 pr-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 ring-1 ring-white/20"
            >
                <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest leading-none">{t.fab.new}</span>
                    <span className="text-sm font-black tracking-wide text-white leading-none">{t.fab.create}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/0 to-white/10 pointer-events-none" />
            </button>
        </div>
      )}
    </div>
  );
};

export default App;
