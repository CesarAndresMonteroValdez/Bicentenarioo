import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import Modal from 'react-native-modal';
import homeStyles from '../styles/homeStyles';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

import SplashRuta from '../components/SplashRuta';
import SplashHistoria from '../components/SplashHistoria';
import SplashGuia from '../components/SplashGuia';

import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { isLoggedIn, isLoading, logout, user, isGuest } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [mostrarModalRuta, setMostrarModalRuta] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tipoSplash, setTipoSplash] = useState<'ruta' | 'historia' | 'guia' | null>(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, isLoading]);

  const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
    router.replace('/');
  };

  const handleUpgradeAccount = () => {
    setMenuVisible(false);
    router.push('/upgrade');
  };

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

  if (!isLoggedIn) return null;

  // Función para renderizar botón con degradado
  const BotonConDegradado = ({ onPress, icon, texto }) => (
    <TouchableOpacity onPress={onPress} style={{ borderRadius: 20, overflow: 'hidden' }}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={homeStyles.optionButton}
      >
        {icon}
        <Text style={homeStyles.optionText}>{texto}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      {cargando && tipoSplash === 'ruta' && <SplashRuta />}
      {cargando && tipoSplash === 'historia' && <SplashHistoria />}
      {cargando && tipoSplash === 'guia' && <SplashGuia />}

      {!cargando && (
        <LinearGradient
          colors={['#7DDF64', '#3C763D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={homeStyles.container}>
            <Image source={require('../assets/logo_1.jpg')} style={homeStyles.headerImage} />

            <Text style={homeStyles.pageTitle}>SANTA CRUZ DE LA SIERRA</Text>

            {/* Menú superior */}
            <View style={homeStyles.topRow}>
              <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                <MaterialIcons name="menu" size={28} color="white" />
              </TouchableOpacity>

              <View style={homeStyles.userInfo}>
                <MaterialIcons name="person" size={24} color="white" style={homeStyles.userIcon} />
                <Text style={homeStyles.username}>@{user?.nombre}</Text>
              </View>
            </View>

            {menuVisible && (
              <View
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 20,
                  backgroundColor: '#fff',
                  padding: 10,
                  elevation: 5,
                  zIndex: 20,
                  width: 200,
                }}
              >
                <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 6 }}>
                  <Text style={{ color: '#000', fontSize: 16 }}>Cerrar sesión</Text>
                </TouchableOpacity>
                {isGuest && (
                  <TouchableOpacity onPress={handleUpgradeAccount} style={{ paddingVertical: 6 }}>
                    <Text style={{ color: '#000', fontSize: 16 }}>Completar cuenta</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Botones principales */}
            <View style={homeStyles.buttonsContainer}>
              {isGuest ? (
                <BotonConDegradado
                  onPress={() => handleCargaYNavegacion('ruta')}
                  icon={<FontAwesome5 name="map-marked-alt" style={homeStyles.optionIcon} />}
                  texto="Ruta"
                />
              ) : (
                <>
                  <BotonConDegradado
                    onPress={() => handleCargaYNavegacion('historia')}
                    icon={<MaterialIcons name="chat-bubble-outline" style={homeStyles.optionIcon} />}
                    texto="Historia"
                  />

                  <BotonConDegradado
                    onPress={() => handleCargaYNavegacion('guia')}
                    icon={<Entypo name="compass" style={homeStyles.optionIcon} />}
                    texto="Guía"
                  />

                  <BotonConDegradado
                    onPress={() => handleCargaYNavegacion('ruta')}
                    icon={<FontAwesome5 name="map-marked-alt" style={homeStyles.optionIcon} />}
                    texto="Ruta"
                  />
                </>
              )}
            </View>

            {/* Navegación inferior */}
            <View style={homeStyles.bottomNav}>
              <TouchableOpacity
                onPress={() => router.push('/')}
                style={[homeStyles.navItem, pathname === '/' && homeStyles.navItemActive]}
              >
                <MaterialIcons
                  name="home"
                  style={[homeStyles.navIcon, pathname === '/' && homeStyles.navIconActive]}
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
                onPress={() => {
                  if (isGuest) {
                    setMostrarModalRuta(true);
                  } else {
                    handleCargaYNavegacion('ruta');
                  }
                }}
                style={[homeStyles.navItem, pathname === '/ruta' && homeStyles.navItemActive]}
              >
                <FontAwesome5
                  name="map-marked-alt"
                  style={[homeStyles.navIcon, pathname === '/ruta' && homeStyles.navIconActive]}
                />
              </TouchableOpacity>
            </View>

            {/* Modal para invitados */}
            <Modal isVisible={mostrarModalRuta} onBackdropPress={() => setMostrarModalRuta(false)}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                  ¿Te gustaría desbloquear más funciones?
                </Text>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                  Completa tu cuenta desde el menú tocando "Completar cuenta" y accede a la Historia,
                  la Guía y más opciones exclusivas.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMostrarModalRuta(false);
                    router.push('/upgrade');
                  }}
                  style={{ backgroundColor: '#28a745', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Completar cuenta</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
