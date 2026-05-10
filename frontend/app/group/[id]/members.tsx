import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../src/context/AuthContext';
import { useColors } from '../../../src/hooks/useColors';
import { api } from '../../../src/services/api';

export default function MembersScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const colors = useColors();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getGroup(token!, id as string);
        setGroup(data.group);
      } catch { } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Group Members</Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {group?.members?.length || 0} {group?.members?.length === 1 ? 'member' : 'members'}
        </Text>
      </View>

      {group?.members?.map((member: any) => (
        <View key={member._id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{member.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
            <Text style={[styles.memberEmail, { color: colors.textSecondary }]}>{member.email}</Text>
          </View>
          {group.createdBy === member._id && (
            <View style={[styles.adminBadge, { backgroundColor: colors.warning + '20' }]}>
              <Text style={[styles.adminText, { color: colors.warning }]}>Admin</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  count: { fontSize: 14, marginTop: 4 },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: '600' },
  memberEmail: { fontSize: 13, marginTop: 2 },
  adminBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  adminText: { fontSize: 11, fontWeight: '700' },
});
