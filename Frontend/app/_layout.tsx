import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const { isLoggedIn, isGuest } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const currentSegment = segments[0]; // ejemplo: 'login', 'home', etc.

    // Esperar a que se determine el estado de sesión (por si hay persistencia o carga inicial)
    if (isLoggedIn === undefined) return;

    if (isLoggedIn) {
      if (!isGuest && (currentSegment === 'login' || currentSegment === 'register' || currentSegment === '')) {
        router.replace('/home');
      }
    } else {
      if (currentSegment === 'home' || currentSegment === 'upgrade') {
        router.replace('/login');
      }
    }

    setReady(true);
  }, [isLoggedIn, isGuest, segments]);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
}
