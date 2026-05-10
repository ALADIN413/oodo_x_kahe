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
