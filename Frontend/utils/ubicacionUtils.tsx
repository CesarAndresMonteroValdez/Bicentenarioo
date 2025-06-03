import * as Location from 'expo-location';

export const obtenerUbicacionActual = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permiso de ubicación denegado');
    }
    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch (error) {
    console.error('❌ Error al obtener ubicación:', error);
    throw error;
  }
};

export const generarURLAutocompletado = (
  texto: string,
  coords: { lat: number; lng: number },
  radio = 100,
  apiKey: string
) => {
  const encodedText = encodeURIComponent(texto);
  return `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}` +
    `&text=${encodedText}` +
    `&boundary.circle.lat=${coords.lat}` +
    `&boundary.circle.lon=${coords.lng}` +
    `&boundary.circle.radius=${radio}`;
};
