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
