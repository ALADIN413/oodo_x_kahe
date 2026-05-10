# FILE: README.md

```md
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

```

# FILE: code.md

```md

```

# FILE: code.py

```py
import os

def dump_codebase(root_dir: str, output_file: str = "code.md"):
    extensions = {'.ts', '.tsx', '.js', '.jsx', '.json', '.py', '.yaml', '.yml', '.md', '.txt', '.env', '.example'}
    skip_dirs = {'node_modules', '.git', 'dist', 'build', '.expo', '__pycache__', '.next', 'coverage'}
    skip_files = {'pnpm-lock.yaml', 'package-lock.json', 'expo-env.d.ts'}

    with open(output_file, 'w', encoding='utf-8') as out:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            dirnames[:] = [d for d in dirnames if d not in skip_dirs]
            for filename in sorted(filenames):
                if filename in skip_files:
                    continue
                ext = os.path.splitext(filename)[1]
                if ext not in extensions:
                    continue
                filepath = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(filepath, root_dir)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    lang = ext.lstrip('.')
                    out.write(f"# FILE: {rel_path}\n\n")
                    out.write(f"```{lang}\n{content}\n```\n\n")
                except Exception as e:
                    out.write(f"# FILE: {rel_path}\n\n[Error reading file: {e}]\n\n")

    print(f"Done → {output_file}")

if __name__ == "__main__":
    dump_codebase(root_dir=".", output_file="code.md")

```

# FILE: package.json

```json
{
  "name": "traveloop",
  "version": "1.0.0",
  "private": true
}

```

# FILE: pnpm-workspace.yaml

```yaml
packages:
  - backend
  - frontend

```

# FILE: frontend/app.json

```json
{
  "expo": {
    "name": "Traveloop",
    "slug": "traveloop",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "traveloop",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "platforms": ["web", "android", "ios"],
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#4F46E5"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.traveloop.app"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#4F46E5"
      },
      "package": "com.traveloop.app"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}

```

# FILE: frontend/babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

```

# FILE: frontend/package.json

```json
{
  "name": "traveloop-frontend",
  "version": "1.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "2.2.0",
    "expo": "~54.0.33",
    "expo-file-system": "^55.0.19",
    "expo-font": "~14.0.10",
    "expo-linking": "~8.0.10",
    "expo-print": "^55.0.14",
    "expo-router": "~6.0.17",
    "expo-sharing": "^55.0.18",
    "expo-splash-screen": "~31.0.12",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-web": "~0.21.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~19.1.10",
    "babel-preset-expo": "~54.0.10",
    "typescript": "^5.7.0"
  }
}

```

# FILE: frontend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ],
  "extends": "expo/tsconfig.base"
}

```

# FILE: frontend/app/+not-found.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🗺️</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.sub}>This screen doesn't exist.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F8FAFC' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  sub: { fontSize: 15, color: '#64748B', marginBottom: 24 },
  button: { backgroundColor: '#4F46E5', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

```

# FILE: frontend/app/_layout.tsx

```tsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { AppDataProvider } from '../src/store/useStore';
import { ActivityIndicator, View } from 'react-native';

function RootLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
            <Stack.Screen name="create-group" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Create Group', headerBackTitle: 'Back' }} />
            <Stack.Screen name="join-group" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Join Group', headerBackTitle: 'Back' }} />
          </>
        )}
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <RootLayout />
      </AppDataProvider>
    </AuthProvider>
  );
}

```

# FILE: frontend/app/create-group.tsx

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppData } from '../src/store/useStore';
import { useColors } from '../src/hooks/useColors';

export default function CreateGroupScreen() {
  const { createGroup } = useAppData();
  const colors = useColors();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    setLoading(true);
    try {
      const group = await createGroup(name.trim());
      router.back();
      router.push(`/group/${group._id}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Create a Travel Group</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Give your group a name to start planning together
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Group Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Thailand Trip 2025"
          placeholderTextColor={colors.textSecondary}
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.6 : 1 }]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Group'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 20, borderWidth: 1, padding: 24, marginTop: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16 },
  button: { height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});

```

# FILE: frontend/app/join-group.tsx

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppData } from '../src/store/useStore';
import { useColors } from '../src/hooks/useColors';

export default function JoinGroupScreen() {
  const { joinGroup } = useAppData();
  const colors = useColors();
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }
    setLoading(true);
    try {
      const group = await joinGroup(inviteCode.trim().toUpperCase());
      router.back();
      router.push(`/group/${group._id}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to join group');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Join a Group</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter the invite code shared by your travel group
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Invite Code</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
          value={inviteCode}
          onChangeText={(t) => setInviteCode(t.toUpperCase())}
          placeholder="e.g. A1B2C3"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="characters"
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#8B5CF6', opacity: loading ? 0.6 : 1 }]}
          onPress={handleJoin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Joining...' : 'Join Group'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 20, borderWidth: 1, padding: 24, marginTop: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16, letterSpacing: 2 },
  button: { height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});

```

# FILE: frontend/app/(auth)/_layout.tsx

```tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

```

# FILE: frontend/app/(auth)/login.tsx

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useColors } from '../../src/hooks/useColors';

export default function LoginScreen() {
  const { login } = useAuth();
  const colors = useColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.brand, { color: colors.primary }]}>Traveloop</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>Plan trips together, powered by AI</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>

          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.6 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  brand: { fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  tagline: { fontSize: 15, marginTop: 8 },
  card: { borderRadius: 20, borderWidth: 1, padding: 24, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16 },
  button: { height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  link: { textAlign: 'center', fontSize: 14, fontWeight: '500' },
});

```

# FILE: frontend/app/(auth)/signup.tsx

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useColors } from '../../src/hooks/useColors';

