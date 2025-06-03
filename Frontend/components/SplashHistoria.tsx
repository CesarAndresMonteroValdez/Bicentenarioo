import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashHistoria() {
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/Animation - 1747930238065.json')} autoPlay loop style={styles.animacion} />
      <Text style={styles.mensaje}>Explora el pasado que forma nuestra identida</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a4c93',
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