import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import GroupCard from '../../src/components/GroupCard';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { groups, fetchGroups, loading } = useAppData();
  const colors = useColors();

  useEffect(() => {
    fetchGroups();
  }, []);

  const myGroups = groups.slice(0, 5);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGroups} />}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/create-group')}
        >
          <Text style={styles.actionIcon}>🚀</Text>
          <Text style={styles.actionTitle}>Create Group</Text>
          <Text style={styles.actionSub}>Start a new trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#8B5CF6' }]}
          onPress={() => router.push('/join-group')}
        >
          <Text style={styles.actionIcon}>🔗</Text>
          <Text style={styles.actionTitle}>Join Group</Text>
          <Text style={styles.actionSub}>Use invite code</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Groups</Text>

      {myGroups.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emptyIcon}>✈️</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No groups yet. Create or join one to start planning!
          </Text>
        </View>
      ) : (
        myGroups.map((group) => (
          <GroupCard
            key={group._id}
            name={group.name}
            memberCount={group.members.length}
            inviteCode={group.inviteCode}
            onPress={() => router.push(`/group/${group._id}`)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 24, marginTop: 8 },
  greeting: { fontSize: 15 },
  name: { fontSize: 28, fontWeight: '800', marginTop: 2 },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  actionCard: { flex: 1, borderRadius: 16, padding: 20 },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  actionSub: { color: '#FFFFFFCC', fontSize: 12, marginTop: 2 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  emptyCard: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
