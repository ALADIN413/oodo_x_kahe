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
