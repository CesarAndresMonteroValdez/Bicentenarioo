import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetalleHistoria() {
  const { titulo, descripcion, imagen, video } = useLocalSearchParams<{
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    video?: string;
  }>();

  return (
    <ScrollView style={styles.container}>
      {imagen && (
        <Image source={{ uri: imagen }} style={styles.image} />
      )}
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descripcion}</Text>
      {video && (
        <Text style={styles.videoLink}>
          Video: {video}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222'
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22
  },
  videoLink: {
    marginTop: 15,
    fontSize: 16,
    color: '#0066cc'
  }
});
