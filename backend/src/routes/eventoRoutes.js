import express from 'express';
import {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  actualizarEvento,
  eliminarEvento,
  obtenerEventosCercanos,
} from '../controllers/eventoController.js';

const router = express.Router();

router.post('/', crearEvento);
router.get('/', obtenerEventos);
router.get('/cercanos', obtenerEventosCercanos);
router.get('/:id', obtenerEventoPorId);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

export default router;
