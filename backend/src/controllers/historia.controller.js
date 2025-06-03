import axios from 'axios';
import Historia from '../models/Historia.js';
import EventoIA from '../models/EventoIA.js';

// 🔍 Buscar resumen en Wikipedia y guardar si no existe
export const buscarEnWikipedia = async (req, res) => {
  const termino = req.query.q;
  if (!termino) return res.status(400).json({ error: 'Debe proporcionar un término.' });

  try {
    const cached = await EventoIA.findOne({ termino });

    if (cached) {
      return res.json([{
        title: cached.titulo,
        snippet: cached.descripcion,
        imagen: cached.imagen
      }]);
    }

    const response = await axios.get(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termino)}`
    );

    if (!response.data.title || !response.data.extract) {
      return res.status(404).json({ error: 'Artículo no encontrado en Wikipedia.' });
    }

    const resultado = {
      termino,
      titulo: response.data.title,
      descripcion: response.data.extract,
      imagen: response.data.thumbnail?.source || null,
      url: response.data.content_urls?.desktop?.page || null,
    };

    await EventoIA.create(resultado);

    res.json([{
      title: resultado.titulo,
      snippet: resultado.descripcion,
      imagen: resultado.imagen
    }]);
  } catch (err) {
    console.error('❌ Error al consultar Wikipedia:', err.message);
    res.status(500).json({ error: 'No se pudo obtener información desde Wikipedia.' });
  }
};

// 📚 Obtener eventos históricos fijos desde la base de datos
export const getHistoria = async (req, res) => {
  try {
    const historias = await Historia.find().sort({ fecha: 1 });
    res.json(historias);
  } catch (err) {
    console.error('❌ Error al obtener historias:', err.message);
    res.status(500).json({ error: 'No se pudo cargar el contenido histórico.' });
  }
};

// ℹ️ Obtener resumen completo de Wikipedia por título
export const obtenerResumenWikipedia = async (req, res) => {
  const { titulo } = req.query;
  if (!titulo) return res.status(400).json({ error: 'Falta el parámetro "titulo".' });

  try {
    const response = await axios.get(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`
    );

    if (!response.data.title || !response.data.extract) {
      return res.status(404).json({ error: 'No se encontró el resumen.' });
    }

    const resultado = {
      titulo: response.data.title,
      descripcion: response.data.extract,
      imagen: response.data.thumbnail?.source || null,
      url: response.data.content_urls?.desktop?.page || null,
    };

    res.json(resultado);
  } catch (err) {
    console.error('❌ Error al obtener resumen de Wikipedia:', err.message);
    res.status(500).json({ error: 'No se pudo obtener el resumen.' });
  }
};

// 🕒 Obtener todas las búsquedas de Wikipedia guardadas (línea de tiempo dinámica)
export const getBusquedasWikipedia = async (req, res) => {
  try {
    const eventos = await EventoIA.find().sort({ createdAt: 1 }); // del más antiguo al más nuevo
    res.json(eventos);
  } catch (err) {
    console.error('❌ Error al obtener eventos IA:', err);
    res.status(500).json({ error: 'No se pudo obtener la línea de tiempo de Wikipedia' });
  }
};
