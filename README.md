# ReadyAI - AI Readiness Platform

A production-grade AI Readiness Platform that guides SMEs (small-to-medium enterprises), non-technical founders, and ops/marketing managers — especially in Indonesia and Southeast Asia — from "AI curiosity" to "executed AI use cases with measurable ROI."

## Features

### Module 1: Digital Maturity Assessment
- 7-step wizard covering: Data, Tools, Team, Budget, Processes, Integration, Security
- Scoring engine (0-28 points) mapping to maturity tiers
- Radar chart visualization with blockers and recommendations

### Module 2: AI Use-Case Generator
- Industry and department selection
- Pain point filtering
- 6 tailored AI use case cards with difficulty badges
- Save and filter functionality

### Module 3: ROI Simulator
- Dynamic input forms for automation/analytics use cases
- 12-month projections with cumulative chart
- Payback period and ROI calculations
- Export to PDF

### Module 4: AI Playbooks
- Kanban-style task management
- Week-by-week implementation timeline
- Progress tracking with success metrics
- Resources and risk management

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd readyai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navigation
├── context/
│   └── AssessmentContext.jsx # Global state management
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Assessment.jsx      # Assessment wizard
│   ├── AssessmentResult.jsx # Results dashboard
│   ├── UseCaseGenerator.jsx # Use case generator
│   ├── ROISimulator.jsx   # ROI calculator
│   ├── Playbooks.jsx      # Implementation playbooks
│   └── Dashboard.jsx      # User dashboard
├── App.jsx                # Router configuration
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_ANTHROPIC_API_KEY=your_claude_api_key
```

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Design System

### Colors
- Primary: Navy #0F1B2D
- Accent: Amber #F59E0B
- Background: Soft White #F8FAFC

### Typography
- Display: Plus Jakarta Sans
- Body: DM Sans

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
