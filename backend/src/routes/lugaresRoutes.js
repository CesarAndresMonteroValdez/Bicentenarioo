import express from 'express';
import {
  registrarLugarBuscado,
  obtenerPopulares,
  obtenerSugerencias,
  obtenerLugares,
} from '../controllers/lugaresController.js';

const router = express.Router();

router.post('/guardar', registrarLugarBuscado);
router.get('/populares', obtenerPopulares);
router.get('/sugerencias', obtenerSugerencias);
router.get('/', obtenerLugares);

export default router;
