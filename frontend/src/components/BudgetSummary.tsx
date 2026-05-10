import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';

interface BudgetSummaryProps {
  totalCost: number;
  budget: number;
  currency: string;
  notes?: string;
}

export default function BudgetSummary({ totalCost, budget, currency, notes }: BudgetSummaryProps) {
  const colors = useColors();
  const percentage = Math.min((totalCost / budget) * 100, 100);
  const remaining = budget - totalCost;
  const isOver = remaining < 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Budget Summary</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Total Budget</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {currency} {budget.toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Estimated Cost</Text>
        <Text style={[styles.value, { color: isOver ? colors.error : colors.success }]}>
          {currency} {totalCost.toLocaleString()}
        </Text>
      </View>

      <View style={[styles.bar, { backgroundColor: colors.surfaceAlt }]}>
        <View
          style={[
            styles.fill,
            {
              backgroundColor: isOver ? colors.error : colors.success,
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {isOver ? 'Over budget by' : 'Remaining'}
        </Text>
        <Text style={[styles.value, { color: isOver ? colors.error : colors.success, fontWeight: '700' }]}>
          {isOver ? '-' : ''}{currency} {Math.abs(remaining).toLocaleString()}
        </Text>
      </View>

      {notes && (
        <Text style={[styles.notes, { color: colors.textSecondary }]}>{notes}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  bar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  notes: {
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
});
