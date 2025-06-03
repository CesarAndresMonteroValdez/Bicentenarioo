import Usuario from '../models/Usuario.js';

export const agregarFavorito = async (req, res) => {
  const { userId } = req.params;
  const { tipo, refId } = req.body;

  try {
    const user = await Usuario.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const yaExiste = user.favoritos.find(fav =>
      fav.tipo === tipo && fav.refId.toString() === refId
    );

    if (!yaExiste) {
      user.favoritos.push({ tipo, refId });
      await user.save();
    }

    res.json(user.favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar favorito' });
  }
};

export const obtenerFavoritos = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Usuario.findById(userId).populate('favoritos.refId');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user.favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
};
