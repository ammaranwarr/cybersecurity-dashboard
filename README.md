# AI Cyber Security Dashboard

## About the Project
This project is a frontend-only AI cybersecurity dashboard designed as a premium portfolio piece. It demonstrates advanced UI/UX concepts using React, featuring a deep midnight navy aesthetic with soft glassmorphism, subtle micro-animations, and dynamic data visualization. The dashboard serves as a conceptual interface for a next-generation AI security monitoring platform.

## Features
* **Login / Sign In**: Aesthetic glassmorphism login interface.
* **Sign Up / Registration**: New user onboarding with mock validation.
* **Forgot Password**: Password reset flow demonstration.
* **Demo authentication**: Fully functional demo session using LocalStorage.
* **Protected routes**: Route guarding ensuring only authenticated users can access the dashboard.
* **Dashboard statistics**: Real-time mock overview of security posture.
* **Threat monitoring**: Visual tracking of incoming threats over time.
* **Threat filtering and search**: Search functionality built into the top navigation.
* **AI Security Analysis**: Placeholder for advanced AI interactions.
* **Risk score / Security score**: Dynamic scoring cards with trends.
* **Security alerts**: Recent alert feed with severity indicators.
* **Reports**: Compliance and auditing report placeholders.
* **Activity timeline**: Audit logging placeholder.
* **Settings**: User preferences placeholder.
* **Responsive design**: Mobile-friendly sidebars and collapsing headers.
* **Dark aesthetic UI**: Deep charcoal, lavender, and cyan premium color palette.
* **LocalStorage-based demo state**: Persistent mock session without a backend.

## Technologies Used
* **React** — frontend UI development (v18)
* **Vite** — development/build tool for fast HMR
* **JavaScript** — core application logic
* **Tailwind CSS** — utility-first styling, glassmorphism, and responsive design
* **React Router** — page navigation, layouts, and protected routes (v6)
* **Recharts** — charts and beautiful data visualization
* **Lucide React** — clean and modern SVG icons
* **LocalStorage** — demo authentication/session state management
* **Git & GitHub** — version control and project hosting
* **GitHub Pages** — frontend deployment platform

## Architecture
This is a frontend-only application designed to simulate a real platform:

```
User
↓
React Application
↓
React Router
↓
Pages & Components
↓
Mock Data + LocalStorage
```

*Note: There is currently no real backend, database, or production authentication connected.*

## Pages
* `/login` - Authentication entry point
* `/register` - New user creation
* `/forgot-password` - Account recovery
* `/dashboard` - Main metrics and overview hub
* `/threats` - Threat intelligence and filtering
* `/ai-analysis` - AI security assistant interface
* `/security` - Detailed security posture breakdown
* `/reports` - Automated compliance reporting
* `/activity` - System audit log
* `/settings` - Platform configuration

## Demo Login
To access the application, use the following demo credentials:

**Email**: `admin@example.com`
**Password**: `admin123`

*These credentials are only for frontend demonstration purposes and do not provide access to real security data.*

## Project Structure
* `src/components` - Reusable UI elements and Layout wrappers (Sidebar, Header, AuthLayout).
* `src/pages` - Main route components (Dashboard, Login, etc.).
* `src/context` - State management (AuthContext).
* `src/utils` - Helper functions (Tailwind class merging).
* `src/App.jsx` - Core routing logic and application shell.
* `src/main.jsx` - React mounting point and provider wrapping.
* `src/index.css` - Global Tailwind directives and custom CSS utilities (glassmorphism, scrollbars).

## Installation

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
npm install
npm run dev
```

## Build
To create a production-ready build:
```bash
npm run build
```

## Deployment
This project is configured for deployment to GitHub Pages using Vite. 

1. Ensure `vite.config.js` has the correct `base` path (e.g., `/REPOSITORY-NAME/`).
2. Run `npm run build`.
3. Commit and push the `dist` folder, or use the `gh-pages` npm package.

The final deployment will be accessible through:
`https://USERNAME.github.io/REPOSITORY-NAME/`

## Future Improvements
* **FastAPI backend**: Replace mock data with real Python-based API endpoints.
* **PostgreSQL database**: Persistent data storage for users, threats, and logs.
* **Real authentication**: Implement JWT or OAuth2 instead of LocalStorage.
* **Real AI threat analysis**: Integrate OpenAI or Anthropic APIs for live threat assessment.
* **Real-time threat intelligence**: WebSockets for live attack mapping.
* **Security APIs**: Connect to real SIEM or EDR tools.
* **Role-based access control**: Differentiate between Admins, Analysts, and Viewers.
* **Real security logs**: Elasticsearch integration for log ingestion.
* **Email notifications**: Send real alerts for critical severity events.
* **Cloud deployment**: Migrate from GitHub Pages to AWS, Vercel, or Netlify.

## Disclaimer
> **This is a frontend portfolio/demo project.** The cybersecurity data, threats, scores, and authentication processes are entirely simulated. Do not use this as a real security monitoring tool in its current state.
