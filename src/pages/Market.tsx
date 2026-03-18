import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart2, Globe } from 'lucide-react';
import { marketData, riskMetrics } from '../data/chartData';

const tickerItems = [
  { symbol: 'BTC', price: '$67,420', change: '-1.82%', up: false },
  { symbol: 'ETH', price: '$3,541', change: '+2.17%', up: true },
  { symbol: 'AAPL', price: '$189.84', change: '+1.23%', up: true },
  { symbol: 'NVDA', price: '$875.40', change: '+3.45%', up: true },
  { symbol: 'TSLA', price: '$177.90', change: '-2.34%', up: false },
  { symbol: 'SOL', price: '$172.30', change: '+4.21%', up: true },
  { symbol: 'MSFT', price: '$415.26', change: '+0.87%', up: true },
  { symbol: 'AMZN', price: '$186.55', change: '+1.56%', up: true },
];

const indices = [
  { name: 'S&P 500', value: '5,248.32', change: +0.82, color: 'emerald' },
  { name: 'NASDAQ', value: '16,742.10', change: +1.14, color: 'emerald' },
  { name: 'DOW JONES', value: '39,127.80', change: +0.34, color: 'emerald' },
  { name: 'VIX', value: '14.28', change: -3.12, color: 'rose' },
  { name: 'CRYPTO INDEX', value: '3,214.65', change: +2.47, color: 'emerald' },
  { name: '10Y YIELD', value: '4.21%', change: -0.08, color: 'rose' },
];

const marketAssets = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.23, volume: '82.4M', cap: '$2.95T', logo: '🍎', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.26, change: 0.87, volume: '24.1M', cap: '$3.09T', logo: '🪟', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 875.40, change: 3.45, volume: '48.7M', cap: '$2.16T', logo: '🟢', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla', price: 177.90, change: -2.34, volume: '112.3M', cap: '$567B', logo: '⚡', sector: 'Automotive' },
  { symbol: 'AMZN', name: 'Amazon', price: 186.55, change: 1.56, volume: '51.2M', cap: '$1.96T', logo: '📦', sector: 'E-Commerce' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 168.42, change: 0.65, volume: '27.8M', cap: '$2.08T', logo: '🔍', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', price: 512.34, change: 2.11, volume: '18.9M', cap: '$1.31T', logo: '🔵', sector: 'Social' },
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.50, change: -1.82, volume: '$28.4B', cap: '$1.33T', logo: '₿', sector: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3541.20, change: 2.17, volume: '$14.2B', cap: '$425B', logo: '⬡', sector: 'Crypto' },
  { symbol: 'SOL', name: 'Solana', price: 172.30, change: 4.21, volume: '$5.8B', cap: '$80B', logo: '◎', sector: 'Crypto' },
];

export default function Market() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-xl font-bold">Market Overview</h1>
        <p className="text-slate-400 text-sm">Live market data · NYSE & Crypto</p>
      </motion.div>

      {/* Scrolling Ticker */}
      <div className="overflow-hidden bg-slate-900/60 border border-white/8 rounded-xl py-2 relative">
        <div className="flex gap-0 animate-ticker whitespace-nowrap" style={{ animation: 'ticker 28s linear infinite' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-5 text-xs border-r border-white/5 last:border-none">
              <span className="text-slate-300 font-bold">{item.symbol}</span>
              <span className="text-white font-mono">{item.price}</span>
              <span className={item.up ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{item.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Indices ticker */}
      <div className="overflow-hidden bg-slate-800/40 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-indigo-400" />
          <span className="text-white text-sm font-semibold">Global Indices</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {indices.map((idx, i) => (
            <motion.div
              key={idx.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-slate-900/60 rounded-xl p-3 border border-white/5"
            >
              <p className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-1">{idx.name}</p>
              <p className="text-white font-mono font-bold text-sm">{idx.value}</p>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold mt-0.5 ${idx.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {idx.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Price Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">AAPL Intraday</h2>
              <p className="text-slate-400 text-xs">Today · NYSE · Demo Data</p>
            </div>
            <div className="text-right">
              <p className="text-white font-mono font-bold text-lg">$189.84</p>
              <p className="text-emerald-400 text-xs font-semibold">+$2.31 (+1.23%)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={marketData}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" />
              <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                itemStyle={{ color: '#fff' }}
                formatter={(v: any) => [`$${v}`, 'Price']}
              />
              <Line type="monotone" dataKey="price" stroke="url(#lineGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="h-4 w-4 text-violet-400" />
            <h2 className="text-white font-semibold">Risk Metrics</h2>
          </div>
          <div className="space-y-3">
            {riskMetrics.map((m, i) => (
              <motion.div
                key={m.metric}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                className="flex items-center justify-between"
              >
                <span className="text-slate-400 text-xs">{m.metric}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 text-xs">vs {m.benchmark}</span>
                  <span className={`text-sm font-bold font-mono ${
                    m.metric === 'Max DD' ? 'text-rose-400' :
                    typeof m.value === 'number' && m.value > m.benchmark ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {m.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
            <p className="text-indigo-400 text-xs font-semibold">Risk Score</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-emerald-500 to-amber-500 h-2 rounded-full"
                />
              </div>
              <span className="text-white font-bold text-sm">6.2/10</span>
            </div>
            <p className="text-slate-500 text-[10px] mt-1">Moderate-Growth risk profile</p>
          </div>
        </motion.div>
      </div>

      {/* Market Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-white/8">
          <h2 className="text-white font-semibold">Top Assets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Asset', 'Sector', 'Price', '24h Change', 'Volume', 'Market Cap'].map(h => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketAssets.map((a, i) => (
                <motion.tr
                  key={a.symbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{a.logo}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">{a.symbol}</p>
                        <p className="text-slate-500 text-[11px]">{a.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-400 text-xs">{a.sector}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white font-mono font-semibold">${a.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 text-xs font-semibold ${a.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {a.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {a.change >= 0 ? '+' : ''}{a.change.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-400 text-xs font-mono">{a.volume}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-400 text-xs font-mono">{a.cap}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
