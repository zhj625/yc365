import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Gift, Zap, Globe2, BrainCircuit } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
    lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDES = {
      en: [
        {
            id: 1,
            // Reverted to 3D/Tech Abstract (Blue/Dark)
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                Predict. Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Earn.</span>
              </>
            ),
            subtitle: "The decentralized prediction market. Build your own outcome tokens today.",
            cta: "Create Market",
            readMore: "Read Docs",
            bgGradient: "from-[#020617]/80 via-[#1e1b4b]/60 to-transparent",
            badge: { icon: <Zap className="w-3 h-3 text-cyan-300" />, text: "Web3 Powered" }
          },
          {
            id: 4,
            // Reverted to Tech/Cyberpunk Abstract (Purple)
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80", 
            title: (
              <>
                Invite Friends. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Get Yield.</span>
              </>
            ),
            subtitle: "Earn 5% lifetime commissions on every trade your referrals make. Smart contracts enabled.",
            cta: "Get Referral Link",
            readMore: "Read Docs",
            bgGradient: "from-[#2e1065]/80 via-[#4c1d95]/60 to-transparent", 
            badge: { icon: <Gift className="w-3 h-3 text-pink-300" />, text: "Partner Program" }
          },
          {
            id: 2,
            // Reverted to Digital Earth/Network (Green/Teal)
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                Global Events. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">On Chain.</span>
              </>
            ),
            subtitle: "Trade on breaking news, sports, and crypto prices with instant settlement.",
            cta: "Explore Markets",
            readMore: "Read Docs",
            bgGradient: "from-[#022c22]/80 via-[#0f766e]/60 to-transparent",
            badge: { icon: <Globe2 className="w-3 h-3 text-emerald-300" />, text: "Live Oracle Feed" }
          },
          {
            id: 3,
            // Reverted to AI/Neural Network (Indigo/Violet)
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                AI Analysis. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">DeFi Data.</span>
              </>
            ),
            subtitle: "Leverage Gemini AI to analyze market sentiment and volume trends.",
            cta: "View Analytics",
            readMore: "Read Docs",
            bgGradient: "from-[#172554]/80 via-[#1e3a8a]/60 to-transparent",
            badge: { icon: <BrainCircuit className="w-3 h-3 text-violet-300" />, text: "Gemini Integrated" }
          }
      ],
      zh: [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                预测. 创造. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">收益.</span>
              </>
            ),
            subtitle: "去中心化预测市场。立即构建您自己的结果代币。",
            cta: "创建市场",
            readMore: "阅读文档",
            bgGradient: "from-[#020617]/80 via-[#1e1b4b]/60 to-transparent",
            badge: { icon: <Zap className="w-3 h-3 text-cyan-300" />, text: "Web3 驱动" }
          },
          {
            id: 4,
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80", 
            title: (
              <>
                邀请好友. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">获得收益.</span>
              </>
            ),
            subtitle: "您的推荐人每进行一笔交易，您即可获得 5% 的终身佣金。智能合约支持。",
            cta: "获取推荐链接",
            readMore: "阅读文档",
            bgGradient: "from-[#2e1065]/80 via-[#4c1d95]/60 to-transparent",
            badge: { icon: <Gift className="w-3 h-3 text-pink-300" />, text: "合伙人计划" }
          },
          {
            id: 2,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                全球事件. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">链上同步.</span>
              </>
            ),
            subtitle: "对突发新闻、体育赛事和加密货币价格进行即时结算交易。",
            cta: "探索市场",
            readMore: "阅读文档",
            bgGradient: "from-[#022c22]/80 via-[#0f766e]/60 to-transparent",
            badge: { icon: <Globe2 className="w-3 h-3 text-emerald-300" />, text: "实时预言机" }
          },
          {
            id: 3,
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80",
            title: (
              <>
                AI 分析. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">DeFi 数据.</span>
              </>
            ),
            subtitle: "利用 Gemini AI 分析市场情绪和交易量趋势。",
            cta: "查看分析",
            readMore: "阅读文档",
            bgGradient: "from-[#172554]/80 via-[#1e3a8a]/60 to-transparent",
            badge: { icon: <BrainCircuit className="w-3 h-3 text-violet-300" />, text: "集成 Gemini" }
          }
      ]
  };

  const activeSlides = SLIDES[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 dark:shadow-black/50 my-6 group h-[200px] md:h-[260px] ring-1 ring-black/5 dark:ring-white/10 bg-slate-900">
      
      {/* Slides */}
      {activeSlides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with slight scale effect - Added bg-slate-900 fallback */}
          <div className={`absolute inset-0 w-full h-full bg-slate-900 transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}>
             <img 
                src={slide.image} 
                alt="" 
                className="w-full h-full object-cover"
              />
          </div>
          
          {/* Web3 Grid Texture Overlay */}
          <div 
            className="absolute inset-0 z-[1] opacity-20" 
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} z-[2]`}></div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-14 max-w-4xl">
            
            {/* Badge */}
            <div className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-100 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {slide.badge ? (
                 <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {slide.badge.icon}
                  {slide.badge.text}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5 w-fit shadow-sm">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  Web3 Prediction
                </span>
              )}
            </div>
            
            {/* Title */}
            <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-2xl tracking-tight transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {slide.title}
            </h1>
            
            {/* Subtitle */}
            <p className={`text-slate-200 text-xs md:text-base mb-6 max-w-lg font-medium leading-relaxed line-clamp-2 drop-shadow-md transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
               {slide.subtitle}
            </p>

            {/* Buttons */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-400 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <button className="px-6 py-2.5 rounded-full bg-white text-slate-900 text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group/btn">
                {slide.cta}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-slate-900" />
              </button>
              <button className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-semibold border border-white/10 transition-all hover:border-white/30 hover:text-white">
                {slide.readMore}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Subtle and Techy */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white/70 hover:text-white border border-white/5 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white/70 hover:text-white border border-white/5 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators - Sleek line style */}
      <div className="absolute bottom-4 left-6 md:left-14 z-30 flex gap-1.5">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;