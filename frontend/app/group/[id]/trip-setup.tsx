import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';

const INTEREST_OPTIONS = ['Adventure', 'Culture', 'Food', 'Shopping', 'Nature', 'Nightlife', 'Relaxation', 'History'];

export default function TripSetupScreen() {
  const { id } = useLocalSearchParams();
  const { createTrip } = useAppData();
  const colors = useColors();

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  }

  async function handleCreateTrip() {
    if (!destination || !startDate || !endDate || !budget || !headcount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const budgetNum = parseFloat(budget);
    const headcountNum = parseInt(headcount, 10);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      Alert.alert('Error', 'Please enter a valid budget');
      return;
    }
    if (isNaN(headcountNum) || headcountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid headcount');
      return;
    }

    setLoading(true);
    try {
      const trip = await createTrip({
        groupId: id,
        destination: destination.trim(),
        startDate,
        endDate,
        budget: budgetNum,
        interests,
        headcount: headcountNum,
      });
      router.replace(`/group/${id}/trip/${trip._id}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Plan Your Trip</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Fill in the details and let AI create the perfect itinerary
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Destination</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
            value={destination}
            onChangeText={setDestination}
            placeholder="e.g. Bali, Indonesia"
            placeholderTextColor={colors.textSecondary}
          />

          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Start Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            <View style={styles.dateField}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>End Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.numberRow}>
            <View style={styles.numberField}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Budget ($)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
                value={budget}
                onChangeText={setBudget}
                placeholder="e.g. 3000"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.numberField}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Travelers</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
                value={headcount}
                onChangeText={setHeadcount}
                placeholder="e.g. 4"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={[styles.label, { color: colors.textSecondary, marginTop: 8 }]}>Interests</Text>
          <View style={styles.chips}>
            {INTEREST_OPTIONS.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.chip,
                  {
                    backgroundColor: interests.includes(interest) ? colors.primary : colors.surfaceAlt,
                    borderColor: interests.includes(interest) ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: interests.includes(interest) ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: loading ? 0.6 : 1 }]}
            onPress={handleCreateTrip}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating...' : 'Generate AI Itinerary'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6, marginTop: 8 },
  subtitle: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  card: { borderRadius: 20, borderWidth: 1, padding: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16 },
  dateRow: { flexDirection: 'row', gap: 12 },
  dateField: { flex: 1 },
  numberRow: { flexDirection: 'row', gap: 12 },
  numberField: { flex: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '600' },
  button: { height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});
