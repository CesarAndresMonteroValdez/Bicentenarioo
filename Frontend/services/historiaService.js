import axios from './api';

export const obtenerEventosHistoria = async () => {
  try {
    const res = await axios.get('/historia');
    return res.data;
  } catch (error) {
    console.error('Error al cargar eventos históricos:', error.message);
    return [];
  }
};

