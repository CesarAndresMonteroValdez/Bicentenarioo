import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Dimensions, View, Text, Image, Modal, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { obtenerEventosCercanos } from '../services/eventosService';
import { obtenerLugares } from '../services/lugaresService';

const lugaresTuristicos = [
  {
    nombre: 'Parque Urbano',
    lat: -17.793903,
    lng: -63.170191,
    imagen: 'https://distritomunicipal11.gmsantacruz.gob.bo/wp-content/uploads/2023/12/Parque_Urbano_Central.png',
    categoria: 'Parque'
  },
  {
    nombre: 'Catedral Metropolitana Basílica Menor de San Lorenzo',
    lat: -17.784184,
    lng: -63.181838,
    imagen: 'https://campanas.iglesiasantacruz.org/wp-content/uploads/2023/09/C4-768x512.jpg',
    categoria: 'Catedral'
  },
  {
    nombre: 'Monumento Cristo Redentor',
    lat: -17.77048,
    lng: -63.18249,
    imagen: 'https://cdn1.infocasas.com.uy/web/5aa7d0c80b481_infocdn__cristo-redentor4.jpg#hasTH',
    categoria: 'Turismo'
  },
  {
    nombre: 'Universidad para el Desarrollo y la Innovación',
    lat: -17.734431,
    lng: -63.169936,
    imagen: 'https://eldeber.com.bo/sites/default/efsfiles/styles/wide/public/2024-09/universidad-para-el-desarrollo-y-la-innovacin-udi_980230560_1140x520.jpeg?itok=d7rR6q6a',
    categoria: 'General'
  },
  {
    nombre: 'Mercado El Espino',
    lat: -17.744216,
    lng: -63.093735,
    imagen: 'https://www.reduno.com.bo/economia/en-mercados-de-santa-cruz-reportan-aumento-de-12-productos-de-la-canasta-familiar--20242192120',
    categoria: 'General'
  },
  {
    nombre: 'Museo de Historia Natural Noel Kempf Mercado',
    lat: -17.792713,
    lng: -63.181884,
    imagen: 'https://museonoelkempff.org/museo/wp-content/uploads/2023/12/Museo-de-Historia-Natural-Noel-Kempff-Mercado-700px-min-300x169.png',
    categoria: 'Museo'
  },
];

const colorPorCategoria = {
  Parque: 'green',
  Museo: 'brown',
  Catedral: 'purple',
  Turismo: 'teal',
  General: 'gray',
  Histórico: 'blue',
  Religioso: 'orange',
  Recreativo: 'pink',
};

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function MapaRuta({ ubicacion, destino, ruta }) {
  const mapRef = useRef(null);
  const [rutaRestante, setRutaRestante] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoModalVisible, setEventoModalVisible] = useState(false);
  const [lugares, setLugares] = useState([]);
  const [modalLugarVisible, setModalLugarVisible] = useState(false);
  const [lugarCercano, setLugarCercano] = useState(null);
  const [lugaresMostrados, setLugaresMostrados] = useState([]);

  const coordsRuta = ruta?.features?.[0]?.geometry?.coordinates?.map(
    ([lng, lat]) => ({ latitude: lat, longitude: lng })
  ) || [];

  useEffect(() => {
    console.log('Ruta recibida en MapaRuta:', ruta);
  }, [ruta]);


  const puntoMedio = coordsRuta.length > 0
    ? coordsRuta[Math.floor(coordsRuta.length / 2)]
    : null;

  const duracion = ruta?.features?.[0]?.properties?.summary?.duration;
  const tiempoEstimado = duracion ? `${Math.round(duracion / 60)} min` : '';

  useEffect(() => {
    if (!ubicacion || coordsRuta.length === 0) return;
    const restante = coordsRuta.filter((punto) => {
      const distancia = Math.sqrt(
        Math.pow(punto.latitude - ubicacion.lat, 2) +
        Math.pow(punto.longitude - ubicacion.lng, 2)
      );
      return distancia > 0.0003;
    });
    setRutaRestante(restante);
    obtenerEventosCercanos(ubicacion.lat, ubicacion.lng).then(setEventos);
  }, [ubicacion, ruta]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (ubicacion) {
      mapRef.current.animateToRegion({
        latitude: ubicacion.lat,
        longitude: ubicacion.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }, [ubicacion]);

  useEffect(() => {
    obtenerLugares()
      .then((data) => setLugares([...data, ...lugaresTuristicos]))
      .catch((err) => console.error('❌ Error lugares:', err));
  }, []);

  useEffect(() => {
    if (!ubicacion) return;
    for (const lugar of lugaresTuristicos) {
      const distancia = calcularDistancia(ubicacion.lat, ubicacion.lng, lugar.lat, lugar.lng);
      if (distancia < 500 && !lugaresMostrados.includes(lugar.nombre)) {
        setLugarCercano(lugar);
        setModalLugarVisible(true);
        setLugaresMostrados(prev => [...prev, lugar.nombre]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      }
    }
  }, [ubicacion]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: ubicacion?.lat || -17.78,
          longitude: ubicacion?.lng || -63.18,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {ubicacion && (
          <Marker coordinate={{ latitude: ubicacion.lat, longitude: ubicacion.lng }} title="Tú" pinColor="blue" />
        )}
        {destino && (
          <Marker coordinate={{ latitude: destino.lat, longitude: destino.lng }} title={destino.nombre} pinColor="red" />
        )}
        {rutaRestante.length > 0 && (
          <Polyline coordinates={rutaRestante} strokeColor="blue" strokeWidth={4} />
        )}
        {puntoMedio && tiempoEstimado && (
          <Marker coordinate={puntoMedio} anchor={{ x: 0.5, y: 1 }} tracksViewChanges={false}>
            <View style={styles.burbuja}>
              <Text style={styles.textoBurbuja}>🚶 {tiempoEstimado}</Text>
            </View>
          </Marker>
        )}
        {eventos.map((evento) => (
          <Marker
            key={evento._id}
            coordinate={{ latitude: evento.lat, longitude: evento.lng }}
            title={evento.titulo}
            pinColor="orange"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setEventoSeleccionado(evento);
              setEventoModalVisible(true);
            }}
          />
        ))}
        {lugares.map((lugar, index) => (
          <Marker
            key={lugar._id || `${lugar.nombre}-${index}`}
            coordinate={{ latitude: lugar.lat, longitude: lugar.lng }}
            title={lugar.nombre}
            description={lugar.descripcion}
            pinColor={colorPorCategoria[lugar.categoria] || 'gray'}
          />
        ))}
      </MapView>

      {/* Modal evento */}
      <Modal visible={eventoModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📣 {eventoSeleccionado?.titulo}</Text>
            {eventoSeleccionado?.imagen && (
              <Image source={{ uri: eventoSeleccionado.imagen }} style={styles.modalImage} />
            )}
            <Text style={styles.modalDescription}>{eventoSeleccionado?.descripcion}</Text>
            <Pressable onPress={() => setEventoModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal lugar cercano */}
      <Modal visible={modalLugarVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📍 Estás cerca de:</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
              {lugarCercano?.nombre}
            </Text>
            {lugarCercano?.imagen && (
              <Image source={{ uri: lugarCercano.imagen }} style={styles.modalImage} />
            )}
            <Pressable onPress={() => setModalLugarVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  map: { flex: 1, width, height },
  burbuja: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBurbuja: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
