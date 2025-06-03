import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

export default function BottomNav({ layout = 'bottom' }) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route) => pathname === route;
  const iconColor = (route) => isActive(route) ? '#00e676' : 'white';

  const isVertical = layout === 'side';
  const isTop = layout === 'top';

  return (
    <View
      style={[styles.container,
        isVertical ? styles.side : isTop ? styles.top : styles.bottom]}
    >
      <Pressable onPress={() => router.push('/home')}>
        <Ionicons name="home" size={30} color={iconColor('/home')} />
      </Pressable>
      <Pressable onPress={() => router.push('/historia')}>
        <Ionicons name="book" size={30} color={iconColor('/historia')} />
      </Pressable>
      <Pressable onPress={() => router.push('/guia')}>
        <Ionicons name="information-circle" size={30} color={iconColor('/guia')} />
      </Pressable>
      <Pressable onPress={() => router.push('/ruta')}>
        <Ionicons name="map" size={30} color={iconColor('/ruta')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 10,
    zIndex: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  top: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  side: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -70 }],
    flexDirection: 'column',
  },
});
