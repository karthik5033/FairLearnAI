# FairLearnAI 🎓

A modern, AI-powered learning platform designed to provide personalized education experiences with a focus on fairness, accessibility, and engagement.

![FairLearnAI](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Core Features
- **Personalized Learning Paths** - AI-driven course recommendations tailored to individual learning styles
- **Interactive Dashboard** - Real-time progress tracking with beautiful visualizations
- **Modular Tab System** - Seamless navigation between Overview, Courses, Schedule, and Community
- **Focus Mode** - Distraction-free learning environment
- **Smart Analytics** - Track focus time, quiz scores, and learning velocity

### 📚 Course Management
- Active course tracking with progress bars
- Course exploration with ratings and enrollment stats
- Module completion tracking
- Dynamic course recommendations

### 📅 Schedule & Planning
- Interactive daily agenda with timeline view
- Mini calendar with event highlighting
- Upcoming events tracker
- Live class and deadline notifications

### 👥 Community Features
- Discussion feed with post creation
- Weekly leaderboard with gamification
- Peer interaction and collaboration
- Weekly challenges and badges

### 🎨 Design Philosophy
- **Minty Fresh SaaS** aesthetic with emerald/teal accents
- Glassmorphic UI elements with backdrop blur
- Smooth animations powered by Framer Motion
- Fully responsive design for all devices
- Dark mode announcements banner

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Shadcn UI

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Quality**: TypeScript strict mode

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/karthik5033/FairLearnAI.git
cd FairLearnAI/fairlearnai-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
fairlearnai-web/
├── app/
│   ├── dashboard/          # Main dashboard with tab navigation
│   │   ├── page.tsx       # Dashboard layout & header
│   │   └── data.json      # Mock data for dashboard
│   ├── features/          # Dynamic feature pages
│   ├── login/             # Authentication pages
│   ├── sign-up/           # Registration pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── overview-tab.tsx
│   │   ├── courses-tab.tsx
│   │   ├── schedule-tab.tsx
│   │   └── community-tab.tsx
│   ├── ui/                # Reusable UI components
│   ├── chart-area-interactive.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   └── ...
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎨 Key Components

### Dashboard Tabs
- **OverviewTab**: Hero card, charts, stats, leaderboard, AI tutor
- **CoursesTab**: Active courses grid, explore new topics
- **ScheduleTab**: Daily agenda timeline, mini calendar
- **CommunityTab**: Discussion feed, leaderboard, challenges

### Reusable Components
- `ChartAreaInteractive`: Customizable area chart with time filters
- `Logo`: Branded logo with gradient
- `HeroSection`: Landing page hero with typewriter effect

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Emerald/Teal color scheme
- Custom animations
- Glassmorphism utilities
- Responsive breakpoints

### Environment Variables
Create a `.env.local` file for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animation System

Powered by Framer Motion with:
- Page transitions
- Tab switching animations
- Hover effects
- Scroll-triggered animations
- Stagger children animations

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Karthik K P**
- GitHub: [@karthik5033](https://github.com/karthik5033)

## 🙏 Acknowledgments

- Shadcn UI for beautiful component primitives
- Vercel for Next.js framework
- Tailwind Labs for Tailwind CSS
- Framer for Motion library

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

<div align="center">
  <strong>Built with ❤️ using Next.js and TypeScript</strong>
</div>
