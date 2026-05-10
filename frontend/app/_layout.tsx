import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { AppDataProvider } from '../src/store/useStore';
import { ActivityIndicator, View } from 'react-native';

function RootLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
            <Stack.Screen name="create-group" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Create Group', headerBackTitle: 'Back' }} />
            <Stack.Screen name="join-group" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Join Group', headerBackTitle: 'Back' }} />
          </>
        )}
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <RootLayout />
      </AppDataProvider>
    </AuthProvider>
  );
}
