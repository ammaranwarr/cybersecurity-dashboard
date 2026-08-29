# 🛡️ AI Cyber Security Dashboard

A modern **frontend-only AI cybersecurity dashboard** designed as a premium portfolio project. It demonstrates a next-generation security monitoring interface with a deep midnight aesthetic, glassmorphism UI, responsive layouts, micro-interactions, and dynamic security visualizations.

> **Note:** This project currently uses simulated cybersecurity data and demo authentication. It does not connect to a real backend, database, SIEM, or security infrastructure.

## 🚀 Live Demo

🔗 **[View Live Demo](https://cybersecurity-dashboard-uhei-c3hntcrr4-ammaranwarr.vercel.app/)**

---

## ✨ Features

* 🔐 **Login / Sign In** — Glassmorphism authentication interface
* 📝 **Sign Up / Registration** — Mock user registration flow
* 🔑 **Forgot Password** — Password recovery demonstration
* 👤 **Demo Authentication** — LocalStorage-based demo session
* 🛡️ **Protected Routes** — Authentication-based route protection
* 📊 **Security Dashboard** — Security posture overview and statistics
* 🚨 **Threat Monitoring** — Visual threat activity tracking
* 🔎 **Threat Search & Filtering** — Search and filter security events
* 🤖 **AI Security Analysis** — Interface for future AI-powered analysis
* 📈 **Risk & Security Scores** — Dynamic security score cards
* ⚠️ **Security Alerts** — Severity-based alert feed
* 📋 **Reports** — Compliance and security report interface
* 🕒 **Activity Timeline** — Simulated audit activity
* ⚙️ **Settings** — Platform configuration interface
* 📱 **Responsive Design** — Mobile-friendly layouts
* 🌙 **Premium Dark UI** — Midnight navy, lavender, and cyan visual system
* 💾 **LocalStorage State** — Persistent demo authentication state

---

## 🛠️ Technologies Used

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **React 18**        | Frontend UI development               |
| **Vite**            | Development and production build tool |
| **JavaScript**      | Application logic                     |
| **Tailwind CSS**    | Styling and responsive design         |
| **React Router v6** | Routing and protected routes          |
| **Recharts**        | Data visualization and charts         |
| **Lucide React**    | Modern SVG icons                      |
| **LocalStorage**    | Demo authentication/session state     |
| **Git & GitHub**    | Version control                       |
| **Vercel**          | Frontend deployment                   |

---

## 🏗️ Architecture

```text
                    User
                      │
                      ▼
              React Application
                      │
                      ▼
                React Router
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
       Pages                 Components
          │                       │
          └───────────┬───────────┘
                      ▼
              Mock Data + State
                      │
                      ▼
                 LocalStorage
```

### Current Architecture

This is currently a **frontend-only simulation**.

There is no production backend, database, or real authentication connected.

---

## 📄 Application Pages

| Route              | Description                     |
| ------------------ | ------------------------------- |
| `/login`           | Authentication entry point      |
| `/register`        | New user registration           |
| `/forgot-password` | Account recovery                |
| `/dashboard`       | Security metrics and overview   |
| `/threats`         | Threat monitoring and filtering |
| `/ai-analysis`     | AI security analysis interface  |
| `/security`        | Security posture breakdown      |
| `/reports`         | Compliance and security reports |
| `/activity`        | System activity and audit log   |
| `/settings`        | Platform configuration          |

---

## 🔐 Demo Login

Use these credentials to explore the dashboard:

```text
Email: admin@example.com
Password: admin123
```

> These credentials are for frontend demonstration only and do not provide access to real security data.

---

## 📁 Project Structure

```text
src/
├── components/
│   └── layout/
│       ├── AuthLayout.jsx
│       ├── Header.jsx
│       ├── MainLayout.jsx
│       └── Sidebar.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
│
├── pages/
│   ├── AIAnalysis.jsx
│   ├── Activity.jsx
│   ├── Dashboard.jsx
│   ├── ForgotPassword.jsx
│   ├── Login.jsx
│   ├── Placeholders.jsx
│   ├── Register.jsx
│   ├── Reports.jsx
│   ├── Security.jsx
│   ├── Settings.jsx
│   └── Threats.jsx
│
├── utils/
│   └── cn.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/ammaranwarr/cybersecurity-dashboard.git
```

Navigate into the project:

```bash
cd cybersecurity-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available locally through the Vite development server.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

The frontend is deployed using **Vercel**.

### Deployment Flow

```text
GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
  Production Build
       │
       ▼
   Live Dashboard
```

Every new commit pushed to the `main` branch can trigger a new Vercel deployment.

---

## 🔮 Future Improvements

* ⚡ **FastAPI Backend** — Replace mock data with real APIs
* 🗄️ **PostgreSQL Database** — Persistent users, threats, and logs
* 🔐 **Real Authentication** — JWT/OAuth2 authentication
* 🤖 **Real AI Threat Analysis** — AI-powered security assessment
* 🌐 **Real-Time Threat Intelligence** — WebSocket-based updates
* 🛡️ **SIEM/EDR Integration** — Connect real security platforms
* 👥 **Role-Based Access Control** — Admin, Analyst, and Viewer roles
* 📊 **Real Security Logs** — Elasticsearch/log ingestion
* 📧 **Email Notifications** — Critical threat alerts
* ☁️ **Cloud Infrastructure** — Production-ready cloud deployment

---

## ⚠️ Disclaimer

> **This is a frontend portfolio/demo project.**
> All cybersecurity data, threats, risk scores, alerts, and authentication processes are simulated. This application should **not** be used as a real cybersecurity monitoring or incident-response system.

---

## 👩‍💻 Author

**Ammara Anwar**

GitHub: **[@ammaranwarr](https://github.com/ammaranwarr)**

---

⭐ If you find this project interesting, feel free to explore the repository and live demo.
