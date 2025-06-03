import axios from './api';

/**
 * Busca y guarda un lugar por nombre en MongoDB.
 * Si ya existe, lo retorna.
 * Si no se encuentra en OSM, retorna null silenciosamente.
 * 
 * @param {string} nombre - Nombre o término de búsqueda
 * @returns {Promise<Object|null>}
 */
export const buscarLugarPorNombre = async (nombre) => {
  try {
    const res = await axios.get(`/lugares/buscar?q=${encodeURIComponent(nombre)}`);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`ℹ️ Lugar no encontrado: "${nombre}"`);
    } else {
      console.error('❌ Error al buscar lugar:', error.message);
    }
    return null;
  }
};

/**
 * Retorna lugares cercanos a coordenadas dadas.
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @returns {Promise<Array>}
 */
export const obtenerLugaresCercanos = async (lat, lng) => {
  try {
    const res = await axios.get(`/lugares/cercanos?lat=${lat}&lng=${lng}`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener lugares cercanos:', error.message);
    return [];
  }
};

/**
 * Obtiene todos los lugares registrados (sin filtro geográfico)
 * @returns {Promise<Array>}
 */
export const obtenerTodosLosLugares = async () => {
  try {
    const res = await axios.get(`/lugares/buscar`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener todos los lugares:', error.message);
    return [];
  }
};

export const obtenerLugares = async () => {
  try {
    const res = await axios.get('/lugares'); // esta es la ruta que se busca
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener todos los lugares:', error);
    throw error;
  }
};
