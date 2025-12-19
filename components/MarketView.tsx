
import React, { useState, useEffect } from 'react';
import { Market, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Star, 
  TrendingUp, 
  MessageSquare,
  Info,
  Wallet,
  TrendingDown,
  BarChart2,
  ChevronDown,
  LineChart,
  User,
  Send,
  ChevronUp
} from 'lucide-react';

interface MarketViewProps {
  market: Market;
  lang: Language;
  onBack: () => void;
  onAddToast: (msg: string, type?: 'success' | 'error') => void;
}

// Mock Order Book Data Generator
const generateOrderBook = (basePrice: number) => {
  const bids = [];
  const asks = [];
  
  for (let i = 1; i <= 8; i++) {
    bids.push({
      price: (basePrice - i * 0.01).toFixed(2),
      size: Math.floor(Math.random() * 5000) + 100,
      total: 0
    });
    asks.push({
      price: (basePrice + i * 0.01).toFixed(2),
      size: Math.floor(Math.random() * 5000) + 100,
      total: 0
    });
  }
  return { bids, asks };
};

// Mock Comments Data
const MOCK_COMMENTS = [
    { id: 1, user: 'CryptoKing', avatar: 'https://picsum.photos/id/10/50/50', time: '2m ago', text: 'This is definitely happening. The trend is clear.' },
    { id: 2, user: 'BearWhale', avatar: 'https://picsum.photos/id/12/50/50', time: '15m ago', text: 'I doubt it. Too much resistance at this level.' },
    { id: 3, user: 'SatoshiFan', avatar: 'https://picsum.photos/id/15/50/50', time: '1h ago', text: 'Volume is picking up significantly on the Yes side.' },
];

