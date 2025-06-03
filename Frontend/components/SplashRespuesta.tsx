import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashRespuesta({ visible, mensaje }: { visible: boolean; mensaje: string }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LottieView
          source={require('../assets/Animation - 1747933199729.json')}
          autoPlay
          loop
          style={{ width: 180, height: 180 }}
        />
        <Text style={styles.texto}>{mensaje || 'Enviando...'}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
