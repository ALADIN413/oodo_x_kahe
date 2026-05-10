import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';

interface Activity {
  time: string;
  activity: string;
  description: string;
  cost: number;
  category: string;
}

interface DayPlan {
  day: number;
  city: string;
  activities: Activity[];
}

export default function ItineraryCard({ day, city, activities }: DayPlan) {
  const colors = useColors();

  const categoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      food: '🍽️',
      transport: '🚗',
      attraction: '🎯',
      shopping: '🛍️',
      other: '📌',
    };
    return icons[cat] || '📌';
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.dayBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.dayNumber}>{day}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>DAY {day}</Text>
          <Text style={[styles.cityName, { color: colors.text }]}>{city}</Text>
        </View>
      </View>

      {activities.map((activity, index) => (
        <View
          key={index}
          style={[styles.activity, index < activities.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
        >
          <View style={styles.activityHeader}>
            <Text style={[styles.time, { color: colors.primary }]}>{activity.time}</Text>
            <Text style={[styles.costBadge, { backgroundColor: colors.surfaceAlt, color: colors.textSecondary }]}>
              ${activity.cost}
            </Text>
          </View>
          <View style={styles.activityBody}>
            <Text style={styles.categoryIcon}>{categoryIcon(activity.category)}</Text>
            <View style={styles.activityText}>
              <Text style={[styles.activityName, { color: colors.text }]}>{activity.activity}</Text>
              <Text style={[styles.activityDesc, { color: colors.textSecondary }]}>{activity.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  dayBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  activity: {
    padding: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontSize: 13,
    fontWeight: '700',
  },
  costBadge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  activityBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  activityText: {
    flex: 1,
  },
  activityName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
