import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Rating({ puntuacionActual, onPuntuar }) {
  const [puntuacion, setPuntuacion] = useState(puntuacionActual || 0);

  const handlePuntuar = (valor) => {
    setPuntuacion(valor);
    onPuntuar(valor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Puntuación:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => handlePuntuar(i)}>
            <Ionicons
              name={i <= puntuacion ? 'star' : 'star-outline'}
              size={24}
              color={i <= puntuacion ? '#ffc107' : '#ddd'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
