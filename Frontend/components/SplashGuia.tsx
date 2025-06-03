import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashGuia() {
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/Animation - 1747947109811.json')} autoPlay loop style={styles.animacion} />
      <Text style={styles.mensaje}>Preparate para dejarte guiar con confianza…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animacion: {
    width: 280,
    height: 280,
  },
  mensaje: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
});
