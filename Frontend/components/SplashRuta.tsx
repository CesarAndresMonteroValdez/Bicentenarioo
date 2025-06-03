import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashRuta() {
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/Animation - 1747940220488.json')} autoPlay loop style={styles.animacion} />
      <Text style={styles.mensaje}>! Listo para recorrer !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animacion: {
    width: 280,
    height: 280,
  },
  mensaje: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold'
  },
});