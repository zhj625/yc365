
import { Category, FilterTag, Market, Language } from "./types";
import { 
  Trophy, 
  Globe, 
  Cpu, 
  Vote, 
  TrendingUp, 
  Clapperboard, 
  Gamepad2,
  Zap
} from "lucide-react";

export const TRANSLATIONS = {
  en: {
    header: {
      searchPlaceholder: "Search markets...",
      faucet: "Faucet",
      totalBalance: "Total Balance",
      deposit: "Deposit",
      profile: {
        disconnect: "Disconnect",
        points: "Points",
        currency: "Currency",
        menuTitle: "Personal",
        overview: "Overview",
        settings: "Settings",
        dashboard: "Dashboard",
        myOrders: "My Orders",
        myEvents: "My Events",
        myPositions: "My Positions",
        myWatchlist: "My Watchlist",
        tour: "Guided Tour",
        themeTitle: "Theme",
        toggleTheme: "Toggle Theme",
        langTitle: "Language",
        switchLang: "Switch Language",
        currentLang: "English"
      },
      mobile: {
        balance: "Total Balance",
        deposit: "Deposit"
      }
    },
    filter: {
      more: "More",
      sortBy: "Sort by",
      select: "Select",
      sortOptions: {
        created: "Created Time",
        expiry: "Expiry Date",
        totalVol: "Total Volume",
        vol24h: "24h Volume",
        liquidity: "Liquidity"
      }
    },
    market: {
      vol: "Vol.",
      ends: "Ends",
      buyYes: "Buy Yes",
      buyNo: "Buy No",
      chance: "chance",
      aiAnalysis: "Gemini Analysis",
      askAi: "Ask AI",
      participants: "Traders",
      comments: "Comments"
    },
    fab: {
      new: "New",
      create: "Create Event"
    },
    common: {
      noMarkets: "No markets found in this category."
    },
    footer: {
      copyright: "YC365 © 2025",
      about: "About Us",
      docs: "Docs",
      terms: "Terms"
    },
    detail: {
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
      rulesDesc: "Market rules will be displayed here.",
      comments: "Comments",
      orderBook: "Order Book",
      bids: "Bids",
      asks: "Asks",
      size: "Size",
      total: "Total",
      limit: "Limit",
      market: "Market",
      quantity: "Quantity",
      totalCost: "Total Cost",
      estCost: "Est. Cost",
      max: "Max",
      balance: "Balance"
    },
    faucet: {
        title: "Testnet Faucet",
        desc: "Claim free testnet USDT to explore prediction markets on YC365. Assets have no real value and reset periodically.",
        connected: "Wallet Connected",
        address: "Address",
        gasBalance: "Gas Balance",
        minting: "Minting Tokens...",
        claimed: "Claimed Successfully",
        claim: "Claim 50 Test USDT",
        cooldown: "Next claim available in",
        reqTitle: "Requirements",
        reqDesc: "You need a small amount of tBNB to pay for gas fees.",
        getBnb: "Get tBNB",
        limitTitle: "Limits",
        limitDesc: "You can claim 50 USDT once every 24 hours per wallet address.",
        note: "Note: Test tokens have no real value and are only for testing purposes on the testnet.",
        back: "Back to Markets"
    },
    deposit: {
        deposit: "Deposit",
        withdraw: "Withdraw",
        network: "Network & Currency",
        amount: "Deposit Amount",
        withdrawAmount: "Withdraw Amount",
        balance: "Balance",
        placeholder: "Please Enter Amount",
        max: "Max",
        paymentAddr: "Payment Address",
        contractAddr: "Contract Address",
        qr: "QR Code",
        submit: "Submit Transaction",
        success: "submitted successfully!",
        error: "Please enter an amount",
        copied: "Address copied to clipboard!"
    }
  },
  zh: {
    header: {
      searchPlaceholder: "搜索预测市场...",
      faucet: "水龙头",
      totalBalance: "总余额",
      deposit: "充值",
      profile: {
        disconnect: "断开连接",
        points: "积分",
        currency: "货币",
        menuTitle: "个人中心",
        overview: "概览",
        settings: "设置",
        dashboard: "仪表盘",
        myOrders: "我的订单",
        myEvents: "我的事件",
        myPositions: "我的持仓",
        myWatchlist: "我的收藏",
        tour: "功能引导",
        themeTitle: "主题",
        toggleTheme: "切换主题",
        langTitle: "语言",
        switchLang: "切换语言",
        currentLang: "简体中文"
      },
      mobile: {
        balance: "总余额",
        deposit: "充值"
      }
    },
    filter: {
      more: "更多",
      sortBy: "排序方式",
      select: "请选择",
      sortOptions: {
        created: "创建时间",
        expiry: "到期时间",
        totalVol: "总交易量",
        vol24h: "24小时交易量",
        liquidity: "流动性"
      }
    },
    market: {
      vol: "量",
      ends: "截止",
      buyYes: "买入 是",
      buyNo: "买入 否",
      chance: "概率",
      aiAnalysis: "Gemini 智能分析",
      askAi: "AI 分析",
      participants: "人参与",
      comments: "评论"
    },
    fab: {
      new: "新",
      create: "创建事件"
    },
    common: {
      noMarkets: "该分类下暂无市场。"
    },
    footer: {
      copyright: "YC365 © 2025",
      about: "关于我们",
      docs: "文档",
      terms: "服务条款"
    },
    detail: {
      back: "返回",
      outcome: "预测结果",
      price: "价格",
      buy: "买入",
      sell: "卖出",
      amount: "数量",
      shares: "份额",
      potentialReturn: "潜在回报",
      placeOrder: "下单",
      rules: "规则",
      rulesDesc: "此处将显示市场规则。",
      comments: "评论",
      orderBook: "订单簿",
      bids: "买单",
      asks: "卖单",
      size: "数量",
      total: "总计",
      limit: "限价",
      market: "市价",
      quantity: "数量",
      totalCost: "总成本",
      estCost: "预估成本",
      max: "最大",
      balance: "余额"
    },
    faucet: {
        title: "测试网水龙头",
        desc: "领取免费的测试网 USDT 以探索 YC365 预测市场。资产无真实价值，并会定期重置。",
        connected: "已连接钱包",
        address: "钱包地址",
        gasBalance: "Gas 余额",
        minting: "正在铸造代币...",
        claimed: "领取成功",
        claim: "领取 50 测试 USDT",
        cooldown: "下次领取时间",
        reqTitle: "要求",
        reqDesc: "您需要少量的 tBNB 来支付 Gas 费用。",
        getBnb: "获取 tBNB",
        limitTitle: "限制",
        limitDesc: "每个钱包地址每 24 小时可领取一次 50 USDT。",
        note: "注意：测试代币没有实际价值，仅用于测试网测试。",
        back: "返回市场列表"
    },
    deposit: {
        deposit: "充值",
        withdraw: "提现",
        network: "网络 & 币种",
        amount: "充值金额",
        withdrawAmount: "提现金额",
        balance: "余额",
        placeholder: "输入金额",
        max: "最大",
        paymentAddr: "充值地址",
        qr: "二维码",
        contractAddr: "合约地址",
        submit: "提交交易",
        success: "提交成功！",
        error: "请输入有效金额",
        copied: "地址已复制到剪贴板！"
    }
  }
};

