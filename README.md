<div align="center">

# ✈️ Traveloop

### *Plan together. Travel smarter.*

**AI-powered collaborative trip planning for groups — powered by Google Gemini**

[![React Native](https://img.shields.io/badge/React%20Native-Expo-0ea5e9?style=flat-square&logo=expo)](https://expo.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-22c55e?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-4285f4?style=flat-square&logo=google)](https://makersuite.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Stack-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)

</div>

---

## 🌍 What is Traveloop?

Traveloop eliminates the chaos of group travel planning. Instead of juggling spreadsheets, group chats, and conflicting opinions — create a shared trip, answer a few smart AI-generated questions, and get a **complete day-by-day itinerary with cost estimates** in seconds.

Every member of the group sees the same plan in real time. No friction. No spreadsheets. Just travel.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Itinerary Generation** | Gemini AI crafts day-by-day plans with activities, timings, and cost breakdowns |
| 👥 **Group Collaboration** | Create a group, share an invite code — everyone plans together |
| 💬 **Smart Q&A Flow** | AI asks the right questions upfront (budget, vibe, interests) for a personalized plan |
| 🔄 **Day Regeneration** | Not happy with Day 3? Regenerate just that day with a custom instruction |
| 💰 **Budget Summary** | See estimated costs vs your budget at a glance |
| 🔐 **JWT Auth** | Secure signup/login with token-based authentication |
| 📱 **Cross-platform** | Runs on iOS, Android, and Web via Expo |

---

## 🏗️ Architecture

```
traveloop/
├── backend/               # Node.js + Express + TypeScript
│   └── src/
│       ├── routes/        # API route definitions
│       ├── controllers/   # Request handlers (auth, group, trip)
│       ├── models/        # Mongoose schemas
│       ├── middleware/    # JWT auth guard
│       ├── services/      # Gemini AI integration layer
│       ├── lib/           # Config, logger utilities
│       └── db/            # MongoDB connection
│
└── frontend/              # React Native (Expo) + TypeScript
    ├── app/               # Expo Router file-based screens
    └── src/
        ├── components/    # Reusable UI components
        ├── services/      # Typed API client
        ├── context/       # Auth context
        ├── store/         # App data context
        └── hooks/         # Custom React hooks
```

**Tech Stack:** React Native · Expo Router · Node.js · Express · MongoDB · Mongoose · JWT · Google Gemini API · TypeScript (end-to-end) · pnpm workspaces

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** — local install or [MongoDB Atlas](https://cloud.mongodb.com) (free tier works)
- **pnpm** — recommended (`npm install -g pnpm`) or use `npm`
- **Gemini API Key** — free at [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- **Expo Go** app on your phone (iOS/Android) — for live testing

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/traveloop.git
cd traveloop
```

---

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

> Using pnpm? Run `pnpm install` from the root (workspaces configured).

---

### 3. Configure Environment Variables

**Create `backend/.env`:**

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/traveloop
JWT_SECRET=your-super-secret-key-change-this
GEMINI_API_KEY=your-gemini-api-key-here

# Optional: OpenRouter for model fallback
OPENROUTER_API_KEY=
DEFAULT_MODEL=google/gemini-2.0-flash-001
```

**Create `frontend/.env`:**

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

> 📱 **On a physical device?** Replace `localhost` with your machine's local IP (e.g., `http://192.168.1.10:3000`). Find it with `ipconfig` (Windows) or `ifconfig` (Mac/Linux).

---

### 4. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use Atlas — just paste the connection string in MONGO_URL above
```

---

### 5. Run the Backend

```bash
cd backend
npm run dev
```

Server starts at `http://localhost:3000`. You should see:

```
[INFO] Connected to MongoDB
[INFO] Server running on port 3000
```

---

### 6. Run the Frontend

```bash
cd frontend
npx expo start
```

Then:
- **Physical device** → Scan the QR code with Expo Go
- **Android emulator** → Press `a`
- **iOS simulator** → Press `i`
- **Web browser** → Press `w`

---

## 🗺️ User Journey

```
Sign Up / Login
     │
     ▼
Create a Travel Group  ──►  Share Invite Code  ──►  Friends Join Group
     │
     ▼
Plan New Trip  ──►  AI Asks Smart Questions  ──►  Answer Together
     │
     ▼
Generate AI Itinerary
     │
     ▼
Day-by-Day Plan + Cost Breakdown  ──►  Regenerate Any Day  ──►  Travel!
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register with name, email, password |
| `POST` | `/api/auth/login` | Login, receive JWT token |
| `GET`  | `/api/auth/me` | Get current user profile *(auth required)* |

### Groups
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/groups/create` | Create a group (generates invite code) |
| `POST` | `/api/groups/join` | Join via invite code |
| `GET`  | `/api/groups/my` | List user's groups |
| `GET`  | `/api/groups/:id` | Get group details |

### Trips
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/trips/create` | Create trip + trigger AI question generation |
| `POST` | `/api/trips/submit-answers` | Submit Q&A answers → generate full itinerary |
| `POST` | `/api/trips/regenerate-day` | Regenerate a single day with custom instruction |
| `GET`  | `/api/trips/:groupId` | List all trips for a group |

---

## 🧠 How the AI Works

Traveloop uses a **two-phase AI flow**:

1. **Question Generation** — Gemini generates contextual planning questions (destination, budget, travel style, dietary needs, pace, etc.)
2. **Itinerary Generation** — Based on answers, Gemini produces a structured JSON plan with:
   - Day-by-day activities with time slots
   - Per-activity cost estimates
   - Total budget projection vs input budget
   - Accommodation & transport suggestions

The backend exposes a **day regeneration endpoint** — pass a `dayNumber` and a natural language `instruction` (e.g., *"more outdoor activities"* or *"budget-friendly restaurants only"*) and Gemini rewrites just that day.

---

## 🛠️ Development Notes

- Full TypeScript across backend and frontend
- pnpm workspaces monorepo structure
- Expo Router for file-based navigation (typed routes enabled)
- Winston-style structured logger in backend
- JWT middleware protects all group/trip routes
- MongoDB connection is fault-tolerant — server starts even if DB is unreachable

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">

Built with ❤️ for explorers who plan together

</div>
