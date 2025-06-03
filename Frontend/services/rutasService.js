import axios from './api';

/**
 * Solicita ruta caminando desde el backend
 * @param {{ lat: number, lng: number }} origen 
 * @param {{ lat: number, lng: number }} destino 
 * @returns {Promise<{ coordenadas: Array, duracion: number }>}
 */

export const obtenerRutaCaminar = async (origen, destino) => {
  try {
    const res = await axios.post('/rutas/caminar', { origen, destino });
    const ruta = res.data;

    const coords = ruta.coordenadas;
    const duracion = ruta.duracion;

    return {
      coordenadas: coords,
      duracion: duracion,
    };
  } catch (error) {
    console.error('Error al obtener ruta:', error.message);
    return { coordenadas: [], duracion: 0 };
  }
};
