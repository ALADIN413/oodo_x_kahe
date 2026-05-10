import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '../hooks/useColors';

interface GroupCardProps {
  name: string;
  memberCount: number;
  inviteCode: string;
  onPress: () => void;
  onShare?: () => void;
}

export default function GroupCard({ name, memberCount, inviteCode, onPress, onShare }: GroupCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.top}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{name}</Text>
          <Text style={[styles.members, { color: colors.textSecondary }]}>
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </Text>
        </View>
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.codeLabel, { color: colors.textSecondary }]}>Code: </Text>
        <Text style={[styles.code, { color: colors.primary }]}>{inviteCode}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  members: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  codeLabel: {
    fontSize: 12,
  },
  code: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
