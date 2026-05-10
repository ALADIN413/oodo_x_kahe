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
