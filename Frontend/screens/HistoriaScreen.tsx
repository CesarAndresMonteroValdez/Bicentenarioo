import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import SplashHistoria from '../components/SplashHistoria';
import SplashRuta from '../components/SplashRuta';
import SplashGuia from '../components/SplashGuia';
import homeStyles from '../styles/homeStyles';
import HistoriaCard from '../components/HistoriaCard';
import { obtenerEventosHistoria } from '../services/historiaService';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoriaScreen() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const refs = useRef({});
  const router = useRouter();
  const pathname = usePathname();
  const { isGuest } = useAuthStore();

  const [cargando, setCargando] = useState(false);
  const [tipoSplash, setTipoSplash] = useState<'ruta' | 'historia' | 'guia' | null>(null);

  useEffect(() => {
    if (isGuest) {
      router.replace('/ruta');
    }
  }, [isGuest]);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerEventosHistoria();
      setHistorias(data);
      setLoading(false);
    };
    cargar();
  }, []);

  const handleCargaYNavegacion = (tipo: 'ruta' | 'historia' | 'guia') => {
    setTipoSplash(tipo);
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      if (tipo === 'ruta') router.push('/ruta');
      if (tipo === 'historia') router.push('/historia');
      if (tipo === 'guia') router.push('/guia');
    }, 5000);
  };

  const scrollToCard = (id) => {
    if (refs.current[id]) {
      refs.current[id].measureLayout(
        scrollRef.current,
        (x, y) => scrollRef.current.scrollTo({ y, animated: true })
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#28a745" />
        <Text style={styles.loaderText}>Cargando contenido histórico...</Text>
      </View>
    );
  }

  return (
    <>
      {cargando && tipoSplash === 'historia' && <SplashHistoria />}
      {cargando && tipoSplash === 'ruta' && <SplashRuta />}
      {cargando && tipoSplash === 'guia' && <SplashGuia />}

      {!cargando && (
        <LinearGradient
          colors={['#e9f5e9', '#C6E3C9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.titulo}>Contenido Histórico</Text>
              <Text style={styles.descripcion}>
                A continuación se presentan eventos históricos registrados.
              </Text>

              {historias.map((evento) => (
                <View key={evento._id} ref={(ref) => (refs.current[evento._id] = ref)}>
                  <HistoriaCard evento={evento} />
                </View>
              ))}

              <View style={{ height: 100 }} />
            </ScrollView>

            {/* Línea de tiempo horizontal */}
            <View style={styles.timeline}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {historias.map((evento, index) => (
                  <TouchableOpacity
                    key={evento._id}
                    onPress={() => scrollToCard(evento._id)}
                    style={styles.timelineItem}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Ionicons name="flag" size={20} color="#4CAF50" />
                      <Text style={styles.timelineFecha}>
                        {evento.fecha ? new Date(evento.fecha).getFullYear() : '¿?'}
                      </Text>
                    </View>
                    {index < historias.length - 1 && (
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#A8CFA8"
                        style={styles.flecha}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Navegación inferior con degradado */}
            <LinearGradient
              colors={['#FFFFFF', '#E6F4EA']}
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
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F0F9F0',
    textAlign: 'center',
    textShadowColor: '#1B3E1B',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 16,
    color: '#1B3E1B',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '600',
  },
  timeline: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  timelineFecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  flecha: {
    marginHorizontal: 8,
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#36544f',
  },
});
