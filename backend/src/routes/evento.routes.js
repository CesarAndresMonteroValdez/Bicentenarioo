import { Router } from 'express';
import {
  crearEvento,
  obtenerEventosActuales,
  obtenerEventosCercanos
} from '../controllers/evento.controller.js';

const router = Router();

router.post('/', crearEvento);
router.get('/', obtenerEventosActuales);
router.get('/cercanos', obtenerEventosCercanos);

export default router;