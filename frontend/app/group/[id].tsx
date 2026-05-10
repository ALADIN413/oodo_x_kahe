import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import { api } from '../../src/services/api';
import LoadingBar from '../../src/components/LoadingBar';

const DEMO_QUESTIONS = [
  { question: 'Where are you from?', answer: 'New York, USA' },
  { question: 'Where would you like to go?', answer: 'Paris, France' },
  { question: 'What dates are you planning to travel?', answer: 'June 1 to June 7, 2026' },
  { question: 'What is your total budget in USD?', answer: '3000' },
  { question: 'How many people are traveling?', answer: '2 adults' },
  { question: 'What type of trip do you want?', answer: 'Cultural and romantic' },
  { question: 'What are your main interests?', answer: 'Food, history, museums, photography' },
  { question: 'Any dietary restrictions?', answer: 'None' },
  { question: 'What accommodation do you prefer?', answer: 'Boutique hotel in central Paris' },
  { question: 'How will you get around?', answer: 'Public transport and walking' },
  { question: 'Any must-visit attractions?', answer: 'Eiffel Tower, Louvre, Versailles' },
  { question: 'Do you prefer a packed or relaxed pace?', answer: 'Relaxed with free time' },
  { question: 'Evening activities?', answer: 'River cruise, dinner at bistros' },
  { question: 'Any special occasions?', answer: 'Anniversary trip' },
];

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const { fetchGroups, createTrip } = useAppData();
  const colors = useColors();
  const [group, setGroup] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoLoading, setDemoLoading] = useState(false);

  async function loadGroup() {
    try {
      const data = await api.getGroup(token!, id as string);
      setGroup(data.group);
      const tripData = await api.getTrips(token!, id as string);
      setTrips((tripData.trips || []).filter((t: any) => t.aiPlanJson));
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

  async function handleDemoTrip() {
    setDemoLoading(true);
    try {
      const trip = await createTrip({ groupId: id, questions: DEMO_QUESTIONS });
      await loadGroup();
      router.push(`/group/${id}/trip/${trip._id}`);
    } catch (e: any) {
      Alert.alert('Demo Error', e.message || 'Failed to generate demo trip');
    } finally {
      setDemoLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <LoadingBar color={colors.primary} height={6} />
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

        {demoLoading && <LoadingBar color={colors.primary} height={4} />}

        <TouchableOpacity
          style={[styles.demoBtn, { backgroundColor: colors.surface, borderColor: colors.primary }]}
          onPress={handleDemoTrip}
          disabled={demoLoading}
        >
          <Text style={[styles.demoBtnText, { color: colors.primary }]}>🚀 Demo Trip — Paris</Text>
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
  demoBtn: { height: 48, borderRadius: 14, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  demoBtnText: { fontSize: 15, fontWeight: '700' },
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
