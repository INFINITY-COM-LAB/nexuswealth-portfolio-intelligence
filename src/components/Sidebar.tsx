import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, TrendingUp, ArrowLeftRight,
  Bell, Settings, ChevronRight, Zap, Menu, X
} from 'lucide-react';
import { useStore, ActiveTab } from '../store/useStore';
import { useState } from 'react';

const navItems: { tab: ActiveTab; label: string; icon: React.ElementType; badge?: number }[] = [
  { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { tab: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { tab: 'market', label: 'Market', icon: TrendingUp },
  { tab: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { tab: 'alerts', label: 'Alerts', icon: Bell, badge: 4 },
  { tab: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <motion.div
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="h-5 w-5 text-white" />
        </motion.div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-white font-bold text-sm tracking-tight">NexusWealth</p>
            <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">Portfolio AI</p>
          </motion.div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-400 hover:text-white transition-colors hidden lg:block"
        >
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ tab, label, icon: Icon, badge }) => {
          const isActive = activeTab === tab;
          return (
            <motion.button
              key={tab}
              onClick={() => { setActiveTab(tab); setMobileOpen(false); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-indigo-600/20 rounded-xl border border-indigo-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <Icon className={`h-4.5 w-4.5 shrink-0 relative z-10 ${isActive ? 'text-indigo-400' : ''}`} />
              {!collapsed && (
                <span className="relative z-10">{label}</span>
              )}
              {badge && !collapsed && (
                <span className="relative z-10 ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                  {badge}
                </span>
              )}
              {badge && collapsed && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            JD
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">James Donovan</p>
              <p className="text-slate-400 text-[10px] truncate">Pro Plan · Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-14 left-3 z-40 p-2 bg-slate-800 rounded-xl text-slate-300 shadow-lg border border-white/10"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-white/10 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <p className="text-white font-bold">NexusWealth</p>
          <button onClick={() => setMobileOpen(false)} className="text-slate-400">
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent />
      </motion.aside>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col bg-slate-900 border-r border-white/10 shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
