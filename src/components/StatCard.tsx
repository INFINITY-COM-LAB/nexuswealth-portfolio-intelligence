import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'sky';
  delay?: number;
  subtitle?: string;
}

const colorMap = {
  indigo: {
    bg: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/20',
    icon: 'bg-indigo-500/20 text-indigo-400',
    glow: 'shadow-indigo-500/10',
  },
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/20',
    icon: 'bg-amber-500/20 text-amber-400',
    glow: 'shadow-amber-500/10',
  },
  rose: {
    bg: 'from-rose-500/20 to-rose-600/5',
    border: 'border-rose-500/20',
    icon: 'bg-rose-500/20 text-rose-400',
    glow: 'shadow-rose-500/10',
  },
  violet: {
    bg: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  sky: {
    bg: 'from-sky-500/20 to-sky-600/5',
    border: 'border-sky-500/20',
    icon: 'bg-sky-500/20 text-sky-400',
    glow: 'shadow-sky-500/10',
  },
};

export default function StatCard({ title, value, change, changeLabel, icon: Icon, color, delay = 0, subtitle }: StatCardProps) {
  const c = colorMap[color];
  const isPositive = change !== undefined && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-5 shadow-lg ${c.glow} cursor-default`}
    >
      {/* BG decoration */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${c.bg} blur-2xl opacity-60`} />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium tracking-wide uppercase mb-2">{title}</p>
          <motion.p
            key={value}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-white text-2xl font-bold tracking-tight font-mono"
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
              {changeLabel && <span className="text-slate-500 font-normal ml-1">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${c.icon} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
