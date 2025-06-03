import express from 'express';
import {
  crearHistoria,
  obtenerHistorias,
  obtenerHistoriaPorId,
  actualizarHistoria,
  eliminarHistoria
} from '../controllers/historiaController.js';

const router = express.Router();

router.post('/', crearHistoria);
router.get('/', obtenerHistorias);
router.get('/:id', obtenerHistoriaPorId);
router.put('/:id', actualizarHistoria);
router.delete('/:id', eliminarHistoria);

export default router;

