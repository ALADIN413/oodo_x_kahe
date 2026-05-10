Replace your current README with this polished version 😄🔥
It’s optimized for:

* judges
* GitHub visitors
* recruiters
* hackathon presentation

Based on your actual codebase structure and features. 

````md
# 🌍 Traveloop — AI-Powered Collaborative Travel Planner

Traveloop is a collaborative AI travel planning platform built for hackathons using **React Native, Node.js, MongoDB, and Gemini AI**.

Instead of planning trips alone, users create groups, invite friends, and generate shared AI-powered itineraries together.

---

# ✨ Core Idea

```text
Create Group
→ Invite Friends
→ Enter Trip Preferences
→ AI Asks Smart Questions
→ Generate Full Timeline
→ Export Trip PDF
````

Traveloop combines:

* 🤝 collaborative planning
* 🧠 conversational AI
* 📅 itinerary generation
* 💰 budget estimation
* 📄 PDF export

into one clean travel experience.

---

# 🚀 Features

## 👥 Group-Based Planning

* Create travel groups
* Invite friends using invite code
* Shared trip planning experience
* Group members view same itinerary

---

## 🤖 AI Travel Assistant

Powered by Gemini / OpenRouter AI.

### AI Capabilities

* Generate full itineraries
* Ask follow-up planning questions
* Smart budget estimation
* Timeline generation
* Activity recommendations

Example:

```text
Need hotel recommendations?
Need restaurant suggestions?
Luxury or budget trip?
Family-friendly activities?
```

---

## 📅 Smart Itinerary Timeline

* Day-wise travel plan
* Activities with timings
* Cost estimation
* Travel recommendations
* Regenerate specific days

---

## 💰 Budget Planning

* Total estimated trip cost
* Per-day budget breakdown
* Activity-level costs
* Budget-conscious recommendations

---

## 📄 PDF Export

Export complete trip itinerary including:

* timeline
* activities
* budget
* recommendations
* group details

---

# 🛠 Tech Stack

## Frontend

* React Native
* Expo Router
* TypeScript

## Backend

* Node.js
* Express
* TypeScript

## Database

* MongoDB
* Mongoose

## AI

* Gemini API
* OpenRouter fallback models

## Authentication

* JWT Authentication

---

# 📂 Project Structure

```bash
backend/
  src/
    controllers/
    routes/
    models/
    middleware/
    services/
    db/

frontend/
  app/
  src/
    components/
    services/
    context/
    store/
```

---

# ⚡ Quick Start

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ALADIN413/oodo_x_kahe.git
cd oodo_x_kahe
```

---

# 🔧 Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

---

## Create `.env`

```env
PORT=3000

MONGO_URL=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Start Backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3000
```

---

# 📱 Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Create `.env`

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Start Expo

```bash
npx expo start
```

Then:

* scan QR using Expo Go
* or press `a` for Android emulator

---

# 🧠 AI Flow

Traveloop uses structured AI prompting.

## User Inputs

* destination
* dates
* budget
* interests
* travelers

## AI Then:

1. asks follow-up questions
2. understands preferences
3. generates structured itinerary JSON
4. creates timeline + budget summary

---

# 📡 API Endpoints

## Auth

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

---

## Groups

```http
POST /api/groups/create
POST /api/groups/join
GET  /api/groups/:id
```

---

## Trips

```http
POST /api/trips/create
POST /api/trips/generate-ai-plan
GET  /api/trips/:groupId
```

---

# 🎯 Hackathon Highlights

## ✅ AI-first UX

AI is integrated into the actual planning flow — not just a chatbot.

## ✅ Collaborative Planning

Groups are the core unit of the app.

## ✅ Structured AI Output

Reliable itinerary generation using JSON-based prompts.

## ✅ Exportable Travel Plans

Users can export polished trip PDFs.

## ✅ Full Stack Architecture

Complete frontend + backend + database integration.

---

# 📸 Demo Flow

```text
Signup/Login
→ Create Group
→ Invite Friends
→ Enter Trip Details
→ AI Questions
→ Generate Itinerary
→ Budget Summary
→ Export PDF
```

---

# 🔮 Future Scope

* Real-time collaboration
* Hotel booking integrations
* Maps integration
* Flight APIs
* Smart recommendations
* Offline itinerary access
* AI voice assistant

---

# 👨‍💻 Team

Built during a hackathon by passionate developers exploring:

* AI
* collaboration
* travel tech
* full-stack systems

---

# 📄 License

MIT License

```
```
