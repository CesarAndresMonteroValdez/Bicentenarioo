import Evento from '../models/Evento.js';

export const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el evento' });
  }
};

export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
};

export const obtenerEventosCercanos = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Faltan coordenadas' });

  try {
    const eventos = await Evento.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 100000
        }
      }
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar eventos cercanos' });
  }
};

export const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};

export const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!eventoActualizado) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id);
    if (!eventoEliminado) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};