# 🧠 NeuroFin Coach

**NeuroFin Coach** is a next-generation AI-driven financial insight dashboard designed for intelligent spending analysis, portfolio tracking, and savings optimization.  
It combines neural-inspired UX, real-time visual analytics, and interactive chat capabilities — delivering an immersive experience that feels like chatting with your personal financial strategist.

---

## ✨ Features

### 💬 AI-Powered Financial Chat
Interact naturally using simple text commands or clicks:
- **"spending"** → Spending analytics and trend visualizations  
- **"savings"** → Detect immediate saving opportunities  
- **"portfolio"** → Portfolio ROI and asset allocation breakdown  
- **"health"** → Radar visualization of your financial wellness  
- **"budget"** → Compare category-level utilization  
- **"goals"** → Track financial goal progress  
- **"alerts"** → Smart weekly alert overview  

For each tool, the AI can:
- **Show insights** → Quick recommendations  
- **Explain more** → In-depth breakdown  
- **Give actions** → Actionable next steps

---

## 🧩 Component Architecture

The app is structured with clean modularity in mind:

```
src/
├── components/
│   ├── AIChat.jsx                # Main interactive chat dashboard
│   ├── AIInsight.jsx             # (Future) dedicated insights view
│   ├── Dashboard.jsx             # Core financial dashboard
│   ├── Goals.jsx                 # Goal tracking UI
│   ├── Header.jsx                # Header + summary info
│   ├── Navigation.jsx            # Top nav bar
│   ├── QuickStats.jsx            # At-a-glance KPIs
│   ├── Transactions.jsx          # Transaction listing
│   └── chat/
│       ├── ChartComponents.jsx   # All Recharts visualizations
│       ├── chartData.jsx         # Mock datasets for demo
│       ├── ChatMessages.jsx      # Renders message bubbles & AI cards
│       ├── insightsContent.jsx   # Insights / explanations / actions
│       ├── InteractiveWalkthrough.jsx # Onboarding walkthrough (AI tutorial)
│       ├── LeftDock.jsx          # Collapsible dock with 8 AI tools
│       └── NeuralLoader.jsx      # Animated AI “thinking” loader
```

---

## 🧠 Interactive Walkthrough (Built-in Tutorial)

When first launched, users are guided through an **AI-driven walkthrough** explaining:
1. The AI Tools panel (left dock)
2. Interactive charts and analytics
3. Chip-based insight exploration
4. Smart conversational interface

Each step features:
- Animated highlights ✨  
- Progress indicators  
- Neon-green onboarding visuals  

---

## 📊 Visualization & Tech Stack

| Area | Tech Used |
|------|------------|
| **Frontend** | React 18 + Vite / CRA |
| **Charts** | Recharts (Area, Bar, Radar, Pie, Line) |
| **Styling** | Tailwind CSS + custom gradients |
| **Icons** | Lucide React (modern, lightweight icons) |
| **AI UX Layer** | Custom contextual logic & heuristic responses |
| **Animations** | Tailwind motion utilities + keyframe transitions |

---

## 🧱 Core Design Principles

- **Modular React Components** — Every feature is isolated under `/chat` for scalability.
- **Neural Interface Aesthetic** — Green glowing elements, glass blur, and gradients emulate a neural financial system.
- **Contextual Conversation** — The chat remembers the last tool used, allowing short follow-ups like “insights” or “actions”.
- **Chart-Driven Feedback** — Every AI response includes dynamic, meaningful visuals.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/neurofin-coach.git
cd neurofin-coach
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
npm run start
# or if using Vite
npm run dev
```

Then visit:
```
http://localhost:3000
```

---

## ⚙️ Available Scripts

| Command | Description |
|----------|-------------|
| `npm run start` | Runs the app in development mode |
| `npm run build` | Builds the production-ready app |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run preview` | Previews a local build (if using Vite) |

---

## 🌈 Theming & Customization

You can easily adjust:
- **Color scheme** → Tailwind gradients (`emerald`, `green`, `slate`)
- **AI personality tone** → Edit responses in `insightsContent.jsx`
- **Charts** → Modify visual styles in `ChartComponents.jsx`
- **Data sources** → Replace `chartData.jsx` with live API data or DB integration

---

## 🧠 Example Commands

You can type or click any of these:
```
spending
show insights
explain more
give me actions
portfolio
health
budget
```

The AI automatically adapts its responses and charts based on the context.

---

## 💾 Data Simulation

Currently powered by mock data (`chartData.jsx`), supporting future integrations:
- 🔗 Real-time financial APIs (Plaid, Salt Edge, or custom endpoints)
- 🧮 Personal finance datasets
- 🧠 AI inference via Node/Mongo microservice (planned)

---

## 🧠 Future Enhancements (Roadmap)

- ✅ Enhanced AI context memory between messages  
- 🔄 Live portfolio sync (via API)  
- 📈 Historical trend comparison  
- 📱 Mobile layout improvements  
- 🗂️ Exportable PDF / CSV insights  
- 🧩 Integration with GPT financial analysis microservice  

---

## 🧠 Example Visuals

| Insight | Example |
|----------|----------|
| Spending Trends | ![Spending Chart](docs/spending_chart_example.png) |
| Portfolio Allocation | ![Portfolio Chart](docs/portfolio_chart_example.png) |
| Financial Health Radar | ![Radar Chart](docs/health_chart_example.png) |

---

## ⚖️ License

MIT License © 2025  
Developed by [Your Name / Team]

---

## 💬 Credits
- **Design & UX:** Inspired by neural dashboard interfaces  
- **Icons:** [Lucide React](https://lucide.dev)  
- **Charts:** [Recharts](https://recharts.org)  
- **Framework:** React + TailwindCSS  

---

🧩 **NeuroFin Coach** — *Your intelligent, visually-driven AI financial guide.*
