import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/fondo0.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>¡Bienvenido a la Aventura!</Text>
        <Text style={styles.subtitle}>Prepárate para una experiencia increíble</Text>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.8)', 
    borderRadius: 25,
    },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: 'rgba(76, 175, 80, 0.8)', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
