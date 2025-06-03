import cloudinary from 'cloudinary';
import LugarTuristico from '../models/LugarTuristico.js';

cloudinary.config({
  cloud_name: 'Snakeeyes',
  api_key: '958577656616964',
  api_secret: 'XVtO8glNg4DvJ40_QC7F0E3kuHk',
});

export const registrarLugarBuscado = async (req, res) => {
  const { nombre, descripcion, lat, lng, imagenArchivo } = req.body;

  if (!nombre || !lat || !lng) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const lugar = await LugarTuristico.findOne({ nombre, lat, lng });
    if (lugar) {
      lugar.busquedas = (lugar.busquedas || 0) + 1;
      await lugar.save();
      return res.status(200).json(lugar);
    }

    let imagenUrl = null;
    if (imagenArchivo) {
      const result = await cloudinary.uploader.upload(imagenArchivo, {
        folder: 'lugares_turisticos',
      });
      imagenUrl = result.secure_url;
    }

    const nuevo = new LugarTuristico({
      nombre,
      descripcion,
      lat,
      lng,
      categoria: 'General',
      imagen: imagenUrl,
      busquedas: 1,
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al registrar lugar:', error.message);
    res.status(500).json({ error: 'Error interno' });
  }
};

export const obtenerPopulares = async (req, res) => {
  try {
    const lugares = await LugarTuristico.find().sort({ busquedas: -1 }).limit(1);
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lugares populares' });
  }
};

export const obtenerSugerencias = async (req, res) => {
  try {
    const lugares = await LugarTuristico.find().sort({ busquedas: 1 }).limit(10);
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sugerencias' });
  }
};

export const obtenerLugares = async (req, res) => {
  try {
    const lugares = await LugarTuristico.find();
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los lugares' });
  }
};
