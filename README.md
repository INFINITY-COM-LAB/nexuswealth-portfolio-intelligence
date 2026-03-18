# 💹 NexusWealth — Portfolio Intelligence Platform

> Professional-grade FinTech Analytics & Portfolio Management Dashboard

NexusWealth gives investors and traders a powerful, unified view of their financial world — combining real-time portfolio tracking, market intelligence, and smart alerts in one sleek interface.

---

## ✨ Features

- 📊 **Dashboard** — Live P&L, portfolio value, asset allocation overview
- 📈 **Market Intelligence** — Charts powered by Recharts with animated transitions
- 💼 **Portfolio Manager** — Track holdings, performance, and allocation
- 🔔 **Smart Alerts** — Configurable price and performance notifications
- 💸 **Transactions** — Full transaction history with filters
- ⚙️ **Settings** — Personalized preferences and account management
- 🎨 **Fluid Animations** — Powered by Framer Motion
- 🗂️ **State Management** — Zustand for clean, scalable state

---

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| React | 19.x |
| TypeScript | 5.x |
| Vite | 7.x |
| Tailwind CSS | v4 |
| Recharts | 3.x |
| Framer Motion | 12.x |
| Zustand | 5.x |
| date-fns | 4.x |
| Lucide React | latest |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/INFINITY-COM-LAB/nexuswealth-portfolio-intelligence.git
cd nexuswealth-portfolio-intelligence

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── App.tsx                  # Root component & routing
├── main.tsx                 # React entry point
├── index.css                # Global styles & Tailwind
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── Sidebar.tsx          # Side navigation
│   ├── StatCard.tsx         # Reusable stat display card
│   └── CautionBanner.tsx    # Demo/disclaimer banner
├── pages/
│   ├── Dashboard.tsx        # Main overview page
│   ├── Portfolio.tsx        # Holdings & allocation
│   ├── Market.tsx           # Market data & charts
│   ├── Transactions.tsx     # Transaction history
│   ├── Alerts.tsx           # Price/performance alerts
│   └── Settings.tsx         # User preferences
├── store/
│   └── useStore.ts          # Zustand global state
├── data/
│   └── chartData.ts         # Mock chart & market data
└── utils/
    └── cn.ts                # className utility
```

---

## 🌐 Live Demo

Deployed via Netlify — [View Live](#)

---

> Built & deployed by AI GitHub Deployment Agent — INFINITY-COM-LAB
