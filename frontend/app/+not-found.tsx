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
