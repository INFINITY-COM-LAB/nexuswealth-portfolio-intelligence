import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarOff, TrendingUp, TrendingDown, Search, Filter, Plus, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

const typeColors: Record<string, string> = {
  stock: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  crypto: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  etf: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  bond: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
};

export default function Portfolio() {
  const { assets, watchlist, toggleWatchlist, addTransaction } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'stock' | 'crypto' | 'etf'>('all');
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'pnl'>('value');
  const [buyModal, setBuyModal] = useState<null | typeof assets[0]>(null);
  const [buyQty, setBuyQty] = useState('');

  const filtered = assets
    .filter(a => filter === 'all' || a.type === filter)
    .filter(a =>
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'value') return (b.quantity * b.currentPrice) - (a.quantity * a.currentPrice);
      if (sortBy === 'change') return b.change24h - a.change24h;
      if (sortBy === 'pnl') return (b.quantity * (b.currentPrice - b.avgBuyPrice)) - (a.quantity * (a.currentPrice - a.avgBuyPrice));
      return 0;
    });

  const totalValue = assets.reduce((s, a) => s + a.quantity * a.currentPrice, 0);

  const handleBuy = () => {
    if (!buyModal || !buyQty || parseFloat(buyQty) <= 0) return;
    addTransaction({
      assetSymbol: buyModal.symbol,
      assetName: buyModal.name,
      type: 'buy',
      quantity: parseFloat(buyQty),
      price: buyModal.currentPrice,
      total: parseFloat(buyQty) * buyModal.currentPrice,
      status: 'completed',
    });
    setBuyModal(null);
    setBuyQty('');
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-xl font-bold">Portfolio</h1>
        <p className="text-slate-400 text-sm">Total value: <span className="text-indigo-400 font-semibold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 w-52"
          />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'stock', 'crypto', 'etf'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-800/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="value">Sort: Value</option>
            <option value="change">Sort: 24h Change</option>
            <option value="pnl">Sort: P&L</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Asset', 'Type', 'Price', 'Holdings', 'Value', 'Avg Cost', 'P&L', '24h', 'Actions'].map(h => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((asset, i) => {
                  const value = asset.quantity * asset.currentPrice;
                  const pnl = asset.quantity * (asset.currentPrice - asset.avgBuyPrice);
                  const pnlPct = ((asset.currentPrice - asset.avgBuyPrice) / asset.avgBuyPrice) * 100;
                  const allocation = (value / totalValue) * 100;
                  const isWatched = watchlist.includes(asset.symbol);

                  return (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{asset.logo}</span>
                          <div>
                            <p className="text-white font-semibold">{asset.symbol}</p>
                            <p className="text-slate-500 text-[11px] truncate max-w-28">{asset.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${typeColors[asset.type] || ''}`}>
                          {asset.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <motion.p key={asset.currentPrice} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="text-white font-mono font-semibold">
                          ${asset.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </motion.p>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white text-xs">{asset.quantity} {asset.symbol}</p>
                          <div className="w-full bg-slate-700 rounded-full h-1 mt-1.5">
                            <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${Math.min(allocation * 2, 100)}%` }} />
                          </div>
                          <p className="text-slate-500 text-[10px] mt-0.5">{allocation.toFixed(1)}% of portfolio</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-mono font-semibold">${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-400 text-xs font-mono">${asset.avgBuyPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className={`text-xs font-semibold font-mono ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {pnl >= 0 ? '+' : ''}${pnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className={`text-[10px] ${pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center gap-1 text-xs font-semibold ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {asset.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setBuyModal(asset)}
                            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition-colors"
                          >
                            <Plus className="h-3 w-3" />Buy
                          </button>
                          <button
                            onClick={() => toggleWatchlist(asset.symbol)}
                            className={`p-1 rounded-lg transition-colors ${isWatched ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-amber-400'}`}
                          >
                            {isWatched ? <Star className="h-3.5 w-3.5 fill-current" /> : <StarOff className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Buy Modal */}
      <AnimatePresence>
        {buyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setBuyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{buyModal.logo}</span>
                  <div>
                    <h3 className="text-white font-bold">{buyModal.symbol}</h3>
                    <p className="text-slate-400 text-xs">{buyModal.name}</p>
                  </div>
                </div>
                <button onClick={() => setBuyModal(null)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 mb-4 flex justify-between">
                <span className="text-slate-400 text-sm">Current Price</span>
                <span className="text-white font-mono font-bold">${buyModal.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <label className="block text-slate-400 text-xs mb-1.5">Quantity</label>
              <input
                type="number"
                value={buyQty}
                onChange={e => setBuyQty(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-indigo-500/50 mb-3 text-sm"
              />
              {buyQty && parseFloat(buyQty) > 0 && (
                <p className="text-indigo-400 text-xs mb-4 font-semibold">
                  Total: ${(parseFloat(buyQty) * buyModal.currentPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              )}
              <button
                onClick={handleBuy}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Confirm Buy Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
