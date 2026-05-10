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
