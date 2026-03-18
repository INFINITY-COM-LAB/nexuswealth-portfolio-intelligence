import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Star, Newspaper, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';
import { portfolioHistory, allocationData, weeklyReturns } from '../data/chartData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-white text-sm font-semibold">
            <span style={{ color: p.color }}>{p.name}: </span>
            ${p.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { assets, news, totalPortfolioValue, totalPnL, totalPnLPercent } = useStore();
  const portValue = totalPortfolioValue();
  const pnl = totalPnL();
  const pnlPct = totalPnLPercent();
  const topGainers = [...assets].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const topLosers = [...assets].sort((a, b) => a.change24h - b.change24h).slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-white text-xl font-bold">Good Morning, James 👋</h1>
        <p className="text-slate-400 text-sm mt-0.5">Here's your portfolio overview for today.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Portfolio"
          value={`$${portValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={pnlPct}
          changeLabel="all time"
          icon={Wallet}
          color="indigo"
          delay={0}
          subtitle="Across all holdings"
        />
        <StatCard
          title="Total P&L"
          value={`${pnl >= 0 ? '+' : ''}$${pnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={pnlPct}
          changeLabel="return"
          icon={pnl >= 0 ? TrendingUp : TrendingDown}
          color={pnl >= 0 ? 'emerald' : 'rose'}
          delay={0.05}
        />
        <StatCard
          title="Today's Change"
          value="+$2,841.50"
          change={2.15}
          changeLabel="today"
          icon={DollarSign}
          color="amber"
          delay={0.1}
          subtitle="Market hours gain"
        />
        <StatCard
          title="Assets Held"
          value={`${assets.length}`}
          icon={Star}
          color="violet"
          delay={0.15}
          subtitle={`Across ${new Set(assets.map(a => a.type)).size} asset types`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="xl:col-span-2 bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">Portfolio Performance</h2>
              <p className="text-slate-400 text-xs mt-0.5">vs S&P 500 Benchmark</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-400"><span className="w-3 h-0.5 bg-indigo-400 inline-block rounded" />Portfolio</span>
              <span className="flex items-center gap-1.5 text-slate-500"><span className="w-3 h-0.5 bg-slate-500 inline-block rounded" />Benchmark</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Portfolio" stroke="#6366f1" strokeWidth={2} fill="url(#portfolioGrad)" dot={false} />
              <Area type="monotone" dataKey="benchmark" name="Benchmark" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#benchmarkGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Allocation Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-1">Allocation</h2>
          <p className="text-slate-400 text-xs mb-4">By sector</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={allocationData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {allocationData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, '']} contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} itemStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="text-white font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Returns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-1">Weekly Returns</h2>
          <p className="text-slate-400 text-xs mb-4">Daily P&L this week</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weeklyReturns} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="gain" name="Gain" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="loss" name="Loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Movers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-4">Top Movers</h2>
          <div className="space-y-1">
            <p className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-2">Gainers</p>
            {topGainers.map(a => (
              <div key={a.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{a.logo}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{a.symbol}</p>
                    <p className="text-slate-500 text-[10px]">${a.currentPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <ArrowUpRight className="h-3 w-3" />
                  +{a.change24h.toFixed(2)}%
                </div>
              </div>
            ))}
            <div className="border-t border-white/5 my-2" />
            <p className="text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-2">Losers</p>
            {topLosers.map(a => (
              <div key={a.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{a.logo}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{a.symbol}</p>
                    <p className="text-slate-500 text-[10px]">${a.currentPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-rose-400 text-xs font-semibold">
                  <ArrowDownRight className="h-3 w-3" />
                  {a.change24h.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* News Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-5 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-4 w-4 text-indigo-400" />
            <h2 className="text-white font-semibold">Market News</h2>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[260px] pr-1">
            {news.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    item.sentiment === 'positive' ? 'bg-emerald-400' :
                    item.sentiment === 'negative' ? 'bg-rose-400' : 'bg-amber-400'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-xs font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-500 text-[10px]">{item.source}</span>
                      <span className="text-slate-600 text-[10px]">·</span>
                      <span className="text-slate-500 text-[10px]">{item.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
