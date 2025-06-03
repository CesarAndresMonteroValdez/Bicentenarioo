import axios from './api';

export const obtenerEventosCercanos = async (lat, lng) => {
  try {
    const res = await axios.get(`/eventos/cercanos?lat=${lat}&lng=${lng}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener eventos cercanos:', error.message);
    return [];
  }
};
