import { create } from 'zustand';

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'etf' | 'bond';
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  change24h: number;
  marketCap: number;
  sector: string;
  logo: string;
};

export type Transaction = {
  id: string;
  assetSymbol: string;
  assetName: string;
  type: 'buy' | 'sell' | 'dividend';
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export type Alert = {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'change_percent';
  value: number;
  active: boolean;
  triggered: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
  relatedSymbols: string[];
};

export type ActiveTab = 'dashboard' | 'portfolio' | 'market' | 'transactions' | 'alerts' | 'settings';

interface AppState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  assets: Asset[];
  transactions: Transaction[];
  alerts: Alert[];
  news: NewsItem[];
  watchlist: string[];
  toggleWatchlist: (symbol: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'triggered'>) => void;
  removeAlert: (id: string) => void;
  updatePrices: () => void;
  totalPortfolioValue: () => number;
  totalPnL: () => number;
  totalPnLPercent: () => number;
}

const initialAssets: Asset[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', quantity: 45, avgBuyPrice: 142.50, currentPrice: 189.84, change24h: 1.23, marketCap: 2950000000000, sector: 'Technology', logo: '🍎' },
  { id: '2', symbol: 'NVDA', name: 'NVIDIA Corp.', type: 'stock', quantity: 28, avgBuyPrice: 380.00, currentPrice: 875.40, change24h: 3.45, marketCap: 2160000000000, sector: 'Technology', logo: '🟢' },
  { id: '3', symbol: 'BTC', name: 'Bitcoin', type: 'crypto', quantity: 0.85, avgBuyPrice: 38000, currentPrice: 67420.50, change24h: -1.82, marketCap: 1328000000000, sector: 'Crypto', logo: '₿' },
  { id: '4', symbol: 'ETH', name: 'Ethereum', type: 'crypto', quantity: 4.2, avgBuyPrice: 2100, currentPrice: 3541.20, change24h: 2.17, marketCap: 425000000000, sector: 'Crypto', logo: '⬡' },
  { id: '5', symbol: 'MSFT', name: 'Microsoft Corp.', type: 'stock', quantity: 32, avgBuyPrice: 295.00, currentPrice: 415.26, change24h: 0.87, marketCap: 3090000000000, sector: 'Technology', logo: '🪟' },
  { id: '6', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', quantity: 60, avgBuyPrice: 220.00, currentPrice: 177.90, change24h: -2.34, marketCap: 567000000000, sector: 'Automotive', logo: '⚡' },
  { id: '7', symbol: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'etf', quantity: 15, avgBuyPrice: 390.00, currentPrice: 492.30, change24h: 0.44, marketCap: 0, sector: 'Diversified', logo: '📊' },
  { id: '8', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', quantity: 22, avgBuyPrice: 140.00, currentPrice: 186.55, change24h: 1.56, marketCap: 1960000000000, sector: 'E-Commerce', logo: '📦' },
  { id: '9', symbol: 'SOL', name: 'Solana', type: 'crypto', quantity: 12, avgBuyPrice: 95.00, currentPrice: 172.30, change24h: 4.21, marketCap: 80000000000, sector: 'Crypto', logo: '◎' },
  { id: '10', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', quantity: 18, avgBuyPrice: 125.00, currentPrice: 168.42, change24h: 0.65, marketCap: 2080000000000, sector: 'Technology', logo: '🔍' },
];

const initialTransactions: Transaction[] = [
  { id: 't1', assetSymbol: 'NVDA', assetName: 'NVIDIA Corp.', type: 'buy', quantity: 10, price: 875.40, total: 8754.00, date: '2024-12-01T10:23:00', status: 'completed' },
  { id: 't2', assetSymbol: 'BTC', assetName: 'Bitcoin', type: 'buy', quantity: 0.15, price: 67420.50, total: 10113.08, date: '2024-11-28T14:45:00', status: 'completed' },
  { id: 't3', assetSymbol: 'TSLA', assetName: 'Tesla Inc.', type: 'sell', quantity: 20, price: 180.00, total: 3600.00, date: '2024-11-25T09:12:00', status: 'completed' },
  { id: 't4', assetSymbol: 'VOO', assetName: 'Vanguard S&P 500 ETF', type: 'dividend', quantity: 15, price: 1.42, total: 21.30, date: '2024-11-20T00:00:00', status: 'completed' },
  { id: 't5', assetSymbol: 'AAPL', assetName: 'Apple Inc.', type: 'buy', quantity: 5, price: 188.50, total: 942.50, date: '2024-11-18T11:30:00', status: 'completed' },
  { id: 't6', assetSymbol: 'SOL', assetName: 'Solana', type: 'buy', quantity: 5, price: 168.00, total: 840.00, date: '2024-11-15T16:20:00', status: 'pending' },
  { id: 't7', assetSymbol: 'ETH', assetName: 'Ethereum', type: 'sell', quantity: 1.0, price: 3500.00, total: 3500.00, date: '2024-11-10T13:05:00', status: 'completed' },
  { id: 't8', assetSymbol: 'MSFT', assetName: 'Microsoft Corp.', type: 'buy', quantity: 8, price: 410.00, total: 3280.00, date: '2024-11-05T10:00:00', status: 'completed' },
];

const initialAlerts: Alert[] = [
  { id: 'a1', symbol: 'BTC', type: 'price_above', value: 70000, active: true, triggered: false },
  { id: 'a2', symbol: 'AAPL', type: 'price_below', value: 175.00, active: true, triggered: false },
  { id: 'a3', symbol: 'NVDA', type: 'change_percent', value: 5, active: true, triggered: false },
  { id: 'a4', symbol: 'TSLA', type: 'price_below', value: 170.00, active: true, triggered: false },
];

const initialNews: NewsItem[] = [
  { id: 'n1', title: 'NVIDIA Posts Record Revenue as AI Chip Demand Surges 85% YoY', source: 'Reuters', sentiment: 'positive', time: '2 min ago', relatedSymbols: ['NVDA'] },
  { id: 'n2', title: 'Federal Reserve Signals Potential Rate Cut in Q1 2025', source: 'Bloomberg', sentiment: 'positive', time: '18 min ago', relatedSymbols: ['VOO', 'MSFT', 'AAPL'] },
  { id: 'n3', title: 'Bitcoin Consolidates Near $67K Amid ETF Inflow Uncertainty', source: 'CoinDesk', sentiment: 'neutral', time: '34 min ago', relatedSymbols: ['BTC', 'ETH'] },
  { id: 'n4', title: 'Tesla Faces Increased Competition in European EV Market', source: 'FT', sentiment: 'negative', time: '1 hr ago', relatedSymbols: ['TSLA'] },
  { id: 'n5', title: 'Apple Vision Pro Sales Exceed Analyst Expectations in Q4', source: 'WSJ', sentiment: 'positive', time: '2 hr ago', relatedSymbols: ['AAPL'] },
  { id: 'n6', title: 'Solana DeFi Volume Reaches All-Time High of $12B Daily', source: 'The Block', sentiment: 'positive', time: '3 hr ago', relatedSymbols: ['SOL', 'ETH'] },
];

export const useStore = create<AppState>((set, get) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  assets: initialAssets,
  transactions: initialTransactions,
  alerts: initialAlerts,
  news: initialNews,
  watchlist: ['BTC', 'TSLA', 'SOL'],

  toggleWatchlist: (symbol) => set((state) => ({
    watchlist: state.watchlist.includes(symbol)
      ? state.watchlist.filter(s => s !== symbol)
      : [...state.watchlist, symbol]
  })),

  addTransaction: (tx) => set((state) => ({
    transactions: [{
      ...tx,
      id: `t${Date.now()}`,
      date: new Date().toISOString(),
    }, ...state.transactions]
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, { ...alert, id: `a${Date.now()}`, triggered: false }]
  })),

  removeAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== id)
  })),

  updatePrices: () => set((state) => ({
    assets: state.assets.map(a => {
      const fluctuation = (Math.random() - 0.48) * 0.005;
      const newPrice = a.currentPrice * (1 + fluctuation);
      const newChange = a.change24h + (Math.random() - 0.5) * 0.1;
      return { ...a, currentPrice: parseFloat(newPrice.toFixed(2)), change24h: parseFloat(newChange.toFixed(2)) };
    })
  })),

  totalPortfolioValue: () => {
    return get().assets.reduce((sum, a) => sum + a.quantity * a.currentPrice, 0);
  },

  totalPnL: () => {
    return get().assets.reduce((sum, a) => sum + a.quantity * (a.currentPrice - a.avgBuyPrice), 0);
  },

  totalPnLPercent: () => {
    const invested = get().assets.reduce((sum, a) => sum + a.quantity * a.avgBuyPrice, 0);
    const current = get().totalPortfolioValue();
    return invested > 0 ? ((current - invested) / invested) * 100 : 0;
  },
}));
