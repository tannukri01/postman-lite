Set-Content -Path "README.md" -Value '# ⚡ Postman Lite

A lightweight, blazing-fast API testing and documentation tool built for modern developers. No bloat, no signup — just open and start testing APIs.
# ⚡ Postman Lite

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://postman-lite-app.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/tannukri01/postman-lite)

A lightweight, blazing-fast API testing and documentation tool...


![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-purple?style=flat-square)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-black?style=flat-square)
![Monaco](https://img.shields.io/badge/Monaco%20Editor-VS%20Code%20Experience-blue?style=flat-square)

## ✨ Why I Built This

Postman is heavy. For small projects and quick API tests, I wanted something:
- **Lightweight** — Opens instantly, no electron bloat
- **Beautiful** — Glass-morphism UI with dark mode
- **Smart** — Auto-generates API documentation
- **Persistent** — Collections save to localStorage

## 🚀 Features

| Feature | Status |
|---------|--------|
| 🔥 **7 HTTP Methods** | GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS |
| 🎨 **Monaco Editor** | VS Code-like JSON/XML editing with syntax highlighting |
| 📁 **Collections** | Group requests by project |
| 📝 **Auto Documentation** | One-click Markdown export |
| 🌙 **Dark Mode** | System-aware theme toggle |
| ⚡ **Real-time Response** | Status, time, size & headers |
| 💾 **Persistent State** | Zustand + localStorage |

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand (with persist middleware)
- **Editor:** Monaco Editor (VS Code''s engine)
- **Icons:** Lucide React



## 🏃 Quick Start

```bash
git clone https://github.com/tannukri01/postman-lite.git
cd postman-lite
npm install
npm run dev
