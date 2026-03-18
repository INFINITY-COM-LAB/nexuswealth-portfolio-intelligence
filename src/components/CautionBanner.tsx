import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Info } from 'lucide-react';
import { useState } from 'react';

export default function CautionBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-50 w-full overflow-hidden"
        >
          <div className="relative flex items-center justify-between gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 px-4 py-2.5 text-white shadow-lg">
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />

            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <motion.div
                animate={{ rotate: [0, -8, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-100" />
              </motion.div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-xs tracking-widest uppercase text-amber-100">
                  ⚠ DEMONSTRATION ONLY
                </span>
                <span className="hidden sm:inline text-white/70">|</span>
                <span className="text-xs font-medium text-white/90">
                  This is a <strong>sample website</strong> built for demonstration purposes only. All data, prices, portfolio values, and financial information shown are <strong>completely fictitious</strong> and do not represent real investment advice or actual market data.
                </span>
              </div>
              <motion.div
                className="hidden md:flex items-center gap-1.5 shrink-0 bg-white/15 rounded-full px-2.5 py-1 text-xs font-semibold"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Info className="h-3 w-3" />
                NOT REAL FINANCIAL DATA
              </motion.div>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors duration-150"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
