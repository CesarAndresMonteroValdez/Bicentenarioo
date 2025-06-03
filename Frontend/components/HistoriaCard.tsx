import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoriaCard({ evento }: { evento: any }) {
  const [favorito, setFavorito] = useState(false);
  const wikipediaURL = `https://es.wikipedia.org/wiki/${encodeURIComponent(evento.titulo)}`;

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  return (
    <LinearGradient
      colors={['#E6F4EA', '#C6E3C9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}
    >
      {evento.imagen && (
        <Image source={{ uri: evento.imagen }} style={styles.cardImagen} />
      )}

      <View style={styles.cardContenido}>
        <View style={styles.header}>
          <Text style={styles.titulo} numberOfLines={2}>{evento.titulo}</Text>
          <TouchableOpacity onPress={toggleFavorito} activeOpacity={0.7}>
            <Ionicons
              name={favorito ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={favorito ? '#4CAF50' : '#9E9E9E'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.descripcion} numberOfLines={4}>
          {evento.descripcion?.slice(0, 250) ?? 'Sin descripción disponible...'}
        </Text>

        {evento.fecha && (
          <Text style={styles.fecha}>📅 {new Date(evento.fecha).toLocaleDateString()}</Text>
        )}

        <TouchableOpacity onPress={() => Linking.openURL(wikipediaURL)} activeOpacity={0.7}>
          <Text style={styles.link}>Buscar en Wikipedia →</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  cardImagen: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContenido: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B3E1B',
    flex: 1,
    marginRight: 10,
  },
  descripcion: {
    fontSize: 14,
    color: '#3D4F3D',
    marginBottom: 12,
    lineHeight: 20,
  },
  fecha: {
    fontSize: 13,
    color: '#558855',
    marginBottom: 10,
    fontWeight: '600',
  },
  link: {
    color: '#4CAF50',
    fontWeight: '700',
    fontSize: 14,
  },
});
