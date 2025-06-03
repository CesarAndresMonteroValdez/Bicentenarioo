import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import SplashRuta from '../components/SplashRuta';
import SplashHistoria from '../components/SplashHistoria';
import SplashGuia from '../components/SplashGuia';
import homeStyles from '../styles/homeStyles';
import PopularCard from '../components/PopularCard';
import RecommendationCard from '../components/RecommendationCard';
import EventoCard from '../components/EventoCard';
import {
  obtenerLugarPopular,
  obtenerSugerencias,
  obtenerEventos,
} from '../services/guiaService';

import { LinearGradient } from 'expo-linear-gradient';
import DetalleModal from '../components/DetalleModal';

export default function GuiaScreen() {
  const [ubicacion, setUbicacion] = useState(null);
  const [lugarPopular, setLugarPopular] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [splash, setSplash] = useState(null);

  // Modal para detalles
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalDescripcion, setModalDescripcion] = useState('');

  const { isGuest } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isGuest) {
      router.replace('/ruta');
    }
  }, [isGuest]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setUbicacion(loc.coords);

      const [popular, sugeridos, eventosOficiales] = await Promise.all([
        obtenerLugarPopular(),
        obtenerSugerencias(),
        obtenerEventos(loc.coords.latitude, loc.coords.longitude),
      ]);

      setLugarPopular(popular);
      setRecomendaciones(sugeridos);

      const ordenados = eventosOficiales.sort((a, b) => {
        const fechaA = new Date(a.fechaInicio || a.fecha || 0);
        const fechaB = new Date(b.fechaInicio || b.fecha || 0);
        return fechaA - fechaB;
      });

      setEventos(ordenados);
      setCargando(false);
    })();
  }, []);

  const abrirModal = (titulo, descripcion) => {
    setModalTitulo(titulo);
    setModalDescripcion(descripcion);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const handleCargaYNavegacion = (tipo) => {
    setSplash(tipo);
    setTimeout(() => {
      setSplash(null);
      router.push(`/${tipo}`);
    }, 5000);
  };

  if (cargando) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#28a745" />
        <Text>Cargando recomendaciones...</Text>
      </View>
    );
  }

  return (
    <>
      {splash === 'guia' && <SplashGuia />}
      {splash === 'ruta' && <SplashRuta />}
      {splash === 'historia' && <SplashHistoria />}

      {!splash && (
        <LinearGradient
          colors={['#e9f5e9', '#e9f5e9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.seccion}>Más Popular</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
                {lugarPopular && (
                  <PopularCard
                    lugar={lugarPopular}
                    onVerDetalle={() => abrirModal(lugarPopular.nombre, lugarPopular.descripcion)}
                  />
                )}
              </ScrollView>

              <Text style={styles.seccion}>Recomendaciones</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
                {recomendaciones.map((l, idx) => (
                  <RecommendationCard
                    key={idx}
                    lugar={l}
                    onVerDetalle={() => abrirModal(l.nombre, l.descripcion)}
                  />
                ))}
              </ScrollView>

              <Text style={styles.seccion}>Agenda Cultural</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
                {eventos.map((e, idx) => (
                  <EventoCard
                    key={idx}
                    evento={e}
                    onVerDetalle={() => abrirModal(e.titulo, e.descripcion)}
                  />
                ))}
              </ScrollView>
            </ScrollView>

            <LinearGradient
              colors={['#FFFFFF', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={homeStyles.bottomNav}
            >
              <TouchableOpacity
                onPress={() => router.push('/home')}
                style={[homeStyles.navItem, pathname === '/home' && homeStyles.navItemActive]}
              >
                <MaterialIcons
                  name="home"
                  style={[homeStyles.navIcon, pathname === '/home' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCargaYNavegacion('historia')}
                style={[homeStyles.navItem, pathname === '/historia' && homeStyles.navItemActive]}
              >
                <MaterialIcons
                  name="chat"
                  style={[homeStyles.navIcon, pathname === '/historia' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCargaYNavegacion('guia')}
                style={[homeStyles.navItem, pathname === '/guia' && homeStyles.navItemActive]}
              >
                <Entypo
                  name="compass"
                  style={[homeStyles.navIcon, pathname === '/guia' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCargaYNavegacion('ruta')}
                style={[homeStyles.navItem, pathname === '/ruta' && homeStyles.navItemActive]}
              >
                <FontAwesome5
                  name="map-marked-alt"
                  style={[homeStyles.navIcon, pathname === '/ruta' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <DetalleModal
            visible={modalVisible}
            onClose={cerrarModal}
            titulo={modalTitulo}
            descripcion={modalDescripcion}
          />
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 110,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#f0f9f0',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  scrollHorizontal: {
    flexGrow: 0,
    marginBottom: 10,
  },
});
