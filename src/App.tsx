import { motion, AnimatePresence } from 'framer-motion';
import CautionBanner from './components/CautionBanner';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import Transactions from './pages/Transactions';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import { useStore } from './store/useStore';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function App() {
  const { activeTab } = useStore();

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'portfolio': return <Portfolio />;
      case 'market': return <Market />;
      case 'transactions': return <Transactions />;
      case 'alerts': return <Alerts />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1325 40%, #0f172a 100%)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/8 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-violet-600/6 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      {/* Caution Banner */}
      <CautionBanner />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="min-h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <footer className="shrink-0 border-t border-white/5 px-6 py-2.5 flex items-center justify-between">
            <p className="text-slate-600 text-[10px]">
              NexusWealth Portfolio Intelligence · <span className="text-amber-500/70">Demo Environment</span> · All data is fictitious
            </p>
            <div className="flex items-center gap-3 text-slate-700 text-[10px]">
              <span>v2.4.1-demo</span>
              <span>·</span>
              <span>Built with React + Vite</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