export const CATEGORIES_DATA: Record<Language, Category[]> = {
  en: [
    { id: 'all', label: 'All', icon: null },
    { id: 'politics', label: 'Politics', icon: null },
    { id: 'crypto', label: 'Crypto', icon: null },
    { id: 'sports', label: 'Sports', icon: null },
    { id: 'tech', label: 'Tech', icon: null },
    { id: 'culture', label: 'Culture', icon: null },
    { id: 'world', label: 'World', icon: null },
    { id: 'economy', label: 'Economy', icon: null },
  ],
  zh: [
    { id: 'all', label: '全部', icon: null },
    { id: 'politics', label: '政治', icon: null },
    { id: 'crypto', label: '加密货币', icon: null },
    { id: 'sports', label: '体育', icon: null },
    { id: 'tech', label: '科技', icon: null },
    { id: 'culture', label: '文化', icon: null },
    { id: 'world', label: '世界', icon: null },
    { id: 'economy', label: '经济', icon: null },
  ]
};

export const MORE_CATEGORIES_DATA: Record<Language, Category[]> = {
  en: [
    { id: 'hot', label: 'Hot Events', icon: null },
    { id: 'activity', label: 'Activity', icon: null },
    { id: 'leaderboard', label: 'Leaderboard', icon: null },
  ],
  zh: [
    { id: 'hot', label: '热门事件', icon: null },
    { id: 'activity', label: '活动', icon: null },
    { id: 'leaderboard', label: '排行榜', icon: null },
  ]
};

