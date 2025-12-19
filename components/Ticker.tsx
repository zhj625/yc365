import React, { useState, useEffect } from 'react';
import { Market, Language } from '../types';
import { MARKETS_DATA } from '../constants';
import { Flame, TrendingUp, ArrowRight } from 'lucide-react';

interface TickerProps {
  lang: Language;
  onMarketClick: (market: Market) => void;
}

const Ticker: React.FC<TickerProps> = ({ lang, onMarketClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const allMarkets = MARKETS_DATA[lang];
  // Filter hot markets, fallback to top 5 if no hot markets defined
  const hotMarkets = allMarkets.filter(m => m.isHot).length > 0 
    ? allMarkets.filter(m => m.isHot) 
    : allMarkets.slice(0, 5);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotMarkets.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [hotMarkets.length, isHovered]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div 
        className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-14 ring-1 ring-slate-900/5 dark:ring-white/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Fixed Label - with higher z-index to stay on top */}
        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-3 px-5 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-full">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 ring-1 ring-orange-100 dark:ring-orange-900/40 shrink-0">
            <Flame className="w-4 h-4 animate-pulse" fill="currentColor" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 hidden sm:block whitespace-nowrap">
            Trending
          </span>
        </div>

        {/* Vertical Sliding Content Container */}
        <div className="flex-1 h-full relative overflow-hidden ml-[52px] sm:ml-[140px]"> {/* Adjusted margin-left to clear the fixed label */}
             {hotMarkets.map((market, index) => {
               let positionClass = 'translate-y-full opacity-0 pointer-events-none scale-95'; 
               
               if (index === currentIndex) {
                   positionClass = 'translate-y-0 opacity-100 pointer-events-auto scale-100'; 
               } else if (
                   index === (currentIndex - 1 + hotMarkets.length) % hotMarkets.length
               ) {
                   positionClass = '-translate-y-full opacity-0 pointer-events-none scale-95'; 
               }

               return (
                 <div
                   key={`${market.id}-${index}`}
                   className={`absolute inset-0 flex items-center w-full h-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) px-4 sm:px-6 ${positionClass}`}
                 >
                    <button 
                      onClick={() => onMarketClick(market)}
                      className="flex items-center justify-between w-full gap-4 group h-full"
                    >
                      {/* Title Section - Allowed to grow but truncated */}
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-left flex-1">
                          {market.title}
                      </span>
                      
                      {/* Stats Section - Kept rigid so it doesn't squish */}
                      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                          {/* Volume Badge - Hidden on very small screens */}
                          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Vol</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{market.volume}</span>
                          </div>

                          {/* Percentage Badge */}
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${market.percentage >= 50 ? 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400' : 'bg-orange-50 border-orange-100 text-orange-700 dark:bg-orange-900/20 dark:border-orange-900/50 dark:text-orange-400'}`}>
                              <span className="text-xs font-black">{market.percentage}%</span>
                          </div>
                          
                          {/* 24h Change - Hidden on mobile */}
                          {market.change24h && (
                              <span className={`hidden sm:flex items-center gap-0.5 text-xs font-bold ${market.change24h > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                  {market.change24h > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5 rotate-180" />}
                                  {Math.abs(market.change24h)}%
                              </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                 </div>
               );
             })}
        </div>
      </div>
    </div>
  );
};

export default Ticker;