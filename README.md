# Traveloop - AI Travel Planning App

Traveloop is an AI-powered collaborative travel planning app where groups can create shared trips, invite members, and generate personalized itineraries using Gemini AI.

## Features

- **User Authentication** - Sign up and login with email/password
- **Group Management** - Create travel groups with shareable invite codes
- **Join Groups** - Join existing groups using invite codes
- **Trip Planning** - Set destination, dates, budget, headcount, and interests
- **AI Itinerary Generation** - Get day-by-day itineraries powered by Google Gemini AI
- **Budget Summary** - Clear breakdown of estimated costs vs budget
- **Group Collaboration** - All members see the same trip plans

## Tech Stack

- **Frontend**: React Native (Expo) + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **AI**: Google Gemini API

## Project Structure

```
backend/
  src/
    routes/        - API route definitions
    controllers/   - Request handlers
    models/        - Mongoose schemas
    middleware/    - Auth & validation
    services/      - Gemini AI integration
    lib/           - Config & utilities
    db/            - Database connection

frontend/
  app/             - Expo Router screens
  src/
    components/    - Reusable UI components
    services/      - API client
    context/       - Auth context
    store/         - App data context
    hooks/         - Custom hooks
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- pnpm (recommended) or npm

### 1. Clone and Install

```bash
git clone <repo-url>
cd traveloop

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

**backend/.env**
```
PORT=3000
MONGO_URL=mongodb://localhost:27017/traveloop
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

Get a Gemini API key from: https://makersuite.google.com/app/apikey

**frontend/.env**
```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start MongoDB

```bash
mongod
# or use MongoDB Atlas connection string in MONGO_URL
```

### 4. Run the Backend

```bash
cd backend
npm run dev
```

### 5. Run the Frontend

```bash
cd frontend
npx expo start
```

Scan the QR code with Expo Go app, or press `a` for Android emulator / `i` for iOS simulator.

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create account (name, email, password)
- `POST /api/auth/login` - Login (email, password)
- `GET /api/auth/me` - Get current user (requires auth)

### Groups
- `POST /api/groups/create` - Create group (name)
- `POST /api/groups/join` - Join group (inviteCode)
- `GET /api/groups/my` - List user's groups
- `GET /api/groups/:id` - Get group details

### Trips
- `POST /api/trips/create` - Create trip (groupId, destination, startDate, endDate, budget, interests, headcount)
- `POST /api/trips/generate-ai-plan` - Generate AI itinerary (tripId)
- `GET /api/trips/:groupId` - List trips for a group

## Demo Flow

1. Open the app and sign up
2. Create a travel group (invite code is auto-generated)
3. Share the invite code with others (they can join from the Join screen)
4. From the group page, tap "Plan New Trip"
5. Fill in destination, dates, budget, number of travelers, and interests
6. Tap "Generate AI Itinerary"
7. View the AI-generated day-by-day itinerary with activities, timings, and costs
8. Check the budget summary to see estimated total costs

## License

MIT
