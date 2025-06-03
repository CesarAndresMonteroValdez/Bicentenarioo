import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecommendationCard({ lugar, onVerDetalle }) {
  return (
    <Pressable onPress={onVerDetalle} style={styles.card}>
      <LinearGradient
        colors={['#E6F4EA', '#C6E3C9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {lugar.imagen ? (
          <Image source={{ uri: lugar.imagen }} style={styles.imagen} />
        ) : (
          <Image source={require('../assets/default_image.png')} style={styles.imagen} />
        )}

        <Text style={styles.nombre} numberOfLines={2}>{lugar.nombre}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#ffc107" />
          <Text style={styles.ratingTexto}>{lugar.puntuacionPromedio ? lugar.puntuacionPromedio.toFixed(1) : '4.5'}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 14,
    marginRight: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
  },
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3E1B',
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTexto: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#3A8D3A',
  },
});
