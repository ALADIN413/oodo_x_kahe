import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useColors } from '../hooks/useColors';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export default function LoadingOverlay({ visible, message = 'Generating your itinerary...' }: LoadingOverlayProps) {
  const colors = useColors();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.background + 'CC' }]}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>
            Our AI is planning the perfect trip...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  message: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  sub: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});
