import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Plus, X, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export default function Alerts() {
  const { alerts, addAlert, removeAlert, assets } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ symbol: string; type: 'price_above' | 'price_below' | 'change_percent'; value: string; active: boolean }>({ symbol: 'BTC', type: 'price_above', value: '', active: true });

  const handleAdd = () => {
    if (!form.value || parseFloat(form.value) <= 0) return;
    addAlert({ symbol: form.symbol, type: form.type as any, value: parseFloat(form.value), active: true });
    setShowForm(false);
    setForm({ symbol: 'BTC', type: 'price_above', value: '', active: true });
  };

  const alertTypeLabel = (type: string) => {
    if (type === 'price_above') return 'Price rises above';
    if (type === 'price_below') return 'Price falls below';
    if (type === 'change_percent') return '24h change exceeds';
    return type;
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold">Price Alerts</h1>
          <p className="text-slate-400 text-sm">{alerts.filter(a => a.active).length} active alerts configured</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Alert
        </motion.button>
      </motion.div>

      {/* Alert Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Active', count: alerts.filter(a => a.active).length, color: 'text-indigo-400', icon: Bell },
          { label: 'Triggered', count: alerts.filter(a => a.triggered).length, color: 'text-amber-400', icon: Zap },
          { label: 'Inactive', count: alerts.filter(a => !a.active).length, color: 'text-slate-400', icon: BellOff },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl bg-slate-700/50 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${alert.active ? 'bg-indigo-500/15 text-indigo-400' : 'bg-slate-700/50 text-slate-500'}`}>
                  {alert.type === 'price_above' ? <TrendingUp className="h-4 w-4" /> : alert.type === 'price_below' ? <TrendingDown className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold">{alert.symbol}</p>
                    {alert.active && (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                      />
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {alertTypeLabel(alert.type)}{' '}
                    <span className="text-white font-semibold font-mono">
                      {alert.type === 'change_percent' ? `${alert.value}%` : `$${alert.value.toLocaleString()}`}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  alert.active
                    ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                    : 'text-slate-500 bg-slate-700/30 border-slate-600/20'
                }`}>
                  {alert.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {alerts.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No alerts configured. Create one to get started.</div>
        )}
      </div>

      {/* Add Alert Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold">Create Alert</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Asset Symbol</label>
                  <select
                    value={form.symbol}
                    onChange={e => setForm(f => ({ ...f, symbol: e.target.value }))}
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50"
                  >
                    {assets.map(a => <option key={a.symbol} value={a.symbol}>{a.symbol} — {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Alert Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50"
                  >
                    <option value="price_above">Price rises above</option>
                    <option value="price_below">Price falls below</option>
                    <option value="change_percent">24h change exceeds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">
                    {form.type === 'change_percent' ? 'Percent (%)' : 'Price ($)'}
                  </label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                    placeholder={form.type === 'change_percent' ? 'e.g. 5' : 'e.g. 70000'}
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Create Alert
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