const MarketView: React.FC<MarketViewProps> = ({ market, lang, onBack, onAddToast }) => {
  const t = TRANSLATIONS[lang];
  // Safe Fallback for HMR or missing keys
  const tDetail = t.detail || {
    back: "Back",
    outcome: "Outcome",
    price: "Price",
    buy: "Buy",
    sell: "Sell",
    amount: "Amount",
    shares: "Shares",
    potentialReturn: "Potential Return",
    placeOrder: "Place Order",
    rules: "Rules",
    rulesDesc: "Rules",
    comments: "Comments",
    orderBook: "Order Book",
    bids: "Bids",
    asks: "Asks",
    size: "Size",
    limit: "Limit",
    market: "Market",
    quantity: "Quantity",
    totalCost: "Total Cost",
    estCost: "Est. Cost",
    max: "Max",
    balance: "Balance"
  };
  
  // View State for Left Panel (Tabs)
  const [activeTab, setActiveTab] = useState<'orderbook' | 'chart'>('orderbook');
  const [isRulesExpanded, setIsRulesExpanded] = useState(true);

  // Trading State
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes');
  
  const [sharesInput, setSharesInput] = useState('');
  const [limitPriceInput, setLimitPriceInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  
  const priceYes = market.percentage / 100;
  const priceNo = (100 - market.percentage) / 100;
  const currentPrice = outcome === 'yes' ? priceYes : priceNo;

  // Initialize Limit Price input when outcome changes
  useEffect(() => {
      // Default limit price to current market price (in cents, e.g. 32.0)
      setLimitPriceInput((currentPrice * 100).toFixed(1));
  }, [outcome, currentPrice]);

  // Calculations
  const numericShares = parseFloat(sharesInput) || 0;
  const numericLimitPrice = parseFloat(limitPriceInput) || 0; // cents
  const limitPriceDollars = numericLimitPrice / 100;

  // Cost Logic
  const cost = orderType === 'limit'
      ? numericShares * limitPriceDollars
      : numericShares * currentPrice;

  const potentialReturn = numericShares; // Assuming $1 payout per share
  const returnPercentage = cost > 0 ? (((potentialReturn - cost) / cost) * 100).toFixed(0) : '0';

  const orderBookData = generateOrderBook(currentPrice);

  const handleMaxClick = () => {
      // Mock Max logic: Spend $100
      const maxSpend = 100;
      const priceToUse = orderType === 'limit' ? limitPriceDollars : currentPrice;
      if (priceToUse > 0) {
          setSharesInput((maxSpend / priceToUse).toFixed(0));
      }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header Area */}
            <div className="flex flex-col gap-3">
                 <button 
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 w-fit transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" />
                    {tDetail.back}
                </button>

                <div className="flex gap-4 items-start">
                    <img 
                        src={market.iconUrl} 
                        alt={market.title} 
                        className="w-16 h-16 rounded-xl object-cover shadow-sm border border-slate-200 dark:border-slate-700 mt-1"
                    />
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                            {market.title}
                        </h1>
                         <div className="flex items-center flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{market.endDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Vol: <span className="text-slate-900 dark:text-slate-200 font-bold">$12.5K</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          {/* COMBINED CHART & ORDER BOOK SECTION (TABBED) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
             
             {/* Tabs Header */}
             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('orderbook')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'orderbook' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        <BarChart2 className="w-3.5 h-3.5" />
                        {tDetail.orderBook}
                    </button>
                    <button 
                        onClick={() => setActiveTab('chart')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'chart' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        <LineChart className="w-3.5 h-3.5" />
                        Chart
                    </button>
                </div>

                {/* Outcome Indicator */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${outcome === 'yes' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                    <span className="uppercase">{outcome}</span>
                    <span>{(currentPrice * 100).toFixed(1)}¢</span>
                </div>
             </div>

             {/* Tab Content */}
             <div className="flex-1 relative">
                
                {/* ORDER BOOK VIEW */}
                {activeTab === 'orderbook' && (
                    <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
                            {/* BIDS Header */}
                            <div className="bg-slate-50 dark:bg-slate-800/30 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider grid grid-cols-3 text-right">
                                <div className="text-left">{tDetail.bids}</div>
                                <div>{tDetail.size}</div>
                                <div>{tDetail.price}</div>
                            </div>
                            {/* ASKS Header */}
                            <div className="bg-slate-50 dark:bg-slate-800/30 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider grid grid-cols-3 text-right">
                                <div className="text-emerald-500 dark:text-emerald-400">{tDetail.price}</div>
                                <div>{tDetail.size}</div>
                                <div>{tDetail.asks}</div>
                            </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[350px] no-scrollbar">
                            {/* BIDS List */}
                            <div className="flex flex-col">
                                {orderBookData.bids.map((bid, i) => (
                                    <div key={i} className="grid grid-cols-3 px-4 py-2 text-xs text-right hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer group border-b border-slate-50 dark:border-slate-800/50">
                                        <div className="text-left text-slate-400 group-hover:text-emerald-600 font-medium">Bid {i+1}</div>
                                        <div className="text-slate-600 dark:text-slate-300 font-mono">{bid.size}</div>
                                        <div className="font-bold text-emerald-500 font-mono">{bid.price}</div>
                                    </div>
                                ))}
                            </div>
                            {/* ASKS List */}
                            <div className="flex flex-col">
                                {orderBookData.asks.map((ask, i) => (
                                    <div key={i} className="grid grid-cols-3 px-4 py-2 text-xs text-right hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors cursor-pointer group border-b border-slate-50 dark:border-slate-800/50">
                                        <div className="font-bold text-red-500 font-mono">{ask.price}</div>
                                        <div className="text-slate-600 dark:text-slate-300 font-mono">{ask.size}</div>
                                        <div className="text-slate-400 group-hover:text-red-600 font-medium">Ask {i+1}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* CHART VIEW */}
                {activeTab === 'chart' && (
                    <div className="h-full flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200 min-h-[350px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-black text-emerald-500">{market.percentage}%</span>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Probability</span>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                {['1H', '1D', '1W', '1M', 'ALL'].map((period) => (
                                    <button key={period} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${period === '1D' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-1 w-full relative">
                            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path 
                                    d="M0,250 C100,240 200,280 300,200 C400,120 500,180 600,100 C700,50 800,80 800,80" 
                                    fill="url(#gradient)" 
                                    stroke="none" 
                                />
                                <path 
                                    d="M0,250 C100,240 200,280 300,200 C400,120 500,180 600,100 C700,50 800,80 800,80" 
                                    fill="none" 
                                    stroke="#10b981" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                />
                            </svg>
                            <div className="absolute right-0 top-[26%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg"></div>
                        </div>
                    </div>
                )}
             </div>
          </div>

          {/* RULES SECTION (Expandable) */}
          <div id="tour-market-rules" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
             <button 
                onClick={() => setIsRulesExpanded(!isRulesExpanded)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
             >
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   <Info className="w-4 h-4 text-blue-500" /> {tDetail.rules}
                </h3>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isRulesExpanded ? 'rotate-180' : ''}`} />
             </button>
             
             {isRulesExpanded && (
                 <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/50 animate-in slide-in-from-top-2 fade-in">
                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                       {market.rules || tDetail.rulesDesc}
                    </div>
                 </div>
             )}
          </div>

          {/* COMMENTS SECTION (Full Width) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
             <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   <MessageSquare className="w-4 h-4 text-purple-500" /> {tDetail.comments} ({market.commentCount})
                </h3>
             </div>
             
             {/* Comments Feed */}
             <div className="p-6 space-y-6">
                {MOCK_COMMENTS.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <img 
                            src={comment.avatar} 
                            alt={comment.user} 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{comment.user}</span>
                                <span className="text-xs text-slate-400">{comment.time}</span>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl rounded-tl-none group-hover:bg-slate-100 dark:group-hover:bg-slate-700/50 transition-colors">
                                {comment.text}
                            </div>
                        </div>
                    </div>
                ))}
             </div>

             {/* Comment Input Area */}
             <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                <div className="relative">
                    <input 
                        type="text" 
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a comment..." 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white shadow-sm"
                    />
                    <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        onClick={() => {
                            if (commentInput.trim()) {
                                onAddToast("Comment posted!", "success");
                                setCommentInput('');
                            }
                        }}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Trading Panel (Sticky) */}
        <div className="lg:col-span-4">
           <div className="sticky top-24 space-y-4">
              <div id="tour-trade-panel" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden">
                 
                 {/* Buy / Sell Tabs */}
                 <div className="flex border-b border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-4 text-sm font-bold transition-colors ${tradeType === 'buy' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                       {tDetail.buy}
                    </button>
                    <button 
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-4 text-sm font-bold transition-colors ${tradeType === 'sell' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                       {tDetail.sell}
                    </button>
                 </div>

                 <div className="p-6 space-y-5">
                    
                    {/* Header: Order Type & Balance */}
                    <div className="flex items-center justify-between">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button 
                                onClick={() => setOrderType('market')}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${orderType === 'market' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                            >
                                {tDetail.market}
                            </button>
                            <button 
                                onClick={() => setOrderType('limit')}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${orderType === 'limit' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                            >
                                {tDetail.limit}
                            </button>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            $2,450.00
                        </div>
                    </div>

                    {/* Outcome Toggle */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                       <button 
                         onClick={() => setOutcome('yes')}
                         className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${outcome === 'yes' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500'}`}
                       >
                          Yes {priceYes.toFixed(2)}
                       </button>
                       <button 
                         onClick={() => setOutcome('no')}
                         className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${outcome === 'no' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                       >
                          No {priceNo.toFixed(2)}
                       </button>
                    </div>

                    {/* Limit Price Input (Only for Limit Order) */}
                    {orderType === 'limit' && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                                <span>{tDetail.price}</span>
                            </div>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    value={limitPriceInput}
                                    onChange={(e) => setLimitPriceInput(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-lg font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none">
                                    cents
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quantity Input (Shares) */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span>{tDetail.quantity}</span>
                          <button 
                            onClick={handleMaxClick}
                            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors"
                          >
                            {tDetail.max}
                          </button>
                       </div>
                       <div className="relative">
                          <input 
                            type="number" 
                            value={sharesInput}
                            onChange={(e) => setSharesInput(e.target.value)}
                            placeholder="0"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-4 pr-16 text-2xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold text-slate-500 dark:text-slate-300 shadow-sm pointer-events-none">
                             Shares
                          </div>
                       </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3 border border-slate-100 dark:border-slate-800">
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{orderType === 'limit' ? tDetail.totalCost : tDetail.estCost}</span>
                          <span className="font-bold text-slate-900 dark:text-white">${cost.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{tDetail.potentialReturn}</span>
                          <span className="font-bold text-emerald-500 flex items-center gap-1">
                             <TrendingUp className="w-3 h-3" />
                             ${potentialReturn.toFixed(2)} ({returnPercentage}%)
                          </span>
                       </div>
                    </div>
                    
                    <button 
                       onClick={() => onAddToast("Order Placed Successfully!", "success")}
                       className={`w-full py-4 rounded-xl font-black text-lg text-white shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 ${
                          outcome === 'yes' 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20' 
                            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/20'
                       }`}
                    >
                       {tDetail.placeOrder} {outcome.toUpperCase()}
                    </button>
                    
                    <p className="text-center text-[10px] text-slate-400">
                       By trading, you agree to the Terms of Use.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MarketView;
