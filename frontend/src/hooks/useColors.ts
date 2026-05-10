import { useColorScheme } from 'react-native';

export function useColors() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    primary: '#4F46E5',
    primaryLight: '#818CF8',
    background: isDark ? '#0F172A' : '#F8FAFC',
    surface: isDark ? '#1E293B' : '#FFFFFF',
    surfaceAlt: isDark ? '#334155' : '#F1F5F9',
    text: isDark ? '#F1F5F9' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    cardShadow: isDark ? '#00000040' : '#00000010',
  };
}
