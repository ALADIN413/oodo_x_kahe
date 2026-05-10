import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useAppData } from '../../src/store/useStore';
import { useColors } from '../../src/hooks/useColors';
import GroupCard from '../../src/components/GroupCard';

export default function GroupsScreen() {
  const { groups, fetchGroups, loading } = useAppData();
  const colors = useColors();

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGroups} />}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>All Groups</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/create-group')}>
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: '#8B5CF6', marginLeft: 8 }]} onPress={() => router.push('/join-group')}>
            <Text style={styles.btnText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      {groups.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No groups yet. Create your first travel group!
          </Text>
        </View>
      ) : (
        groups.map((group) => (
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  actions: { flexDirection: 'row' },
  smallBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  emptyCard: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