export const FILTERS_DATA: Record<Language, FilterTag[]> = {
  en: [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI' },
    { id: 'election', label: 'Election' },
    { id: 'sports', label: 'Sports' },
    { id: 'movies', label: 'Movies' },
    { id: 'trade', label: 'Trade War' },
    { id: 'trump', label: 'Trump' },
    { id: 'ukraine', label: 'Ukraine' },
    { id: 'musk', label: 'Elon Musk' },
    { id: 'tiktok', label: 'TikTok' },
  ],
  zh: [
    { id: 'all', label: '全部' },
    { id: 'ai', label: 'AI' },
    { id: 'election', label: '选举' },
    { id: 'sports', label: '体育' },
    { id: 'movies', label: '电影' },
    { id: 'trade', label: '贸易战' },
    { id: 'trump', label: '特朗普' },
    { id: 'ukraine', label: '乌克兰' },
    { id: 'musk', label: '埃隆·马斯克' },
    { id: 'tiktok', label: '抖音' },
  ]
};

const mockTraders = [
    "https://picsum.photos/id/100/30/30",
    "https://picsum.photos/id/101/30/30",
    "https://picsum.photos/id/102/30/30"
];

export const MARKETS_DATA: Record<Language, Market[]> = {
  en: [
    {
      id: '1',
      title: 'Will T1 AD Gumayusi renew his contract with the team before the end of 2025?',
      iconUrl: 'https://picsum.photos/id/1/200/200', 
      percentage: 32,
      volume: '$ 14K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 42,
      change24h: -2.5,
      isHot: true,
      tags: ['sports', 'esports']
    },
    {
      id: '2',
      title: 'Will Senator Fetterman resign from the Senate due to health reasons before 2027?',
      iconUrl: 'https://picsum.photos/id/2/200/200',
      percentage: 70,
      volume: '$ 4K',
      category: 'politics',
      endDate: 'Jan 1, 2027',
      traders: mockTraders,
      commentCount: 12,
      change24h: 5.1,
      tags: ['politics', 'election']
    },
    {
      id: '3',
      title: 'Will T1 player Gumayusi still be on the starting roster by the end of 2025?',
      iconUrl: 'https://picsum.photos/id/3/200/200',
      percentage: 80,
      volume: '$ 2K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 8,
      change24h: 1.2,
      tags: ['sports', 'esports']
    },
    {
      id: '4',
      title: 'Will legendary player Faker officially announce his retirement by the end of 2025?',
      iconUrl: 'https://picsum.photos/id/4/200/200',
      percentage: 50,
      volume: '$ 2K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 156,
      change24h: 12.5,
      isHot: true,
      tags: ['sports', 'esports']
    },
    {
      id: '5',
      title: 'Will the LA Lakers achieve a winning streak of at least 5 games before Nov 1, 2025?',
      iconUrl: 'https://picsum.photos/id/5/200/200',
      percentage: 40,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Nov 1, 2025',
      traders: mockTraders,
      commentCount: 23,
      change24h: -0.8,
      tags: ['sports', 'basketball']
    },
    {
      id: '6',
      title: 'Will FURIA win the International Championship on Nov 15, 2025?',
      iconUrl: 'https://picsum.photos/id/6/200/200',
      percentage: 50,
      volume: '$ 3K',
      category: 'sports',
      endDate: 'Nov 15, 2025',
      traders: mockTraders,
      commentCount: 5,
      change24h: 0,
      tags: ['sports', 'esports']
    },
    {
      id: '7',
      title: 'Can Team Vitality maintain CSGO World Rank #1 until Nov 1, 2025?',
      iconUrl: 'https://picsum.photos/id/7/200/200',
      percentage: 50,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Nov 1, 2025',
      traders: mockTraders,
      commentCount: 18,
      change24h: 3.2,
      tags: ['sports', 'esports']
    },
    {
      id: '8',
      title: 'Will LeBron James recover from injury and return to the lineup by the end of this month?',
      iconUrl: 'https://picsum.photos/id/8/200/200',
      percentage: 48,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Oct 31, 2025',
      traders: mockTraders,
      commentCount: 67,
      change24h: -5.4,
      tags: ['sports', 'basketball']
    },
    {
      id: '9',
      title: 'Will Bitcoin (BTC) price break $100,000 before the end of 2025?',
      iconUrl: 'https://picsum.photos/id/9/200/200',
      percentage: 37,
      volume: '$ 1M',
      category: 'crypto',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 892,
      change24h: 15.2,
      isHot: true,
      tags: ['crypto', 'bitcoin']
    },
     {
      id: '10',
      title: 'Will former EDG player Viper join BLG before the end of 2025?',
      iconUrl: 'https://picsum.photos/id/10/200/200',
      percentage: 60,
      volume: '$ 20K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 34,
      change24h: 2.1,
      tags: ['sports', 'esports']
    },
  ],
  zh: [
    {
      id: '1',
      title: 'T1 AD Gumayusi 会在 2025 年底之前与队伍成功续约吗？',
      iconUrl: 'https://picsum.photos/id/1/200/200', 
      percentage: 32,
      volume: '$ 14K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 42,
      change24h: -2.5,
      isHot: true,
      tags: ['sports', 'esports']
    },
    {
      id: '2',
      title: '参议员费特曼会在 2027 年之前因为健康原因辞职离开参议院吗？',
      iconUrl: 'https://picsum.photos/id/2/200/200',
      percentage: 70,
      volume: '$ 4K',
      category: 'politics',
      endDate: 'Jan 1, 2027',
      traders: mockTraders,
      commentCount: 12,
      change24h: 5.1,
      tags: ['politics', 'election']
    },
    {
      id: '3',
      title: '到 2025 年底，T1 选手 Gumayusi 还会继续留在首发名单中吗？',
      iconUrl: 'https://picsum.photos/id/3/200/200',
      percentage: 80,
      volume: '$ 2K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 8,
      change24h: 1.2,
      tags: ['sports', 'esports']
    },
    {
      id: '4',
      title: '到 2025 年底，传奇选手 Faker 会正式宣布退役吗？',
      iconUrl: 'https://picsum.photos/id/4/200/200',
      percentage: 50,
      volume: '$ 2K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 156,
      change24h: 12.5,
      isHot: true,
      tags: ['sports', 'esports']
    },
    {
      id: '5',
      title: '洛杉矶湖人队会在 2025 年 11 月 1 日之前赢得至少 5 场连胜吗？',
      iconUrl: 'https://picsum.photos/id/5/200/200',
      percentage: 40,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Nov 1, 2025',
      traders: mockTraders,
      commentCount: 23,
      change24h: -0.8,
      tags: ['sports', 'basketball']
    },
    {
      id: '6',
      title: 'FURIA 战队会在 2025 年 11 月 15 日的国际锦标赛中夺冠吗？',
      iconUrl: 'https://picsum.photos/id/6/200/200',
      percentage: 50,
      volume: '$ 3K',
      category: 'sports',
      endDate: 'Nov 15, 2025',
      traders: mockTraders,
      commentCount: 5,
      change24h: 0,
      tags: ['sports', 'esports']
    },
    {
      id: '7',
      title: 'Vitality 战队能否在 2025 年 11 月 1 日之前保持 CSGO 世界排名第一？',
      iconUrl: 'https://picsum.photos/id/7/200/200',
      percentage: 50,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Nov 1, 2025',
      traders: mockTraders,
      commentCount: 18,
      change24h: 3.2,
      tags: ['sports', 'esports']
    },
    {
      id: '8',
      title: '勒布朗·詹姆斯会在本月底之前从伤病中恢复并重返比赛阵容吗？',
      iconUrl: 'https://picsum.photos/id/8/200/200',
      percentage: 48,
      volume: '$ 5K',
      category: 'sports',
      endDate: 'Oct 31, 2025',
      traders: mockTraders,
      commentCount: 67,
      change24h: -5.4,
      tags: ['sports', 'basketball']
    },
    {
      id: '9',
      title: '比特币 (BTC) 的价格会在 2025 年底之前突破 100,000 美元大关吗？',
      iconUrl: 'https://picsum.photos/id/9/200/200',
      percentage: 37,
      volume: '$ 1M',
      category: 'crypto',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 892,
      change24h: 15.2,
      isHot: true,
      tags: ['crypto', 'bitcoin']
    },
     {
      id: '10',
      title: '前 EDG 选手 Viper (毒蛇) 会在 2025 年底之前加入 BLG 战队吗？',
      iconUrl: 'https://picsum.photos/id/10/200/200',
      percentage: 60,
      volume: '$ 20K',
      category: 'sports',
      endDate: 'Dec 31, 2025',
      traders: mockTraders,
      commentCount: 34,
      change24h: 2.1,
      tags: ['sports', 'esports']
    },
  ]
};
