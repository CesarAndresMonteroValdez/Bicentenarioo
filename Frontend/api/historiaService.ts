import api from './axios';

export const historiaService = {
  // ✅ Cargar eventos históricos desde la base de datos
  obtenerLineaDelTiempo: async () => {
    const response = await api.get('/historia/linea-tiempo');
    return response.data;
  },

  // ✅ Buscar títulos y fragmentos en Wikipedia
  buscarEnWikipedia: async (termino: string) => {
    const response = await api.get(`/historia/buscar?q=${encodeURIComponent(termino)}`);
    return response.data; // Devuelve array [{ title, snippet }]
  },

  // ✅ Obtener resumen completo (imagen + descripción)
  obtenerResumen: async (titulo: string) => {
    const response = await api.get(`/historia/resumen?titulo=${encodeURIComponent(titulo)}`);
    return response.data;
  },
obtenerLineaWikipedia: async () => {
  const response = await api.get('/historia/linea-tiempo-wikipedia');
  return response.data;
}
};
