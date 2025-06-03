import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PopularCard({ lugar, onVerDetalle }) {
  return (
    <TouchableOpacity onPress={onVerDetalle} activeOpacity={0.8}>
      <LinearGradient
        colors={['#E6F4EA', '#C6E3C9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.card}
      >
        {lugar.imagen ? (
          <Image source={{ uri: lugar.imagen }} style={styles.imagen} />
        ) : (
          <Image source={require('../assets/default_image.png')} style={styles.imagen} />
        )}

        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={2}>{lugar.nombre}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#4CAF50" />
            <Text style={styles.ratingTexto}>{lugar.puntuacionPromedio?.toFixed(1) || '4.5'}</Text>
          </View>
          <Text style={styles.categoria}>{lugar.categoria}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderRadius: 18,
    elevation: 7,
    marginRight: 18,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 140,
  },
  info: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  nombre: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1B3E1B',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingTexto: {
    marginLeft: 7,
    fontWeight: '700',
    fontSize: 15,
    color: '#3A8D3A',
  },
  categoria: {
    fontSize: 13,
    color: '#4D6B4D',
    marginTop: 6,
    fontWeight: '600',
  },
});
