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