export default function SignupScreen() {
  const { signup } = useAuth();
  const colors = useColors();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.brand, { color: colors.primary }]}>Traveloop</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>Start your journey together</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>

          <Text style={[styles.label, { color: colors.textSecondary }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.6 : 1 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Create Account'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  brand: { fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  tagline: { fontSize: 15, marginTop: 8 },
  card: { borderRadius: 20, borderWidth: 1, padding: 24, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16 },
  button: { height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  link: { textAlign: 'center', fontSize: 14, fontWeight: '500' },
});

```

# FILE: frontend/app/group/[id].tsx

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import { api } from '../../src/services/api';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const { fetchGroups } = useAppData();
  const colors = useColors();
  const [group, setGroup] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGroup() {
    try {
      const data = await api.getGroup(token!, id as string);
      setGroup(data.group);
      const tripData = await api.getTrips(token!, id as string);
      setTrips(tripData.trips);
    } catch { } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGroup();
  }, [id]);

  function copyCode() {
    if (group?.inviteCode) {
      Alert.alert('Invite Code', `Share this code: ${group.inviteCode}`);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!group) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Group not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <Text style={styles.heroTitle}>{group.name}</Text>
        <Text style={styles.heroSub}>{group.members.length} members</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.inviteCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={copyCode}>
          <Text style={[styles.inviteLabel, { color: colors.textSecondary }]}>Invite Code</Text>
          <Text style={[styles.inviteCode, { color: colors.primary }]}>{group.inviteCode}</Text>
          <Text style={[styles.tapHint, { color: colors.textSecondary }]}>Tap to share</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push(`/group/${id}/trip-setup`)}
          >
            <Text style={styles.actionBtnText}>Plan New Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderWidth: 1 }]}
            onPress={() => router.push(`/group/${id}/members`)}
          >
            <Text style={[styles.actionBtnText, { color: colors.text }]}>Members</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Trips</Text>

        {trips.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.emptyIcon}>🗺️</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No trips planned yet. Create one to get started!
            </Text>
          </View>
        ) : (
          trips.map((trip) => (
            <TouchableOpacity
              key={trip._id}
              style={[styles.tripCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => router.push(`/group/${id}/trip/${trip._id}`)}
            >
              <View style={styles.tripHeader}>
                <Text style={[styles.tripDest, { color: colors.text }]}>{trip.destination}</Text>
                {trip.aiPlanJson && <Text style={[styles.aiBadge, { backgroundColor: colors.primary + '20', color: colors.primary }]}>AI Ready</Text>}
              </View>
              <Text style={[styles.tripDates, { color: colors.textSecondary }]}>
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </Text>
              <Text style={[styles.tripBudget, { color: colors.textSecondary }]}>
                Budget: ${trip.budget?.toLocaleString()} • {trip.headcount} travelers
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hero: { padding: 32, paddingTop: 60, paddingBottom: 40 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  heroSub: { color: '#FFFFFFCC', fontSize: 15, marginTop: 4 },
  content: { padding: 16, marginTop: -20 },
  inviteCard: { borderRadius: 16, borderWidth: 1, padding: 20, alignItems: 'center', marginBottom: 20 },
  inviteLabel: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  inviteCode: { fontSize: 28, fontWeight: '800', letterSpacing: 3, marginTop: 8 },
  tapHint: { fontSize: 12, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  actionBtn: { flex: 1, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  actionBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  emptyCard: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  tripCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  tripDest: { fontSize: 17, fontWeight: '700' },
  aiBadge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  tripDates: { fontSize: 13, marginBottom: 4 },
  tripBudget: { fontSize: 13 },
});

```

# FILE: frontend/app/group/[id]/members.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { useColors } from '../../../src/hooks/useColors';
import { api } from '../../../src/services/api';

export default function MembersScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const colors = useColors();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getGroup(token!, id as string);
        setGroup(data.group);
      } catch { } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Group Members</Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {group?.members?.length || 0} {group?.members?.length === 1 ? 'member' : 'members'}
        </Text>
      </View>

      {group?.members?.map((member: any) => (
        <View key={member._id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{member.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
            <Text style={[styles.memberEmail, { color: colors.textSecondary }]}>{member.email}</Text>
          </View>
          {group.createdBy === member._id && (
            <View style={[styles.adminBadge, { backgroundColor: colors.warning + '20' }]}>
              <Text style={[styles.adminText, { color: colors.warning }]}>Admin</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  count: { fontSize: 14, marginTop: 4 },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: '600' },
  memberEmail: { fontSize: 13, marginTop: 2 },
  adminBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  adminText: { fontSize: 11, fontWeight: '700' },
});

```

# FILE: frontend/app/group/[id]/trip-setup.tsx

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { useAppData } from '../../../src/store/useStore';
import { useColors } from '../../../src/hooks/useColors';

interface ChatMessage {
  type: 'ai' | 'user';
  text: string;
  index?: number;
}

export default function TripSetupScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const { createTrip, submitAnswers } = useAppData();
  const colors = useColors();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'ai', text: "Hi! I'm your AI travel assistant. Let me ask you a few questions to plan the perfect trip! ✈️" },
  ]);
  const [questions, setQuestions] = useState<Array<{ question: string; answer: string }>>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [tripId, setTripId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [clarifying, setClarifying] = useState(false);

  useEffect(() => {
    initTrip();
  }, []);

  async function initTrip() {
    try {
      const trip = await createTrip({ groupId: id });
      setTripId(trip._id);
      setQuestions(trip.questions || []);
      if (trip.questions?.length > 0) {
        setMessages((prev) => [
          ...prev,
          { type: 'ai', text: trip.questions[0].question },
        ]);
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to start');
    } finally {
      setLoading(false);
    }
  }

  function scrollToBottom() {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function handleSend() {
    if (!answer.trim()) return;

    const qIdx = currentQ;
    const newMessages: ChatMessage[] = [
      ...messages,
      { type: 'user', text: answer.trim(), index: qIdx },
    ];

    if (qIdx + 1 < questions.length) {
      newMessages.push({ type: 'ai', text: questions[qIdx + 1].question });
    }

    setMessages(newMessages);
    setQuestions((prev) => prev.map((q, i) =>
      i === qIdx ? { ...q, answer: answer.trim() } : q
    ));
    setAnswer('');
    setCurrentQ(qIdx + 1);
    scrollToBottom();
  }

  async function handleClarify() {
    setClarifying(true);
    try {
      const allAnswered = questions.map((q) => q.answer || 'No answer').join(' | ');
      const clarifyMsg = `Based on your answers so far: ${allAnswered}\n\nCould you clarify or add anything? Type your response below.`;
      setMessages((prev) => [...prev, { type: 'ai', text: clarifyMsg }]);
      setQuestions((prev) => [...prev, { question: clarifyMsg, answer: '' }]);
      setCurrentQ(questions.length);
      scrollToBottom();
    } finally {
      setClarifying(false);
    }
  }

  async function handleGenerateReport() {
    const unanswered = questions.filter((q) => !q.answer.trim());
    if (unanswered.length > 0 && questions.length > 0) {
      Alert.alert('Hold on!', `Please answer all questions first. (${unanswered.length} remaining)`);
      return;
    }
    setGenerating(true);
    try {
      const answers = questions.map((q) => q.answer || '');
      const updatedTrip = await submitAnswers(tripId!, answers);
      router.replace(`/group/${id}/trip/${updatedTrip._id}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Preparing your questions...</Text>
      </View>
    );
  }

  const allDone = currentQ >= questions.length && questions.length > 0;

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.headerBar}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Trip Planner</Text>
        <Text style={[styles.headerSub, { color: colors.textSecondary }]}>
          Question {Math.min(currentQ + 1, questions.length)} of {questions.length}
        </Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubbleRow, msg.type === 'user' ? styles.userRow : styles.aiRow]}>
            {msg.type === 'ai' && <View style={[styles.avatar, { backgroundColor: colors.primary }]}><Text style={styles.avatarText}>🤖</Text></View>}
            <View style={[
              styles.bubble,
              msg.type === 'user'
                ? [styles.userBubble, { backgroundColor: colors.primary }]
                : [styles.aiBubble, { backgroundColor: colors.surface, borderColor: colors.border }],
            ]}>
              <Text style={[styles.bubbleText, { color: msg.type === 'user' ? '#FFF' : colors.text }]}>
                {msg.text}
              </Text>
            </View>
            {msg.type === 'user' && <View style={[styles.avatar, { backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderWidth: 1 }]}><Text style={styles.avatarText}>👤</Text></View>}
          </View>
        ))}
      </ScrollView>

      <View style={[styles.inputBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        {allDone ? (
          <View style={styles.doneRow}>
            <TouchableOpacity
              style={[styles.clarifyBtn, { borderColor: colors.border }]}
              onPress={handleClarify}
              disabled={clarifying}
            >
              <Text style={[styles.clarifyBtnText, { color: colors.textSecondary }]}>
                {clarifying ? '...' : '🤔 Clarify'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.generateBtn, { backgroundColor: colors.primary, opacity: generating ? 0.6 : 1 }]}
              onPress={handleGenerateReport}
              disabled={generating}
            >
              {generating ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.generateBtnText}>✨ Generate Report</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Type your answer..."
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity style={[styles.sendBtn, { backgroundColor: colors.primary }]} onPress={handleSend}>
              <Text style={styles.sendBtnText}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 15 },
  headerBar: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: '800' },
  headerSub: { fontSize: 12, marginTop: 2 },
  chatArea: { flex: 1 },
  chatContent: { padding: 16, paddingTop: 8, paddingBottom: 8 },
  bubbleRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-end' },
  userRow: { justifyContent: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },
  avatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginHorizontal: 6 },
  avatarText: { fontSize: 14 },
  bubble: { maxWidth: '78%', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  userBubble: { borderBottomRightRadius: 4 },
  aiBubble: { borderBottomLeftRadius: 4, borderWidth: 1 },
  bubbleText: { fontSize: 15, lineHeight: 21 },
  inputBar: { borderTopWidth: 1, padding: 12, paddingBottom: 24 },
  inputRow: { flexDirection: 'row', gap: 8 },
  textInput: { flex: 1, height: 46, borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, fontSize: 15 },
  sendBtn: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  doneRow: { flexDirection: 'row', gap: 10 },
  clarifyBtn: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  clarifyBtnText: { fontSize: 14, fontWeight: '600' },
  generateBtn: { flex: 2, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  generateBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

```

# FILE: frontend/app/group/[id]/trip/[tripId].tsx

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Modal, Alert, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useAuth } from '../../../../src/context/AuthContext';
import { useAppData } from '../../../../src/store/useStore';
import { useColors } from '../../../../src/hooks/useColors';
import { api } from '../../../../src/services/api';
import ItineraryCard from '../../../../src/components/ItineraryCard';
import BudgetSummary from '../../../../src/components/BudgetSummary';

export default function TripDetailScreen() {
  const { id, tripId } = useLocalSearchParams();
  const { token } = useAuth();
  const { regenerateDay } = useAppData();
  const colors = useColors();

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState<number | null>(null);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [regenDay, setRegenDay] = useState(1);
  const [regenInstruction, setRegenInstruction] = useState('');

  async function loadTrip() {
    try {
      const result = await api.getTrips(token!, id as string);
      const found = (result.trips || []).find((t: any) => t._id === tripId);
      setTrip(found || null);
    } catch { } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  async function handleRegenerateDay() {
    if (!regenInstruction.trim()) {
      Alert.alert('Error', 'Please describe what you want to change');
      return;
    }
    setRegenerating(regenDay);
    setShowRegenModal(false);
    try {
      const updated = await regenerateDay(tripId as string, regenDay, regenInstruction);
      setTrip(updated);
      Alert.alert('Done!', `Day ${regenDay} has been updated.`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to regenerate day');
    } finally {
      setRegenerating(null);
    }
  }

  async function handleExportPDF() {
    if (!trip?.aiPlanJson) return;

    const plan = trip.aiPlanJson;
    const daysHtml = (plan.days || []).map((day: any) => `
      <div style="page-break-inside: avoid; margin-bottom: 24px; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
        <h2 style="color: #4F46E5; margin: 0 0 4px; font-size: 20px;">Day ${day.day}</h2>
        <p style="color: #64748b; margin: 0 0 12px; font-size: 14px;">📍 ${day.city}</p>
        ${(day.activities || []).map((a: any) => `
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <div>
              <span style="color: #4F46E5; font-weight: 600; font-size: 13px;">${a.time}</span>
              <p style="margin: 2px 0 0; font-weight: 600; font-size: 15px;">${a.activity}</p>
              <p style="margin: 2px 0 0; color: #64748b; font-size: 13px;">${a.description}</p>
            </div>
            <span style="color: #64748b; font-weight: 600;">$${a.cost}</span>
          </div>
        `).join('')}
      </div>
    `).join('');

    const destName = trip.destination ? trip.destination.replace(/\s+/g, '_') : 'Trip';
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, sans-serif; padding: 24px; color: #0f172a; }
            h1 { color: #4F46E5; font-size: 28px; margin: 0; }
            .sub { color: #64748b; font-size: 14px; margin: 4px 0 24px; }
            .meta { display: flex; gap: 16px; margin-bottom: 20px; }
            .meta-item { color: #64748b; font-size: 13px; }
            .total { font-size: 18px; font-weight: 700; color: #10B981; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>${trip.destination || 'Trip Itinerary'}</h1>
          <p class="sub">${plan.days?.length || 0} day itinerary</p>
          <div class="meta">
            <span class="meta-item">👥 ${trip.headcount || '?'} travelers</span>
            <span class="meta-item">💰 $${trip.budget?.toLocaleString() || '?'}</span>
          </div>
          ${daysHtml}
          <p class="total">Total Estimated Cost: $${plan.totalCost || 0}</p>
          ${plan.notes ? `<p style="color: #64748b; font-size: 13px; margin-top: 16px;">${plan.notes}</p>` : ''}
          <p style="color: #94a3b8; font-size: 11px; margin-top: 32px; text-align: center;">Generated by Traveloop AI</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      const pdfName = `${destName}_Itinerary.pdf`;

      if (Platform.OS === 'android') {
        const dest = `${FileSystem.cacheDirectory}${pdfName}`;
        await FileSystem.moveAsync({ from: uri, to: dest });
        const contentUri = await FileSystem.getContentUriAsync(dest);
        await Sharing.shareAsync(contentUri, { mimeType: 'application/pdf' });
      } else {
        const dest = `${FileSystem.documentDirectory}${pdfName}`;
        await FileSystem.moveAsync({ from: uri, to: dest });
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(dest);
        } else {
          Alert.alert('PDF Saved', `Saved to: ${dest}`);
        }
      }
    } catch (e: any) {
      Alert.alert('Export', 'Use share/save to download the PDF');
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Trip not found</Text>
      </View>
    );
  }

  const plan = trip.aiPlanJson;
  const hasAiPlan = plan?.days?.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadTrip} />}
      >
        <View style={styles.tripHeader}>
          <Text style={[styles.destination, { color: colors.text }]}>{trip.destination}</Text>
          <Text style={[styles.dates, { color: colors.textSecondary }]}>
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </Text>
          <View style={styles.meta}>
            <Text style={[styles.metaItem, { color: colors.textSecondary }]}>👥 {trip.headcount} travelers</Text>
            <Text style={[styles.metaItem, { color: colors.textSecondary }]}>💰 ${trip.budget?.toLocaleString()} budget</Text>
          </View>
          {trip.interests?.length > 0 && (
            <View style={styles.interestRow}>
              {trip.interests.map((i: string) => (
                <View key={i} style={[styles.interestBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.interestText, { color: colors.primary }]}>{i}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {!hasAiPlan ? (
          <View style={[styles.genCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.genIcon}>🤖</Text>
            <Text style={[styles.genTitle, { color: colors.text }]}>No itinerary yet</Text>
            <Text style={[styles.genSub, { color: colors.textSecondary }]}>
              Go back to the trip setup and complete the AI questions to generate your personalized itinerary.
            </Text>
            <TouchableOpacity
              style={[styles.genButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push(`/group/${id}/trip-setup`)}
            >
              <Text style={styles.genButtonText}>Back to Setup</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <BudgetSummary
              totalCost={plan.totalCost || 0}
              budget={trip.budget}
              currency={plan.currency || 'USD'}
              notes={plan.notes}
            />

            {plan.budgetBreakdown && (
              <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Budget Breakdown</Text>
                {Object.entries(plan.budgetBreakdown).map(([key, val]: any) => (
                  <View key={key} style={styles.breakdownRow}>
                    <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <Text style={[styles.breakdownVal, { color: colors.text }]}>${val}</Text>
                  </View>
                ))}
              </View>
            )}

            {plan.recommendations && (
              <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Recommendations</Text>
                {plan.recommendations.hotel && (
                  <View style={styles.recItem}>
                    <Text style={styles.recIcon}>🏨</Text>
                    <View style={styles.recContent}>
                      <Text style={[styles.recLabel, { color: colors.textSecondary }]}>Hotel</Text>
                      <Text style={[styles.recText, { color: colors.text }]}>{plan.recommendations.hotel}</Text>
                    </View>
                  </View>
                )}
                {plan.recommendations.restaurants?.length > 0 && (
                  <View style={styles.recItem}>
                    <Text style={styles.recIcon}>🍽️</Text>
                    <View style={styles.recContent}>
                      <Text style={[styles.recLabel, { color: colors.textSecondary }]}>Restaurants</Text>
                      {plan.recommendations.restaurants.map((r: string, i: number) => (
                        <Text key={i} style={[styles.recText, { color: colors.text }]}>• {r}</Text>
                      ))}
                    </View>
                  </View>
                )}
                {plan.recommendations.transportTips && (
                  <View style={styles.recItem}>
                    <Text style={styles.recIcon}>🚗</Text>
                    <View style={styles.recContent}>
                      <Text style={[styles.recLabel, { color: colors.textSecondary }]}>Transport</Text>
                      <Text style={[styles.recText, { color: colors.text }]}>{plan.recommendations.transportTips}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}

            {plan.days.map((day: any) => (
              <View key={day.day}>
                <ItineraryCard {...day} />
                <TouchableOpacity
                  style={[styles.regenBtn, { borderColor: colors.border }]}
                  onPress={() => { setRegenDay(day.day); setRegenInstruction(''); setShowRegenModal(true); }}
                  disabled={regenerating === day.day}
                >
                  {regenerating === day.day ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <>
                      <Text style={[styles.regenIcon]}>🔄</Text>
                      <Text style={[styles.regenText, { color: colors.primary }]}>Regenerate Day {day.day}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.exportBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={handleExportPDF}
            >
              <Text style={styles.exportIcon}>📄</Text>
              <Text style={[styles.exportText, { color: colors.primary }]}>Export PDF</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <Modal visible={showRegenModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Regenerate Day {regenDay}</Text>
            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>Tell the AI what to change</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
              value={regenInstruction}
              onChangeText={setRegenInstruction}
              placeholder="e.g. Add more adventure activities"
              placeholderTextColor={colors.textSecondary}
              multiline
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderWidth: 1 }]}
                onPress={() => setShowRegenModal(false)}
              >
                <Text style={[styles.modalBtnText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleRegenerateDay}
              >
                <Text style={[styles.modalBtnText, { color: '#FFF' }]}>Regenerate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  tripHeader: { marginBottom: 20 },
  destination: { fontSize: 28, fontWeight: '800' },
  dates: { fontSize: 14, marginTop: 4 },
  meta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  metaItem: { fontSize: 13 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  interestBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  interestText: { fontSize: 12, fontWeight: '600' },
  card: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  breakdownLabel: { fontSize: 14 },
  breakdownVal: { fontSize: 14, fontWeight: '600' },
  recItem: { flexDirection: 'row', marginBottom: 14 },
  recIcon: { fontSize: 20, marginRight: 10, marginTop: 2 },
  recContent: { flex: 1 },
  recLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 2 },
  recText: { fontSize: 14, lineHeight: 20 },
  genCard: { borderRadius: 20, borderWidth: 1, padding: 32, alignItems: 'center' },
  genIcon: { fontSize: 48, marginBottom: 16 },
  genTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  genSub: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  genButton: { height: 50, borderRadius: 14, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' },
  genButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  regenBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderWidth: 1, borderRadius: 12, marginBottom: 16, marginTop: -8 },
  regenIcon: { fontSize: 14, marginRight: 6 },
  regenText: { fontSize: 13, fontWeight: '600' },
  exportBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 16, borderWidth: 1, marginBottom: 20 },
  exportIcon: { fontSize: 18, marginRight: 8 },
  exportText: { fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000060' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  modalSub: { fontSize: 14, marginBottom: 20 },
  modalInput: { borderRadius: 14, borderWidth: 1, padding: 14, fontSize: 16, minHeight: 80, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 20 },
  modalBtn: { flex: 1, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  modalBtnText: { fontSize: 16, fontWeight: '600' },
});

```

# FILE: frontend/app/group/[id]/trip/[tripId]/follow-up.tsx

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../../../src/context/AuthContext';
import { useAppData } from '../../../../../src/store/useStore';
import { useColors } from '../../../../../src/hooks/useColors';

export default function FollowUpQuestionsScreen() {
  const { id, tripId } = useLocalSearchParams();
  const { token } = useAuth();
  const { generateQuestions, submitAnswers } = useAppData();
  const colors = useColors();

  const [questions, setQuestions] = useState<Array<{ question: string; answer: string }>>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const data = await generateQuestions(tripId as string);
      setQuestions(data.questions || []);
      setAnswers(new Array((data.questions || []).length).fill(''));
    } catch {
      setQuestions([
        { question: 'What type of accommodation do you prefer? (hotel, hostel, resort, Airbnb)', answer: '' },
        { question: 'Do you want sightseeing-heavy days or a more relaxed pace?', answer: '' },
        { question: 'Any specific cuisines you want to try?', answer: '' },
      ]);
      setAnswers(['', '', '']);
    } finally {
      setLoading(false);
    }
  }

  function setAnswer(index: number, value: string) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  async function handleSubmit() {
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i].trim()) {
        Alert.alert('Answer Required', `Please answer question ${i + 1}`);
        return;
      }
    }
    setSubmitting(true);
    try {
      await submitAnswers(tripId as string, answers);
      router.replace(`/group/${id}/trip/${tripId}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to generate itinerary');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          AI is crafting questions...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.aiIcon]}>🤖</Text>
          <Text style={[styles.title, { color: colors.text }]}>A Few Quick Questions</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help me personalize your perfect itinerary
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {questions.map((q, i) => (
            <View key={i} style={[styles.qBlock, i < questions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 16, marginBottom: 16 }]}>
              <View style={styles.qHeader}>
                <View style={[styles.qNum, { backgroundColor: colors.primary }]}>
                  <Text style={styles.qNumText}>{i + 1}</Text>
                </View>
                <Text style={[styles.qText, { color: colors.text }]}>{q.question}</Text>
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
                value={answers[i]}
                onChangeText={(v) => setAnswer(i, v)}
                placeholder="Your answer..."
                placeholderTextColor={colors.textSecondary}
                multiline
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary, opacity: submitting ? 0.6 : 1 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? 'Generating Your Itinerary...' : 'Generate My Itinerary ✨'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16 },
  loadingText: { marginTop: 16, fontSize: 15 },
  header: { alignItems: 'center', marginTop: 16, marginBottom: 24 },
  aiIcon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 14, marginTop: 6, textAlign: 'center', lineHeight: 20 },
  card: { borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 20 },
  qBlock: {},
  qHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  qNum: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 1 },
  qNumText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  qText: { flex: 1, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  input: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, minHeight: 48 },
  button: { height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});

```

# FILE: frontend/app/(tabs)/_layout.tsx

```tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { useColors } from '../../src/hooks/useColors';
import { Text } from 'react-native';

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👥</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}

```

# FILE: frontend/app/(tabs)/groups.tsx

```tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import GroupCard from '../../src/components/GroupCard';

export default function GroupsScreen() {
  const { groups, fetchGroups, loading } = useAppData();
  const colors = useColors();

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGroups} />}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>All Groups</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/create-group')}>
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: '#8B5CF6', marginLeft: 8 }]} onPress={() => router.push('/join-group')}>
            <Text style={styles.btnText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      {groups.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No groups yet. Create your first travel group!
          </Text>
        </View>
      ) : (
        groups.map((group) => (
          <GroupCard
            key={group._id}
            name={group.name}
            memberCount={group.members.length}
            inviteCode={group.inviteCode}
            onPress={() => router.push(`/group/${group._id}`)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  actions: { flexDirection: 'row' },
  smallBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  emptyCard: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});

```

# FILE: frontend/app/(tabs)/index.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import GroupCard from '../../src/components/GroupCard';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { groups, fetchGroups, loading } = useAppData();
  const colors = useColors();

  useEffect(() => {
    fetchGroups();
  }, []);

  const myGroups = groups.slice(0, 5);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGroups} />}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/create-group')}
        >
          <Text style={styles.actionIcon}>🚀</Text>
          <Text style={styles.actionTitle}>Create Group</Text>
          <Text style={styles.actionSub}>Start a new trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#8B5CF6' }]}
          onPress={() => router.push('/join-group')}
        >
          <Text style={styles.actionIcon}>🔗</Text>
          <Text style={styles.actionTitle}>Join Group</Text>
          <Text style={styles.actionSub}>Use invite code</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Groups</Text>

      {myGroups.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emptyIcon}>✈️</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No groups yet. Create or join one to start planning!
          </Text>
        </View>
      ) : (
        myGroups.map((group) => (
          <GroupCard
            key={group._id}
            name={group.name}
            memberCount={group.members.length}
            inviteCode={group.inviteCode}
            onPress={() => router.push(`/group/${group._id}`)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 24, marginTop: 8 },
  greeting: { fontSize: 15 },
  name: { fontSize: 28, fontWeight: '800', marginTop: 2 },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  actionCard: { flex: 1, borderRadius: 16, padding: 20 },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  actionSub: { color: '#FFFFFFCC', fontSize: 12, marginTop: 2 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  emptyCard: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});

```

# FILE: frontend/app/(tabs)/profile.tsx

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useColors } from '../../src/hooks/useColors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colors = useColors();

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => { logout(); router.replace('/(auth)/login'); } },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Account</Text>
        <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]}>
          <Text style={[styles.rowText, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={handleLogout}>
          <Text style={[styles.rowText, { color: colors.error }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.version, { color: colors.textSecondary }]}>Traveloop v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { color: '#FFFFFF', fontSize: 32, fontWeight: '700' },
  name: { fontSize: 24, fontWeight: '700' },
  email: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: 16, borderWidth: 1, padding: 20 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  row: { paddingVertical: 14, borderBottomWidth: 1 },
  rowText: { fontSize: 15, fontWeight: '500' },
  version: { textAlign: 'center', marginTop: 40, fontSize: 12 },
});

```

# FILE: frontend/src/hooks/useColors.ts

```ts
import { useColorScheme } from 'react-native';

export function useColors() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    background: isDark ? '#0F172A' : '#F8FAFC',
    surface: isDark ? '#1E293B' : '#FFFFFF',
    surfaceAlt: isDark ? '#334155' : '#F1F5F9',
    text: isDark ? '#F1F5F9' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    cardShadow: isDark ? '#00000040' : '#00000010',
  };
}

```

# FILE: frontend/src/services/api.ts

```ts
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function request(path: string, options: RequestInit = {}) {
  const url = `${API_URL}/api${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function authRequest(path: string, token: string, options: RequestInit = {}) {
  return request(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

export const api = {
  signup: (name: string, email: string, password: string) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getMe: (token: string) => authRequest('/auth/me', token),

  createGroup: (token: string, name: string) =>
    authRequest('/groups/create', token, { method: 'POST', body: JSON.stringify({ name }) }),

  joinGroup: (token: string, inviteCode: string) =>
    authRequest('/groups/join', token, { method: 'POST', body: JSON.stringify({ inviteCode }) }),

  getGroup: (token: string, id: string) => authRequest(`/groups/${id}`, token),

  getMyGroups: (token: string) => authRequest('/groups/my', token),

  createTrip: (token: string, data: any) =>
    authRequest('/trips/create', token, { method: 'POST', body: JSON.stringify(data) }),

  submitAnswers: (token: string, tripId: string, answers: string[]) =>
    authRequest('/trips/submit-answers', token, { method: 'POST', body: JSON.stringify({ tripId, answers }) }),

  regenerateDay: (token: string, tripId: string, dayNumber: number, instruction: string) =>
    authRequest('/trips/regenerate-day', token, { method: 'POST', body: JSON.stringify({ tripId, dayNumber, instruction }) }),

  getTrips: (token: string, groupId: string) => authRequest(`/trips/${groupId}`, token),
};

```

# FILE: frontend/src/context/AuthContext.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const stored = await AsyncStorage.getItem('traveloop_auth');
      if (stored) {
        const { token: t, user: u } = JSON.parse(stored);
        setToken(t);
        setUser(u);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function saveAuth(t: string, u: User) {
    await AsyncStorage.setItem('traveloop_auth', JSON.stringify({ token: t, user: u }));
    setToken(t);
    setUser(u);
  }

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const data = await api.signup(name, email, password);
    await saveAuth(data.token, data.user);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.login(email, password);
    await saveAuth(data.token, data.user);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('traveloop_auth');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

```

# FILE: frontend/src/components/BudgetSummary.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';

interface BudgetSummaryProps {
  totalCost: number;
  budget: number;
  currency: string;
  notes?: string;
}

export default function BudgetSummary({ totalCost, budget, currency, notes }: BudgetSummaryProps) {
  const colors = useColors();
  const percentage = Math.min((totalCost / budget) * 100, 100);
  const remaining = budget - totalCost;
  const isOver = remaining < 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Budget Summary</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Total Budget</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {currency} {budget.toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Estimated Cost</Text>
        <Text style={[styles.value, { color: isOver ? colors.error : colors.success }]}>
          {currency} {totalCost.toLocaleString()}
        </Text>
      </View>

      <View style={[styles.bar, { backgroundColor: colors.surfaceAlt }]}>
        <View
          style={[
            styles.fill,
            {
              backgroundColor: isOver ? colors.error : colors.success,
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {isOver ? 'Over budget by' : 'Remaining'}
        </Text>
        <Text style={[styles.value, { color: isOver ? colors.error : colors.success, fontWeight: '700' }]}>
          {isOver ? '-' : ''}{currency} {Math.abs(remaining).toLocaleString()}
        </Text>
      </View>

      {notes && (
        <Text style={[styles.notes, { color: colors.textSecondary }]}>{notes}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  bar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  notes: {
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
});

```

# FILE: frontend/src/components/GroupCard.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '../hooks/useColors';

interface GroupCardProps {
  name: string;
  memberCount: number;
  inviteCode: string;
  onPress: () => void;
  onShare?: () => void;
}

export default function GroupCard({ name, memberCount, inviteCode, onPress, onShare }: GroupCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.top}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{name}</Text>
          <Text style={[styles.members, { color: colors.textSecondary }]}>
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </Text>
        </View>
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.codeLabel, { color: colors.textSecondary }]}>Code: </Text>
        <Text style={[styles.code, { color: colors.primary }]}>{inviteCode}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  members: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  codeLabel: {
    fontSize: 12,
  },
  code: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

```

# FILE: frontend/src/components/ItineraryCard.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';

interface Activity {
  time: string;
  activity: string;
  description: string;
  cost: number;
  category: string;
}

interface DayPlan {
  day: number;
  city: string;
  activities: Activity[];
}

export default function ItineraryCard({ day, city, activities }: DayPlan) {
  const colors = useColors();

  const categoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      food: '🍽️',
      transport: '🚗',
      attraction: '🎯',
      shopping: '🛍️',
      other: '📌',
    };
    return icons[cat] || '📌';
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.dayBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.dayNumber}>{day}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>DAY {day}</Text>
          <Text style={[styles.cityName, { color: colors.text }]}>{city}</Text>
        </View>
      </View>

      {activities.map((activity, index) => (
        <View
          key={index}
          style={[styles.activity, index < activities.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
        >
          <View style={styles.activityHeader}>
            <Text style={[styles.time, { color: colors.primary }]}>{activity.time}</Text>
            <Text style={[styles.costBadge, { backgroundColor: colors.surfaceAlt, color: colors.textSecondary }]}>
              ${activity.cost}
            </Text>
          </View>
          <View style={styles.activityBody}>
            <Text style={styles.categoryIcon}>{categoryIcon(activity.category)}</Text>
            <View style={styles.activityText}>
              <Text style={[styles.activityName, { color: colors.text }]}>{activity.activity}</Text>
              <Text style={[styles.activityDesc, { color: colors.textSecondary }]}>{activity.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  dayBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  activity: {
    padding: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontSize: 13,
    fontWeight: '700',
  },
  costBadge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  activityBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  activityText: {
    flex: 1,
  },
  activityName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});

```

# FILE: frontend/src/components/LoadingOverlay.tsx

```tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useColors } from '../hooks/useColors';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export default function LoadingOverlay({ visible, message = 'Generating your itinerary...' }: LoadingOverlayProps) {
  const colors = useColors();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.background + 'CC' }]}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>
            Our AI is planning the perfect trip...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  message: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  sub: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});

```

# FILE: frontend/src/store/useStore.tsx

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Group {
  _id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  members: any[];
  createdAt: string;
}

interface Trip {
  _id: string;
  groupId: string;
  destination?: string;
  questions?: Array<{ question: string; answer: string }>;
  aiPlanJson?: any;
  createdAt: string;
}

interface AppDataContextType {
  groups: Group[];
  loading: boolean;
  fetchGroups: () => Promise<void>;
  createGroup: (name: string) => Promise<Group>;
  joinGroup: (inviteCode: string) => Promise<Group>;
  createTrip: (data: any) => Promise<Trip>;
  submitAnswers: (tripId: string, answers: string[]) => Promise<Trip>;
  regenerateDay: (tripId: string, dayNumber: number, instruction: string) => Promise<Trip>;
  getTrips: (groupId: string) => Promise<Trip[]>;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await api.getMyGroups(token);
      setGroups(data.groups);
    } catch { } finally {
      setLoading(false);
    }
  }, [token]);

  const createGroup = useCallback(async (name: string) => {
    const data = await api.createGroup(token!, name);
    setGroups((prev) => [data.group, ...prev]);
    return data.group;
  }, [token]);

  const joinGroup = useCallback(async (inviteCode: string) => {
    const data = await api.joinGroup(token!, inviteCode);
    setGroups((prev) => [data.group, ...prev]);
    return data.group;
  }, [token]);

  const createTrip = useCallback(async (tripData: any) => {
    const data = await api.createTrip(token!, tripData);
    return data.trip;
  }, [token]);

  const submitAnswers = useCallback(async (tripId: string, answers: string[]) => {
    const data = await api.submitAnswers(token!, tripId, answers);
    return data.trip;
  }, [token]);

  const regenerateDay = useCallback(async (tripId: string, dayNumber: number, instruction: string) => {
    const data = await api.regenerateDay(token!, tripId, dayNumber, instruction);
    return data.trip;
  }, [token]);

  const getTrips = useCallback(async (groupId: string) => {
    const data = await api.getTrips(token!, groupId);
    return data.trips;
  }, [token]);

  return (
    <AppDataContext.Provider value={{
      groups, loading, fetchGroups, createGroup, joinGroup, createTrip,
      submitAnswers, regenerateDay, getTrips,
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

```

# FILE: backend/.env.example

```example
PORT=3000
MONGO_URL=mongodb://localhost:27017/traveloop
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here

```

# FILE: backend/package.json

```json
{
  "name": "traveloop-backend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "^3.0.0",
    "@types/cors": "^2.8.19",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^22.0.0",
    "@types/qs": "^6.15.1",
    "tsx": "^4.21.0",
    "typescript": "^5.7.0"
  }
}

```

# FILE: backend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

```

# FILE: backend/src/app.ts

```ts
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

export default app;

```

# FILE: backend/src/index.ts

```ts
import app from './app.js';
import { connectDB } from './db/mongo.js';
import { config } from './lib/config.js';
import { logger } from './lib/logger.js';

async function start() {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Traveloop API running on port ${config.port}`);
  });
}

start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});

```

# FILE: backend/src/models/group.model.ts

```ts
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  inviteCode: { type: String, required: true, unique: true, uppercase: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export const Group = mongoose.model('Group', groupSchema);

```

# FILE: backend/src/models/trip.model.ts

```ts
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
  destination: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true, min: 0 },
  interests: [{ type: String, trim: true }],
  headcount: { type: Number, required: true, min: 1 },
  tripType: { type: String, enum: ['adventure', 'relaxation', 'cultural', 'family', 'romantic', 'business', 'other'], default: 'other' },
  constraints: {
    vegetarian: { type: Boolean, default: false },
    kids: { type: Boolean, default: false },
    seniors: { type: Boolean, default: false },
    luxury: { type: Boolean, default: false },
    publicTransport: { type: Boolean, default: false },
  },
  questions: [{ question: String, answer: String }],
  aiPrompt: { type: String },
  aiPlanJson: { type: mongoose.Schema.Types.Mixed },
  recommendations: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export const Trip = mongoose.model('Trip', tripSchema);

```

# FILE: backend/src/models/user.model.ts

```ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: '' },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

```

# FILE: backend/src/routes/auth.ts

```ts
import { Router } from 'express';
import { signupSchema, loginSchema, validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { signup, login, getMe } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);

export default router;

```

# FILE: backend/src/routes/groups.ts

```ts
import { Router } from 'express';
import { createGroupSchema, joinGroupSchema, validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { createGroup, joinGroup, getGroup, getUserGroups } from '../controllers/group.controller.js';

const router = Router();

router.post('/create', authMiddleware, validate(createGroupSchema), createGroup);
router.post('/join', authMiddleware, validate(joinGroupSchema), joinGroup);
router.get('/my', authMiddleware, getUserGroups);
router.get('/:id', authMiddleware, getGroup);

export default router;

```

# FILE: backend/src/routes/index.ts

```ts
import { Router } from 'express';
import authRoutes from './auth.js';
import groupRoutes from './groups.js';
import tripRoutes from './trips.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/trips', tripRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;

```

# FILE: backend/src/routes/trips.ts

```ts
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { createTrip, submitAnswers, regenerateDayForTrip, getTripsByGroup } from '../controllers/trip.controller.js';

const createTripSchema = z.object({
  groupId: z.string(),
});

const submitAnswersSchema = z.object({
  tripId: z.string(),
  answers: z.array(z.string()),
});

const regenerateDaySchema = z.object({
  tripId: z.string(),
  dayNumber: z.number(),
  instruction: z.string().min(1),
});

const router = Router();

router.post('/create', authMiddleware, validate(createTripSchema), createTrip);
router.post('/submit-answers', authMiddleware, validate(submitAnswersSchema), submitAnswers);
router.post('/regenerate-day', authMiddleware, validate(regenerateDaySchema), regenerateDayForTrip);
router.get('/:groupId', authMiddleware, getTripsByGroup);

export default router;

```

# FILE: backend/src/services/gemini.service.ts

```ts
import { config } from '../lib/config.js';
import { logger } from '../lib/logger.js';

class AiError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'AiError';
  }
}

async function callModel(model: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const url = `${config.openrouterBaseUrl}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openrouterApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new AiError(`Model ${model} failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  return text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
}

async function tryModels(systemPrompt: string, userPrompt: string): Promise<string> {
  const errors: string[] = [];

  for (const model of config.models) {
    try {
      const result = await callModel(model, systemPrompt, userPrompt);
      if (result) return result;
      errors.push(`${model}: empty response`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${model}: ${msg}`);
      logger.warn(`Model failed, trying next`, { model, error: msg });
    }
  }

  throw new AiError(`All AI models failed:\n${errors.join('\n')}`);
}

const QUESTIONS_SYSTEM_PROMPT = `You are a smart travel planning assistant. Your job is to ask ALL necessary questions to plan a complete group trip from scratch. Respond with ONLY a valid JSON array of 10-15 questions. No other text. No markdown.`;

const QUESTIONS_USER_PROMPT = `Generate 10-15 comprehensive questions to plan a group trip from scratch. Cover ALL these topics:
1. Destination & travel dates
2. Total budget and currency
3. Number of travelers and their ages
4. Trip purpose (adventure, relaxation, cultural, family, romantic, business)
5. Interests and activities preferred
6. Dietary restrictions (vegetarian, allergies, etc.)
7. Accommodation preferences (hotel, hostel, resort, Airbnb, luxury level)
8. Transportation preferences (flights, train, car rental, public transport)
9. Restaurant and dining preferences (budget, cuisine types)
10. Need travel agency assistance?
11. Need hotel booking assistance?
12. Need restaurant booking assistance?
13. Any specific must-visit attractions or places
14. Pace preference (sightseeing-heavy vs relaxed)
15. Nightlife and evening activity preferences

Each question should be conversational, specific, and helpful.

Respond with ONLY valid JSON:
["Question 1?", "Question 2?", ..., "Question 15?"]`;

export async function generateQuestions(): Promise<Array<{ question: string }>> {
  const text = await tryModels(QUESTIONS_SYSTEM_PROMPT, QUESTIONS_USER_PROMPT);
  if (!text) throw new AiError('Empty response from all models for questions');
  const parsed = JSON.parse(text);
  return (parsed || []).map((q: string) => ({ question: q }));
}

export async function generateFinalItinerary(answers: Array<{ question: string; answer: string }>): Promise<any> {
  const qaContext = answers.filter((q) => q.answer)
    .map((q) => `Q: ${q.question}\nA: ${q.answer}`)
    .join('\n\n');

  const systemPrompt = `You are a world-class travel itinerary planner. Generate detailed, practical itineraries in JSON format only.`;

  const userPrompt = `Create a complete group trip itinerary based on the following traveler preferences:

${qaContext || 'No specific preferences provided.'}

Respond with valid JSON following this EXACT structure (no markdown, no code fences):
{
  "days": [
    {
      "day": 1,
      "city": "city name",
      "activities": [
        {
          "time": "HH:MM",
          "activity": "short name",
          "description": "brief description",
          "cost": <number>,
          "category": "food|transport|attraction|shopping|other"
        }
      ]
    }
  ],
  "totalCost": <number>,
  "currency": "USD",
  "budgetBreakdown": {
    "accommodation": <number>,
    "food": <number>,
    "transport": <number>,
    "activities": <number>,
    "other": <number>
  },
  "recommendations": {
    "hotel": "recommended hotel name and reason",
    "restaurants": ["restaurant 1", "restaurant 2"],
    "transportTips": "transport tip"
  },
  "notes": "helpful note"
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) throw new AiError('Empty response from all models for itinerary');
  return JSON.parse(text);
}

export async function regenerateDay(currentDays: any[], dayNumber: number, instruction: string): Promise<any> {
  const systemPrompt = `You are a travel planner. Regenerate a single day of an itinerary. Respond with JSON only.`;

  const userPrompt = `Current full itinerary days:\n${JSON.stringify(currentDays)}\n\nRegenerate Day ${dayNumber} with this change: "${instruction}"\n\nReturn ONLY the updated day object matching this structure:
{
  "day": ${dayNumber},
  "city": "city",
  "activities": [
    { "time": "HH:MM", "activity": "name", "description": "desc", "cost": 0, "category": "food|transport|attraction|shopping|other" }
  ]
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) return null;
  return JSON.parse(text);
}

```

# FILE: backend/src/middleware/auth.ts

```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../lib/config.js';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], config.jwtSecret) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

```

# FILE: backend/src/middleware/validation.ts

```ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createGroupSchema = z.object({
  name: z.string().min(1).max(100),
});

export const joinGroupSchema = z.object({
  inviteCode: z.string().min(1).max(20),
});

export const createTripSchema = z.object({
  groupId: z.string(),
  destination: z.string().min(1).max(200),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0),
  interests: z.array(z.string()).optional().default([]),
  headcount: z.number().min(1),
  tripType: z.string().optional(),
  constraints: z.object({
    vegetarian: z.boolean().optional(),
    kids: z.boolean().optional(),
    seniors: z.boolean().optional(),
    luxury: z.boolean().optional(),
    publicTransport: z.boolean().optional(),
  }).optional(),
});

export const generateQuestionsSchema = z.object({
  tripId: z.string(),
});

export const submitAnswersSchema = z.object({
  tripId: z.string(),
  answers: z.array(z.string()),
});

export const regenerateDaySchema = z.object({
  tripId: z.string(),
  dayNumber: z.number(),
  instruction: z.string().min(1),
});

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed', details: result.error.issues });
    }
    req.body = result.data;
    next();
  };
}

```

# FILE: backend/src/controllers/auth.controller.ts

```ts
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateToken, AuthRequest } from '../middleware/auth.js';

export async function signup(req: AuthRequest, res: Response) {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.user!.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

```

# FILE: backend/src/controllers/group.controller.ts

```ts
import { Response } from 'express';
import crypto from 'crypto';
import { Group } from '../models/group.model.js';
import { AuthRequest } from '../middleware/auth.js';

export async function createGroup(req: AuthRequest, res: Response) {
  try {
    const { name } = req.body;
    const inviteCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const group = await Group.create({
      name,
      inviteCode,
      createdBy: req.user!.id,
      members: [req.user!.id],
    });
    const populated = await Group.findById(group._id).populate('members', '-passwordHash');
    res.status(201).json({ group: populated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
}

export async function joinGroup(req: AuthRequest, res: Response) {
  try {
    const { inviteCode } = req.body;
    const group = await Group.findOne({ inviteCode: inviteCode.toUpperCase() });
    if (!group) return res.status(404).json({ error: 'Invalid invite code' });

    const userId = req.user!.id;
    if (group.members.some((m) => m.toString() === userId)) {
      return res.status(400).json({ error: 'Already a member of this group' });
    }

    group.members.push(userId as any);
    await group.save();
    const populated = await Group.findById(group._id).populate('members', '-passwordHash');
    res.json({ group: populated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join group' });
  }
}

export async function getGroup(req: AuthRequest, res: Response) {
  try {
    const group = await Group.findById(req.params.id).populate('members', '-passwordHash');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json({ group });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
}

export async function getUserGroups(req: AuthRequest, res: Response) {
  try {
    const groups = await Group.find({ members: req.user!.id })
      .populate('members', '-passwordHash')
      .sort({ createdAt: -1 });
    res.json({ groups });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
}

```

# FILE: backend/src/controllers/trip.controller.ts

```ts
import { Response } from 'express';
import { Trip } from '../models/trip.model.js';
import { Group } from '../models/group.model.js';
import { AuthRequest } from '../middleware/auth.js';
import { generateQuestions, generateFinalItinerary, regenerateDay } from '../services/gemini.service.js';
import { logger } from '../lib/logger.js';

export async function createTrip(req: AuthRequest, res: Response) {
  try {
    const { groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const trip = await Trip.create({
      groupId,
      destination: 'Planning...',
      startDate: new Date(),
      endDate: new Date(),
      budget: 0,
      interests: [],
      headcount: 1,
    });

    const questions = await generateQuestions();
    trip.set('questions', questions.map((q: any) => ({ question: q.question, answer: '' })));
    await trip.save();

    res.status(201).json({ trip });
  } catch (error) {
    logger.error('Create trip error:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
}

export async function submitAnswers(req: AuthRequest, res: Response) {
  try {
    const { tripId, answers } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    trip.set('questions', (trip.questions || []).map((q: any, i: number) => ({
      question: q.question,
      answer: answers[i] || '',
    })));
    await trip.save();

    const aiPlanJson = await generateFinalItinerary(
      (trip.questions || []).map((q: any) => ({ question: q.question || '', answer: q.answer || '' }))
    );
    trip.aiPlanJson = aiPlanJson;
    await trip.save();

    res.json({ trip });
  } catch (error) {
    logger.error('Submit answers error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
}

export async function regenerateDayForTrip(req: AuthRequest, res: Response) {
  try {
    const { tripId, dayNumber, instruction } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (!trip.aiPlanJson?.days) return res.status(400).json({ error: 'No itinerary to modify' });

    const newDay = await regenerateDay(trip.aiPlanJson.days, dayNumber, instruction);
    if (!newDay) return res.status(500).json({ error: 'Failed to regenerate day' });

    const days = trip.aiPlanJson.days.map((d: any) =>
      d.day === dayNumber ? { ...d, ...newDay } : d
    );
    trip.aiPlanJson.days = days;
    await trip.save();

    res.json({ trip });
  } catch (error) {
    logger.error('Regenerate day error:', error);
    res.status(500).json({ error: 'Failed to regenerate day' });
  }
}

export async function getTripsByGroup(req: AuthRequest, res: Response) {
  try {
    const trips = await Trip.find({ groupId: req.params.groupId }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
}

```

# FILE: backend/src/lib/config.ts

```ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/traveloop',
  jwtSecret: process.env.JWT_SECRET || 'dev-fallback-secret',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  openrouterBaseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  models: [
    process.env.DEFAULT_MODEL,
    process.env.FALLBACK_MODEL,
    process.env.HEAVY_MODEL,
  ].filter(Boolean) as string[],
  nodeEnv: process.env.NODE_ENV || 'development',
};

```

# FILE: backend/src/lib/logger.ts

```ts
const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type LogLevel = keyof typeof LOG_LEVELS;

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function log(level: LogLevel, message: string, data?: unknown) {
  if (LOG_LEVELS[level] < LOG_LEVELS[currentLevel]) return;
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  if (data) {
    console[level === 'error' ? 'error' : 'log'](`${prefix} ${message}`, data);
  } else {
    console[level === 'error' ? 'error' : 'log'](`${prefix} ${message}`);
  }
}

export const logger = {
  debug: (msg: string, data?: unknown) => log('debug', msg, data),
  info: (msg: string, data?: unknown) => log('info', msg, data),
  warn: (msg: string, data?: unknown) => log('warn', msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
};

```

# FILE: backend/src/db/mongo.ts

```ts
import mongoose from 'mongoose';
import { config } from '../lib/config.js';
import { logger } from '../lib/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    logger.warn('Server will start without database - some features will be unavailable');
  }
}

```

