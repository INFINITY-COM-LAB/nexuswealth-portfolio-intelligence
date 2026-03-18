import { motion } from 'framer-motion';
import { User, Shield, Bell, Palette, Database, Key, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data & Storage', icon: Database },
  { id: 'api', label: 'API Keys', icon: Key },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    priceAlerts: true,
    newsDigest: true,
    weeklyReport: false,
    tradingActivity: true,
    marketOpen: false,
    smsAlerts: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-white text-xl font-bold">Settings</h1>
        <p className="text-slate-400 text-sm">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar Nav */}
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-3 space-y-1 lg:col-span-1 h-fit">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeSection === s.id
                  ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/25'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <s.icon className="h-4 w-4" />
                {s.label}
              </div>
              <ChevronRight className="h-3.5 w-3.5 opacity-40" />
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:col-span-3 bg-slate-800/50 border border-white/10 rounded-2xl p-6 space-y-6"
        >
          {activeSection === 'profile' && (
            <>
              <h2 className="text-white font-semibold text-base">Profile Information</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-2xl">JD</div>
                <div>
                  <p className="text-white font-semibold">James Donovan</p>
                  <p className="text-slate-400 text-sm">Pro Plan · Member since Jan 2023</p>
                  <button className="text-indigo-400 text-xs mt-1 hover:text-indigo-300 transition-colors">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'First Name', value: 'James' },
                  { label: 'Last Name', value: 'Donovan' },
                  { label: 'Email Address', value: 'james.donovan@nexuswealth.demo' },
                  { label: 'Phone Number', value: '+1 (555) 012-3456' },
                  { label: 'Time Zone', value: 'America/New_York' },
                  { label: 'Currency', value: 'USD ($)' },
                ].map(field => (
                  <div key={field.label}>
                    <label className="block text-slate-400 text-xs mb-1.5">{field.label}</label>
                    <input
                      defaultValue={field.value}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === 'notifications' && (
            <>
              <h2 className="text-white font-semibold text-base">Notification Preferences</h2>
              <div className="space-y-3">
                {(Object.entries(notifSettings) as [keyof typeof notifSettings, boolean][]).map(([key, val]) => {
                  const labels: Record<string, { label: string; desc: string }> = {
                    priceAlerts: { label: 'Price Alerts', desc: 'Notify when asset prices hit your targets' },
                    newsDigest: { label: 'Daily News Digest', desc: 'Morning summary of market-moving news' },
                    weeklyReport: { label: 'Weekly Portfolio Report', desc: 'Performance summary every Monday' },
                    tradingActivity: { label: 'Trading Activity', desc: 'Confirmation for buy/sell orders' },
                    marketOpen: { label: 'Market Open Alert', desc: 'Notify when NYSE/Crypto markets open' },
                    smsAlerts: { label: 'SMS Alerts', desc: 'Receive critical alerts via text message' },
                  };
                  const info = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between p-3.5 bg-slate-900/40 rounded-xl border border-white/5">
                      <div>
                        <p className="text-white text-sm font-medium">{info.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{info.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifSettings(n => ({ ...n, [key]: !val }))}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${val ? 'bg-indigo-600' : 'bg-slate-700'}`}
                      >
                        <motion.div
                          animate={{ x: val ? 22 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeSection === 'security' && (
            <>
              <h2 className="text-white font-semibold text-base">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Two-Factor Authentication', status: 'Enabled', color: 'text-emerald-400', desc: 'Your account is protected with 2FA via authenticator app' },
                  { label: 'Login Sessions', status: '2 Active', color: 'text-amber-400', desc: 'MacBook Pro (Current) · iPhone 15 Pro' },
                  { label: 'Password', status: 'Last changed 3mo ago', color: 'text-slate-400', desc: 'Use a strong, unique password for your account' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-white/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-medium">{item.label}</p>
                        <span className={`text-[10px] font-bold ${item.color}`}>{item.status}</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                    <button className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition-colors">Manage</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === 'api' && (
            <>
              <h2 className="text-white font-semibold text-base">API Keys</h2>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-400 text-xs mb-4">
                ⚠ This is a demo environment. API keys shown below are not real and will not work with any external service.
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Production API Key', key: 'nxw_prod_•••••••••••••••••••••••abc123', created: 'Nov 1, 2024', status: 'Active' },
                  { name: 'Webhook Secret', key: 'whsec_•••••••••••••••••••••••xyz789', created: 'Oct 15, 2024', status: 'Active' },
                ].map(k => (
                  <div key={k.name} className="p-4 bg-slate-900/50 rounded-xl border border-white/8">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white text-sm font-semibold">{k.name}</p>
                      <span className="text-emerald-400 text-[10px] font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">{k.status}</span>
                    </div>
                    <p className="text-slate-400 text-xs font-mono">{k.key}</p>
                    <p className="text-slate-600 text-[10px] mt-1.5">Created {k.created}</p>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors mt-2">
                  <Key className="h-4 w-4" />
                  Generate New API Key
                </button>
              </div>
            </>
          )}

          {(activeSection === 'appearance' || activeSection === 'data') && (
            <div className="py-8 text-center text-slate-500">
              <div className="text-4xl mb-3">🚧</div>
              <p className="font-semibold text-white">Coming Soon</p>
              <p className="text-sm mt-1">This section is under construction in the demo</p>
            </div>
          )}

          {/* Save Button */}
          {activeSection !== 'appearance' && activeSection !== 'data' && (
            <div className="pt-4 border-t border-white/8 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  saved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {saved ? <><Check className="h-4 w-4" />Saved!</> : 'Save Changes'}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
