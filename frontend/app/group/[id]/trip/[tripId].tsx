import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../../src/context/AuthContext';
import { useAppData } from '../../../../src/store/useStore';
import { useColors } from '../../../../src/hooks/useColors';
import { api } from '../../../../src/services/api';
import ItineraryCard from '../../../../src/components/ItineraryCard';
import BudgetSummary from '../../../../src/components/BudgetSummary';
import LoadingOverlay from '../../../../src/components/LoadingOverlay';

export default function TripDetailScreen() {
  const { id, tripId } = useLocalSearchParams();
  const { token } = useAuth();
  const { generateAiPlan } = useAppData();
  const colors = useColors();

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  async function loadTrip() {
    try {
      const trips = await api.getTrips(token!, id as string);
      const found = trips.find((t: any) => t._id === tripId);
      setTrip(found || null);
    } catch { } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  async function handleGenerate() {
    setGenerating(true);
    try {
      const updated = await generateAiPlan(tripId as string);
      setTrip(updated);
    } catch (e: any) {
      // retry with the generation
      try {
        const updated = await generateAiPlan(tripId as string);
        setTrip(updated);
      } catch { }
    } finally {
      setGenerating(false);
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

  const hasAiPlan = trip.aiPlanJson?.days?.length > 0;
  const plan = trip.aiPlanJson;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LoadingOverlay visible={generating} message="AI is planning your trip..." />

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
            <Text style={[styles.metaItem, { color: colors.textSecondary }]}>
              👥 {trip.headcount} travelers
            </Text>
            <Text style={[styles.metaItem, { color: colors.textSecondary }]}>
              💰 ${trip.budget?.toLocaleString()} budget
            </Text>
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
            <Text style={[styles.genTitle, { color: colors.text }]}>AI Itinerary Ready</Text>
            <Text style={[styles.genSub, { color: colors.textSecondary }]}>
              Tap the button below to generate a personalized day-by-day itinerary powered by Gemini AI.
            </Text>
            <TouchableOpacity
              style={[styles.genButton, { backgroundColor: colors.primary }]}
              onPress={handleGenerate}
            >
              <Text style={styles.genButtonText}>Generate Itinerary</Text>
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

            {plan.days.map((day: any) => (
              <ItineraryCard key={day.day} {...day} />
            ))}
          </>
        )}
      </ScrollView>
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
  genCard: { borderRadius: 20, borderWidth: 1, padding: 32, alignItems: 'center' },
  genIcon: { fontSize: 48, marginBottom: 16 },
  genTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  genSub: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  genButton: { height: 50, borderRadius: 14, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' },
  genButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
