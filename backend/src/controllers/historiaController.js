import Historia from '../models/Historia.js';

export const crearHistoria = async (req, res) => {
  try {
    const historia = new Historia(req.body);
    await historia.save();
    res.status(201).json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar historia' });
  }
};

export const obtenerHistorias = async (req, res) => {
  try {
    const historias = await Historia.find().sort({ fecha: 1 });
    res.json(historias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historias' });
  }
};

export const obtenerHistoriaPorId = async (req, res) => {
  try {
    const historia = await Historia.findById(req.params.id);
    if (!historia) return res.status(404).json({ error: 'Historia no encontrada' });
    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historia' });
  }
};

export const actualizarHistoria = async (req, res) => {
  try {
    const historiaActualizada = await Historia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!historiaActualizada) return res.status(404).json({ error: 'Historia no encontrada' });
    res.json(historiaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar historia' });
  }
};

export const eliminarHistoria = async (req, res) => {
  try {
    const historiaEliminada = await Historia.findByIdAndDelete(req.params.id);
    if (!historiaEliminada) return res.status(404).json({ error: 'Historia no encontrada' });
    res.json({ mensaje: 'Historia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historia' });
  }
};
