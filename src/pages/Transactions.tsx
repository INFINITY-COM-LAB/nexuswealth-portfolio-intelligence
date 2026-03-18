import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Gift, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { useState } from 'react';

const typeConfig = {
  buy: { label: 'Buy', icon: ArrowDownLeft, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  sell: { label: 'Sell', icon: ArrowUpRight, color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
  dividend: { label: 'Dividend', icon: Gift, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
};
const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-emerald-400' },
  pending: { icon: Clock, color: 'text-amber-400' },
  failed: { icon: XCircle, color: 'text-rose-400' },
};

export default function Transactions() {
  const { transactions } = useStore();
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'dividend'>('all');

  const filtered = transactions.filter(tx => filter === 'all' || tx.type === filter);
  const totalBuy = transactions.filter(t => t.type === 'buy').reduce((s, t) => s + t.total, 0);
  const totalSell = transactions.filter(t => t.type === 'sell').reduce((s, t) => s + t.total, 0);
  const totalDividend = transactions.filter(t => t.type === 'dividend').reduce((s, t) => s + t.total, 0);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-xl font-bold">Transactions</h1>
        <p className="text-slate-400 text-sm">Full order history and activity log</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Invested', value: totalBuy, color: 'text-emerald-400', icon: ArrowDownLeft },
          { label: 'Total Sold', value: totalSell, color: 'text-rose-400', icon: ArrowUpRight },
          { label: 'Dividends', value: totalDividend, color: 'text-amber-400', icon: Gift },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-slate-800/50 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-slate-500 text-xs">{item.label}</span>
            </div>
            <p className={`text-lg font-bold font-mono ${item.color}`}>
              ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-slate-500" />
        <div className="flex gap-1.5">
          {(['all', 'buy', 'sell', 'dividend'] as const).map(f => (
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
      </div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Type', 'Asset', 'Quantity', 'Price', 'Total', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => {
                const tc = typeConfig[tx.type];
                const sc = statusConfig[tx.status];
                const TIcon = tc.icon;
                const SIcon = sc.icon;
                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-bold border px-2.5 py-1 rounded-full w-fit ${tc.bg} ${tc.color}`}>
                        <TIcon className="h-3 w-3" />
                        {tc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white font-semibold">{tx.assetSymbol}</p>
                      <p className="text-slate-500 text-[11px]">{tx.assetName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-300 font-mono">{tx.quantity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-300 font-mono">${tx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-mono font-semibold ${tx.type === 'sell' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {tx.type === 'sell' ? '-' : '+'}${tx.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-400 text-xs">{format(new Date(tx.date), 'MMM d, yyyy')}</p>
                      <p className="text-slate-600 text-[10px]">{format(new Date(tx.date), 'HH:mm')}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold ${sc.color}`}>
                        <SIcon className="h-3.5 w-3.5" />
                        <span className="capitalize">{tx.status}</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No transactions found</div>
        )}
      </motion.div>
    </div>
  );
}
