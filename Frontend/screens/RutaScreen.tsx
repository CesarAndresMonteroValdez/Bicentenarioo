import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import SplashRuta from '../components/SplashRuta';
import SplashGuia from '../components/SplashGuia';
import SplashHistoria from '../components/SplashHistoria';
import homeStyles from '../styles/homeStyles';
import MapaRuta from '../components/MapaRuta';
import { globalStyles } from '../styles/rutaStyles';
import { generarURLAutocompletado } from '../utils/ubicacionUtils';
import { LinearGradient } from 'expo-linear-gradient';

const ORS_API_KEY = '5b3ce3597851110001cf6248b2ca74adea2346e7b67778e56516545a';

const categorias = [
  { nombre: 'Home', icono: '🏠' },
  { nombre: 'Turismo', icono: '🌍' },
  { nombre: 'Catedral', icono: '⛪' },
  { nombre: 'Parque', icono: '🌳' },
  { nombre: 'Museo', icono: '🏛️' },
];

export default function RutaScreen() {
  const [query, setQuery] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [ubicacion, setUbicacion] = useState(null);
  const [destino, setDestino] = useState(null);
  const [ruta, setRuta] = useState(null);
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const timeoutRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const { isGuest } = useAuthStore();

  const [splash, setSplash] = useState<'ruta' | 'historia' | 'guia' | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso de ubicación.');
        return;
      }
      try {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };
        console.log('Ubicación obtenida:', coords);
        setUbicacion(coords);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la ubicación.');
        console.error(error);
      }
    })();
  }, []);

  const obtenerSugerencias = async (texto) => {
    setQuery(texto);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!texto.trim() || !ubicacion) return setSugerencias([]);

    timeoutRef.current = setTimeout(async () => {
      try {
        const url = generarURLAutocompletado(texto, ubicacion, 20, ORS_API_KEY);
        console.log('URL autocompletado:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Datos autocompletado:', data);
        setSugerencias(data.features || []);
      } catch (error) {
        console.error('❌ Autocompletado dinámico:', error);
      }
    }, 400);
  };

  const seleccionarLugar = async (item) => {
    const [lng, lat] = item.geometry.coordinates;
    const destinoCoords = {
      lat,
      lng,
      nombre: item.properties.label,
      descripcion: item.properties.name || 'Dirección encontrada',
      categoria: categoriaSeleccionada || 'General',
    };
    setQuery(item.properties.label);
    setSugerencias([]);
    setDestino(destinoCoords);
    if (ubicacion) {
      try {
        const resultado = await obtenerRutaConORS(ubicacion, destinoCoords);
        if (resultado) {
          console.log('Ruta obtenida:', resultado);
          setRuta(resultado.geojson);
          if (resultado.duracionMinutos) {
            setTiempoEstimado(`⏱️ Tiempo estimado: ${resultado.duracionMinutos} minutos a pie.`);
          } else {
            setTiempoEstimado('');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo calcular la ruta.');
        console.error(error);
      }
    }

    try {
      await fetch('http://192.168.0.8:5000/api/lugares/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(destinoCoords),
      });
    } catch (error) {
      console.error('❌ Error al guardar lugar:', error);
    }
  };

  const obtenerRutaConORS = async (origen, destino) => {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/foot-walking/geojson?api_key=${ORS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            coordinates: [
              [origen.lng, origen.lat],
              [destino.lng, destino.lat],
            ],
            instructions: false,
          }),
        }
      );
      if (!res.ok) {
        throw new Error('Error al obtener ruta');
      }
      const data = await res.json();
      const duracion = data?.features?.[0]?.properties?.summary?.duration;
      const minutos = duracion ? Math.round(duracion / 60) : null;
      return { geojson: data, duracionMinutos: minutos };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCargaYNavegacion = (tipo: 'ruta' | 'historia' | 'guia') => {
    setSplash(tipo);
    setTimeout(() => {
      setSplash(null);
      router.push(`/${tipo}`);
    }, 5000);
  };

  return (
    <>
      {splash === 'ruta' && <SplashRuta />}
      {splash === 'historia' && <SplashHistoria />}
      {splash === 'guia' && <SplashGuia />}

      {!splash && (
        <LinearGradient
          colors={['#7DDF64', '#3C763D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={globalStyles.container}>
            <View style={globalStyles.searchRow}>
              <Text style={globalStyles.searchIcon}>🔍</Text>
              <TextInput
                style={globalStyles.inputExpandible}
                placeholder="¡A dónde vamos!"
                value={query}
                onChangeText={obtenerSugerencias}
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setQuery('');
                    setSugerencias([]);
                  }}
                >
                  <Text style={globalStyles.clearIcon}>❌</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ flex: 1 }}>
              {ubicacion ? (
                <>
                  <MapaRuta ubicacion={ubicacion} destino={destino} ruta={ruta} />
                  <View style={globalStyles.floatingCategorias}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {categorias.map((cat) => (
                        <TouchableOpacity
                          key={cat.nombre}
                          onPress={() => {
                            setCategoriaSeleccionada(cat.nombre);
                            if (cat.nombre === 'Casa' && ubicacion) {
                              const destinoCasa = {
                                lat: ubicacion.lat,
                                lng: ubicacion.lng,
                                nombre: 'Mi ubicación',
                                descripcion: 'Ubicación actual',
                              };
                              setDestino(destinoCasa);
                              setQuery('Casa');
                              obtenerRutaConORS(ubicacion, destinoCasa)
                                .then((resultado) => {
                                  setRuta(resultado.geojson);
                                  if (resultado.duracionMinutos) {
                                    setTiempoEstimado(`⏱️ Tiempo estimado: ${resultado.duracionMinutos} minutos a pie.`);
                                  } else {
                                    setTiempoEstimado('');
                                  }
                                })
                                .catch((error) => {
                                  Alert.alert('Error', 'No se pudo calcular la ruta.');
                                  console.error(error);
                                });
                            } else {
                              setQuery(cat.nombre);
                              obtenerSugerencias(cat.nombre);
                            }
                          }}
                          style={{ borderRadius: 25, overflow: 'hidden', marginRight: 8 }}
                        >
                          <LinearGradient
                            colors={
                              categoriaSeleccionada === cat.nombre
                                ? ['#4CAF50', '#2E7D32']
                                : ['#2b2b2b', '#1f1f1f']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={globalStyles.categoriaBoton}
                          >
                            <Text style={globalStyles.categoriaTexto}>
                              {cat.icono} {cat.nombre}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {sugerencias.length > 0 && (
                    <View style={globalStyles.floatingResults}>
                      <FlatList
                        data={sugerencias}
                        keyExtractor={(item) => item.properties.id || item.properties.label}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => seleccionarLugar(item)}
                            style={globalStyles.itemSugerencia}
                          >
                            <Text>{item.properties.label}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}
                </>
              ) : (
                <Text style={globalStyles.mensajeEsperando}>Esperando ubicación...</Text>
              )}
            </View>

            {tiempoEstimado !== '' && (
              <Text style={globalStyles.mensajeTexto}>{tiempoEstimado}</Text>
            )}

            <View style={homeStyles.bottomNav}>
              <TouchableOpacity
                onPress={() => router.push('/home')}
                style={[homeStyles.navItem, pathname === '/home' && homeStyles.navItemActive]}
              >
                <MaterialIcons
                  name="home"
                  style={[homeStyles.navIcon, pathname === '/home' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>

              {!isGuest && (
                <>
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
                </>
              )}

              <TouchableOpacity
                onPress={() => handleCargaYNavegacion('ruta')}
                style={[homeStyles.navItem, pathname === '/ruta' && homeStyles.navItemActive]}
              >
                <FontAwesome5
                  name="map-marked-alt"
                  style={[homeStyles.navIcon, pathname === '/ruta' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
