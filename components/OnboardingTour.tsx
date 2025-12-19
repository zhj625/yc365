
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface OnboardingTourProps {
  lang: Language;
  onClose: () => void;
  targetId?: string;
  title: string;
  content: string;
  stepLabel?: string;
  isCentered?: boolean;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  lang, 
  onClose, 
  targetId, 
  title, 
  content,
  stepLabel = "1/4",
  isCentered = false
}) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [preferPosition, setPreferPosition] = useState<'top' | 'bottom'>('bottom');
  const [isDark, setIsDark] = useState(false);
  const t = TRANSLATIONS[lang].tour;

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const updateRect = () => {
    if (isCentered) return;
    const el = targetId ? document.getElementById(targetId) : null;
    if (el) {
      const elementRect = el.getBoundingClientRect();
      setRect(elementRect);
      // 动态位置逻辑：如果上方空间不足 240px 则显示在下方
      setPreferPosition(elementRect.top < 240 ? 'bottom' : 'top');
    }
  };

  useLayoutEffect(() => {
    if (isCentered) return;
    const timer = setInterval(updateRect, 30);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    updateRect();
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [targetId, isCentered]);

  const tooltipWidth = 280; 
  const viewPortPadding = 12;
  
  let style: React.CSSProperties = {};
  let arrowX = 0;

  if (isCentered) {
    style = {
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: `${tooltipWidth}px`, zIndex: 100001
    };
  } else if (rect) {
    const targetCenterX = rect.left + rect.width / 2;
    const left = Math.max(viewPortPadding, Math.min(targetCenterX - tooltipWidth / 2, window.innerWidth - tooltipWidth - viewPortPadding));
    // 紧凑间距设置
    const verticalGap = 12;
    const top = preferPosition === 'bottom' ? rect.bottom + verticalGap : rect.top - verticalGap;
    arrowX = targetCenterX - left;

    style = {
      position: 'fixed', 
      top: top, 
      left: left, 
      width: `${tooltipWidth}px`,
      transform: preferPosition === 'top' ? 'translateY(-100%)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
      zIndex: 100001
    };
  } else if (!isCentered) {
    return null;
  }

  // 计算挖孔遮罩样式
  const getMaskStyle = () => {
    if (isCentered || !rect) return {};
    const padding = 6;
    const rx = 12;
    const rw = rect.width + padding * 2;
    const rh = rect.height + padding * 2;
    const rx_pos = rect.left - padding;
    const ry_pos = rect.top - padding;

    // 物理挖孔：确保聚光灯内没有任何滤镜或遮挡
    const svgMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cmask id='m'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Crect x='${rx_pos}' y='${ry_pos}' width='${rw}' height='${rh}' rx='${rx}' fill='black'/%3E%3C/mask%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='black' mask='url(%23m)'/%3E%3C/svg%3E")`;
    return {
      maskImage: svgMask,
      WebkitMaskImage: svgMask,
    };
  };

  // 动态主题类名
  const cardBg = isDark ? 'bg-slate-900' : 'bg-white';
  const cardBorder = isDark ? 'border-white/10' : 'border-slate-100';
  const titleColor = isDark ? 'text-white' : 'text-slate-900';
  const descColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const overlayBg = isDark ? 'bg-slate-950/50' : 'bg-slate-900/20';

  return createPortal(
    <div className="fixed inset-0 z-[100000] overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float-mini { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-float-mini { animation: float-mini 3s ease-in-out infinite; }
        @keyframes ring-pulse { 0% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.4); } 100% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); } }
        .animate-ring-pulse { animation: ring-pulse 2s infinite; }
      `}</style>

      {/* 动态背景遮罩 */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 pointer-events-auto ${overlayBg} backdrop-blur-[2px]`}
        style={getMaskStyle()}
        onClick={onClose}
      />

      {/* 聚光灯边缘装饰线 */}
      {!isCentered && rect && (
        <div 
          className="absolute transition-all duration-300 pointer-events-none"
          style={{
            left: rect.left - 6,
            top: rect.top - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            borderRadius: '14px',
            border: `2px solid ${isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(37, 99, 235, 0.6)'}`,
          }}
        >
           <div className="absolute inset-0 rounded-[12px] animate-ring-pulse"></div>
        </div>
      )}

      {/* 引导卡片主体 */}
      <div style={style} className="pointer-events-auto">
        <div className="animate-float-mini">
          <div className={`relative ${cardBg} ${cardBorder} border backdrop-blur-3xl rounded-[30px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] p-5 animate-in fade-in zoom-in-95 duration-500`}>
            
            {/* 精致箭头 - 颜色严格跟随卡片背景 */}
            {!isCentered && (
              <div 
                className="absolute w-5 h-2 pointer-events-none"
                style={{
                  left: `${Math.max(24, Math.min(arrowX, tooltipWidth - 24))}px`,
                  top: preferPosition === 'bottom' ? '-7px' : 'auto',
                  bottom: preferPosition === 'top' ? '-7px' : 'auto',
                  transform: `translateX(-50%) ${preferPosition === 'top' ? 'rotate(180deg)' : ''}`,
                }}
              >
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0L20 8H0L10 0Z" fill={isDark ? '#0f172a' : '#ffffff'} />
                  <path d="M0 8L10 0L20 8" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(241,245,249,1)'} strokeWidth="1" />
                </svg>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                     <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                     <h4 className={`font-black ${titleColor} text-[16px] tracking-tight leading-none mb-1.5`}>{title}</h4>
                     <div className="flex items-center gap-1.5">
                        <div className={`h-1 w-12 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                           <div 
                             className="h-full bg-blue-500 transition-all duration-1000" 
                             style={{ width: `${(parseInt(stepLabel) / 4) * 100 || 100}%` }}
                           ></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{stepLabel}</span>
                     </div>
                  </div>
               </div>
               <button onClick={onClose} className="p-1 -mr-1 text-slate-400 hover:text-slate-200 transition-colors">
                  <X className="w-4.5 h-4.5" />
               </button>
            </div>

            <p className={`text-[14px] ${descColor} leading-snug mb-6 font-medium text-left px-1`}>
              {content}
            </p>

            <div className="flex items-center justify-between">
               <button 
                 onClick={onClose} 
                 className={`text-[11px] font-black text-slate-500 hover:${isDark ? 'text-white' : 'text-slate-900'} transition-all uppercase tracking-[0.2em] ml-1`}
               >
                 {t.skip}
               </button>
               <button 
                 onClick={onClose} 
                 className={`flex items-center gap-1.5 px-6 py-2.5 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'} text-sm font-black rounded-2xl transition-all active:scale-95 shadow-xl group`}
               >
                 {t.finish}
                 <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OnboardingTour;
