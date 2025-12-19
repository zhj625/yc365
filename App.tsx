
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import FilterBar from './components/FilterBar';
import MarketCard from './components/MarketCard';
import MarketView from './components/MarketView';
import MarketCardSkeleton from './components/MarketCardSkeleton';
import FaucetView from './components/FaucetView'; 
import DepositModal from './components/DepositModal'; 
import LoginView from './components/LoginView';
import OnboardingTour from './components/OnboardingTour';
import Toast, { ToastProps } from './components/Toast';
import Footer from './components/Footer';
import { MARKETS_DATA, TRANSLATIONS } from './constants';
import { Plus } from 'lucide-react';
import { Language, Market } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<Language>('zh');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tourStep, setTourStep] = useState<number>(0);

  const [view, setView] = useState<'list' | 'detail' | 'faucet'>('list');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const markets = MARKETS_DATA[lang];
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, activeFilter, currentSort, lang]);

  useEffect(() => {
    const isDone = (s: number) => localStorage.getItem(`yc365_v5_step_${s}`) === 'true';
    if (tourStep !== 0) return;

    if (!isLoggedIn) {
      if (!isDone(1) && view === 'list') setTourStep(1);
    } else {
      if (view === 'list') {
        if (!isDone(2)) setTourStep(2);
        else if (!isDone(3)) setTourStep(3);
        else if (!isDone(4)) setTourStep(4);
      } else if (view === 'faucet' && !isDone(101)) {
        setTourStep(101);
      } else if (view === 'detail' && !isDone(201)) {
        setTourStep(201);
      }
    }
  }, [isLoggedIn, view, tourStep]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const proceedTour = (step: number) => {
    localStorage.setItem(`yc365_v5_step_${step}`, 'true');
    setTourStep(0); 
  };

  const handleStartTour = () => {
    [1, 2, 3, 4, 101, 201].forEach(s => localStorage.removeItem(`yc365_v5_step_${s}`));
    if (view !== 'list') {
      setView('list');
      setSelectedMarket(null);
    }
    setTimeout(() => {
      const firstStep = isLoggedIn ? 2 : 1;
      setTourStep(firstStep);
    }, 100);
    addToast(lang === 'zh' ? "功能指引已重启" : "Tour Guide Restarted", "success");
  };

  const handleLogin = () => {
    localStorage.setItem('yc365_v5_step_1', 'true');
    setTourStep(0);
    setTimeout(() => {
        setIsLoggedIn(true);
        addToast(lang === 'zh' ? "钱包已连接！" : "Wallet Connected!", "success");
    }, 500);
  };

  const handleNavigateToFaucet = () => {
    if (tourStep === 2) localStorage.setItem('yc365_v5_step_2', 'true');
    setTourStep(0);
    setView('faucet');
    window.scrollTo(0, 0);
  };

  const handleMarketClick = (market: Market) => {
    if (tourStep === 3) localStorage.setItem('yc365_v5_step_3', 'true');
    setTourStep(0);
    setSelectedMarket(market);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setTourStep(0);
    setView('list');
    setSelectedMarket(null);
  };

  const filteredMarkets = markets.filter(m => {
      if (searchQuery.trim()) return m.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeCategory === 'hot') return m.isHot;
      if (activeCategory !== 'all') return m.category === activeCategory;
      return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfe] dark:bg-slate-950 transition-colors duration-300 relative">
      <Header 
        lang={lang} setLang={setLang} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={() => setIsLoggedIn(false)}
        onFaucetClick={handleNavigateToFaucet} onLogoClick={handleBack}
        onDepositClick={() => setIsDepositOpen(true)}
        onStartTour={handleStartTour}
      />
      
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => <Toast key={toast.id} {...toast} />)}
      </div>

      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} lang={lang} onAddToast={addToast} />

      {/* 线性引导气泡渲染 */}
      {tourStep === 1 && view === 'list' && (
        <OnboardingTour lang={lang} onClose={() => proceedTour(1)} targetId="tour-login-btn" title={t.tour.step1.title} content={t.tour.step1.content} stepLabel="1/4" />
      )}
      {tourStep === 2 && view === 'list' && (
        <OnboardingTour lang={lang} onClose={() => proceedTour(2)} targetId="tour-faucet-btn" title={t.tour.step2.title} content={t.tour.step2.content} stepLabel="2/4" />
      )}
      {tourStep === 3 && view === 'list' && (
        <OnboardingTour lang={lang} onClose={() => proceedTour(3)} targetId="tour-market-card-0" title={t.tour.step4.title} content={t.tour.step4.content} stepLabel="3/4" />
      )}
      {tourStep === 4 && view === 'list' && (
        <OnboardingTour lang={lang} onClose={() => proceedTour(4)} targetId="tour-create-btn" title={t.tour.step7.title} content={t.tour.step7.content} stepLabel="4/4" />
      )}

      {view === 'faucet' && tourStep === 101 && (
        <OnboardingTour lang={lang} onClose={() => proceedTour(101)} targetId="tour-claim-btn" title={t.tour.step3.title} content={t.tour.step3.content} stepLabel="水龙头" />
      )}
      {view === 'detail' && (
        <>
          {tourStep === 201 && <OnboardingTour lang={lang} onClose={() => setTourStep(202)} targetId="tour-trade-panel" title={t.tour.step5.title} content={t.tour.step5.content} stepLabel="交易" />}
          {tourStep === 202 && <OnboardingTour lang={lang} onClose={() => proceedTour(201)} targetId="tour-market-rules" title={t.tour.step6.title} content={t.tour.step6.content} stepLabel="规则" />}
        </>
      )}
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 w-full text-center">
        {view === 'list' && isLoggedIn && (
          <div className="space-y-10">
            <Hero lang={lang} />
            <Ticker lang={lang} onMarketClick={handleMarketClick} />
          </div>
        )}
        
        <div className={view === 'list' && isLoggedIn ? "mt-12" : "mt-4"}>
          {view !== 'faucet' && (
             <FilterBar 
                activeCategory={activeCategory} 
                setActiveCategory={(id) => { setActiveCategory(id); if (view !== 'list') handleBack(); }}
                activeFilter={activeFilter}
                setActiveFilter={(id) => { setActiveFilter(id); if (view !== 'list') handleBack(); }}
                lang={lang} currentSort={currentSort} setCurrentSort={setCurrentSort}
                hideFilters={view === 'detail'}
             />
          )}
        </div>
        
        {!isLoggedIn && view === 'list' ? (
            <LoginView lang={lang} onLogin={handleLogin} />
        ) : (
            <div className="mt-8">
                {view === 'list' && isLoggedIn && (
                    isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <MarketCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
                            {filteredMarkets.length > 0 ? (
                            filteredMarkets.map((market, index) => (
                                <div key={market.id} id={index === 0 ? "tour-market-card-0" : undefined} onClick={() => handleMarketClick(market)} className="cursor-pointer">
                                    <MarketCard market={market} lang={lang} />
                                </div>
                            ))
                            ) : (
                            <div className="col-span-full py-20 text-center text-slate-400">
                                <p className="text-lg font-medium">{t.common.noMarkets}</p>
                            </div>
                            )}
                        </div>
                    )
                )}

                {view === 'detail' && selectedMarket && (
                    <div className="mt-4">
                        <MarketView 
                            key={selectedMarket.id} market={selectedMarket} 
                            lang={lang} onBack={handleBack} onAddToast={addToast}
                        />
                    </div>
                )}

                {view === 'faucet' && (
                    <div className="mt-8">
                       <FaucetView 
                         lang={lang} onAddToast={addToast} onBack={handleBack} 
                       />
                    </div>
                )}
            </div>
        )}
      </main>

      <Footer />

      {view === 'list' && isLoggedIn && (
        <div className="fixed bottom-8 right-8 z-50">
            <button 
                id="tour-create-btn"
                onClick={() => addToast("Event creator opened", "success")}
                className="group flex items-center gap-3 pl-3 pr-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 border border-white/10 dark:border-slate-800"
            >
                <div className="flex items-center justify-center w-8 h-8 bg-white/20 dark:bg-slate-900/20 rounded-full">
                    <Plus className="w-5 h-5 text-white dark:text-slate-900" strokeWidth={3} />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none text-left">{t.fab.new}</span>
                    <span className="text-sm font-black leading-none text-left">{t.fab.create}</span>
                </div>
            </button>
        </div>
      )}
    </div>
  );
};

export default App;
