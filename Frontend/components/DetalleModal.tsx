import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function DetalleModal({ visible, onClose, titulo, descripcion }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <ScrollView style={styles.descripcionContainer}>
            <Text style={styles.descripcion}>{descripcion || 'No hay descripción disponible.'}</Text>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.botonCerrar}>
            <Text style={styles.textoBotonCerrar}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descripcionContainer: {
    marginBottom: 20,
  },
  descripcion: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  botonCerrar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonCerrar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
