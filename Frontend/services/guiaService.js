import axios from './api';

// Obtener lugar popular (ya incluye puntuación promedio)
export const obtenerLugarPopular = async () => {
  const res = await axios.get('/lugares/populares');
  return res.data[0]; // Asegúrate que backend retorna la puntuación promedio
};

// Obtener sugerencias para lugares (con puntuación)
export const obtenerSugerencias = async () => {
  const res = await axios.get('/lugares/sugerencias');
  return res.data; // Cada lugar con campo puntuacionPromedio
};

// Obtener eventos con puntuación
export const obtenerEventos = async (lat, lng) => {
  try {
    const res = await axios.get(`/eventos/cercanos?lat=${lat}&lng=${lng}`);
    return res.data; // Eventos con puntuacionPromedio incluida
  } catch (error) {
    console.error('❌ Error al obtener eventos culturales:', error.message);
    return [];
  }
};
