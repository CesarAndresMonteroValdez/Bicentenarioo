
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashLogin() {
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/Animation - 1747932615196.json')} autoPlay loop style={styles.animacion} />
      <Text style={styles.mensaje}>Inicia sesión para descubrir Santa Cruz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animacion: {
    width: 280,
    height: 280,
  },
  mensaje: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
});