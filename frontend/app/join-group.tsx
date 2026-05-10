import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppData } from '../src/store/useStore';
import { useColors } from '../src/hooks/useColors';

export default function JoinGroupScreen() {
  const { joinGroup } = useAppData();
  const colors = useColors();
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }
    setLoading(true);
    try {
      const group = await joinGroup(inviteCode.trim().toUpperCase());
      router.back();
      router.push(`/group/${group._id}`);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to join group');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Join a Group</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter the invite code shared by your travel group
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Invite Code</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
          value={inviteCode}
          onChangeText={(t) => setInviteCode(t.toUpperCase())}
          placeholder="e.g. A1B2C3"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="characters"
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#8B5CF6', opacity: loading ? 0.6 : 1 }]}
          onPress={handleJoin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Joining...' : 'Join Group'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 20, borderWidth: 1, padding: 24, marginTop: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, fontSize: 16, letterSpacing: 2 },
  button: { height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});
