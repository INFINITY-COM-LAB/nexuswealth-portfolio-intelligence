import { motion } from 'framer-motion';
import { Bell, Search, RefreshCw, Wifi } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';

export default function Header() {
  const { updatePrices } = useStore();
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [liveIndicator, setLiveIndicator] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulse = setInterval(() => setLiveIndicator(v => !v), 1500);
    return () => clearInterval(pulse);
  }, []);

  // Auto-refresh prices every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 5000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const handleRefresh = () => {
    setRefreshing(true);
    updatePrices();
    setTimeout(() => setRefreshing(false), 800);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="h-14 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 flex items-center px-4 lg:px-6 gap-4 shrink-0 z-30">
      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search assets, news, markets…"
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: liveIndicator ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-emerald-400 text-[10px] font-bold tracking-wider">LIVE</span>
        </div>

        {/* Time */}
        <div className="hidden lg:block text-right">
          <p className="text-white text-xs font-mono font-semibold">{formatTime(time)}</p>
          <p className="text-slate-500 text-[10px]">{formatDate(time)}</p>
        </div>

        {/* Market status */}
        <div className="hidden md:flex items-center gap-1.5 text-xs">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-slate-400">NYSE Open</span>
        </div>

        {/* Refresh */}
        <motion.button
          onClick={handleRefresh}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-white/10"
        >
          <motion.div animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.6, ease: 'linear' }}>
            <RefreshCw className="h-4 w-4" />
          </motion.div>
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-white/10"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </motion.button>
      </div>
    </header>
  );
}
