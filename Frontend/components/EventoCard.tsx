import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventoCard({ evento, onVerDetalle }) {
  const fechaFormateada = evento.fechaInicio
    ? new Date(evento.fechaInicio).toLocaleDateString()
    : evento.fecha
    ? new Date(evento.fecha).toLocaleDateString()
    : null;

  const iconoCategoria = {
    Cultural: 'palette',
    Musical: 'music',
    Patriótico: 'flag',
    Educativo: 'school',
    Otro: 'star-outline',
  };

  const icono = iconoCategoria[evento.categoria] || 'calendar';

  return (
    <LinearGradient
      colors={['#E6F4EA', '#C6E3C9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.card}
    >
      {evento.imagen && (
        <Image source={{ uri: evento.imagen }} style={styles.imagen} />
      )}

      <View style={styles.contenido}>
        <Text style={styles.titulo} numberOfLines={2}>
          {evento.titulo}
        </Text>

        {fechaFormateada && <Text style={styles.fecha}>📅 {fechaFormateada}</Text>}

        {evento.categoria && (
          <View style={styles.categoriaRow}>
            <MaterialCommunityIcons name={icono} size={16} color="#3A8D3A" />
            <Text style={styles.categoriaTexto}> {evento.categoria}</Text>
          </View>
        )}

        <Text style={styles.descripcion} numberOfLines={3}>
          {evento.descripcion || 'Sin descripción.'}
        </Text>

        <TouchableOpacity onPress={() => onVerDetalle(evento)} activeOpacity={0.8}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botonDetalle}
          >
            <Text style={styles.textoBoton}>Ver más</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 12,
    marginRight: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contenido: {
    padding: 12,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#1B3E1B',
  },
  fecha: {
    fontSize: 12,
    color: '#4D6B4D',
    marginBottom: 6,
  },
  categoriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoriaTexto: {
    fontSize: 13,
    color: '#3A8D3A',
    fontWeight: '700',
  },
  descripcion: {
    fontSize: 13,
    color: '#3D4F3D',
    marginBottom: 12,
    lineHeight: 18,
  },
  botonDetalle: {
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
