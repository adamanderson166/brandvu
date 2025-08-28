# BrandVu - Brand-Influencer Matching Platform

A modern, great award-winning front-end application that revolutionizes how brands discover and collaborate with influencers. Built with React, TypeScript, and Tailwind CSS, featuring an addictive swipe interface similar to dating apps but designed for professional brand-influencer partnerships.

## 🚀 Features

### Core Functionality
- **Dual Authentication**: Separate signup/login flows for brands and influencers
- **Swipe Interface**: Addictive card-swiping mechanism for discovering matches
- **Smart Matching**: AI-powered algorithm with Pulsemetric scoring
- **Real-time Analytics**: Comprehensive performance tracking and insights
- **Chat System**: Built-in messaging for collaboration management
- **Profile Management**: Complete profile setup with photo uploads and category selection

### User Experience
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear user flows
- **Performance Optimized**: Fast loading times and smooth interactions

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Framer Motion**: Smooth animations and gesture controls
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Router**: Client-side routing with protected routes
- **Component Architecture**: Modular, reusable components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brandvu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx  # Landing page with hero section
│   ├── AuthPage.tsx     # Authentication (login/signup)
│   ├── Dashboard.tsx    # Main dashboard
│   ├── SwipeInterface.tsx # Core swipe functionality
│   ├── ProfileSetup.tsx # Profile creation wizard
│   ├── Analytics.tsx    # Performance analytics
│   ├── Matches.tsx      # Matches and chat
│   └── Navigation.tsx   # Main navigation
├── App.tsx             # Main app component with routing
├── index.tsx           # Entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Components

### LandingPage
- Hero section with value proposition
- Feature highlights and statistics
- Call-to-action sections
- Modern gradient design

### AuthPage
- Dual user type selection (Brand/Influencer)
- Form validation and error handling
- Smooth transitions between login/signup
- Benefits showcase for each user type

### SwipeInterface
- Gesture-controlled card swiping
- Profile cards with detailed information
- Filter and search functionality
- Progress tracking

### Dashboard
- Overview statistics and metrics
- Quick action buttons
- Recent activity feed
- Performance insights

### Analytics
- Pulsemetric scoring system
- Performance charts and graphs
- AI-powered insights
- Export functionality

### Matches
- Match list with filtering
- Real-time chat interface
- Profile details and verification
- Collaboration management tools

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Brand**: Purple gradient (#d946ef to #c026d3)
- **Success**: Green (#22c55e)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Primary Font**: Inter (system-ui fallback)
- **Display Font**: Poppins for headings
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Clean borders with focus states
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations and keyframes
- Responsive breakpoints
- Component utilities

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_ENVIRONMENT=development
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🔮 Future Enhancements

### Phase 2 Features
- **Zazi Integration**: Photographer matching
- **Event Management**: Brand event coordination
- **Marketplace**: Content creator resources
- **Escrow System**: Secure payment handling

### Phase 3 Features
- **AI Recommendations**: Advanced matching algorithm
- **Video Chat**: Built-in video calling
- **Analytics API**: Third-party integrations
- **Mobile App**: Native iOS/Android applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Steve Phillips**: Data Science & Analytics
- **Katie Harward**: Product Strategy & Brand Partnerships
- **Adam Anderson**: Frontend Development
- **Sabe Anderson**: Project Management

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**BrandVu** - Connecting brands with perfect influencers through intelligent matching and analytics. 

## BrandView Integration Guide (MVP)

Flags (create `.env`):
```
REACT_APP_BRANDVIEW_MVP=true
REACT_APP_BRANDVIEW_MOCK_MODE=true
# Optional per-connector toggles
REACT_APP_INSTAGRAM_ENABLE=true
REACT_APP_TIKTOK_ENABLE=true
REACT_APP_YOUTUBE_ENABLE=true
REACT_APP_SPOTIFY_ENABLE=true
REACT_APP_SNAPCHAT_ENABLE=false
```

Behavior:
- When `REACT_APP_BRANDVIEW_MVP=false`, no BrandView nav or routes are mounted.
- When `true`, BrandView appears and uses mock/sample data if keys are missing.

Routes:
- `/brandview` (Overview)
- `/brandview/onboarding` (role-based wizard)
- `/brandview/dashboard/creator`
- `/brandview/dashboard/brand`
- `/brandview/matches`
- `/brandview/learn`

Guards:
- Users without a BrandView role are redirected to onboarding when opening BrandView dashboards.
- Creator vs Brand dashboards auto-redirect based on selected role.

Mock data labeling:
- Any synthetic metric is labeled with a small “Sample” badge. 

## Executive Overview
See the executive summary of BrandView MVP integration in `docs/EXEC_OVERVIEW.md`. 

## Next Phase (MVP)
- Data Tracker (flag: `REACT_APP_BRANDVIEW_DATA_TRACKER_MVP`)
  - Normalized real-time metrics across platforms, snapshot history, actionable suggestions.
- Email Management (flag: `REACT_APP_BRANDVIEW_EMAIL_MVP`)
  - Build/send outreach campaigns, engagement analytics (opens/clicks/replies), contact lists & compliance.

These features will integrate into BrandView and run behind feature flags for controlled rollout. # Updated: Thu Aug 21 10:51:39 MST 2025
