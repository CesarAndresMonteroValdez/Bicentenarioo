import express from 'express';
import { obtenerEventos} from '../controllers/eventoController.js';
import { registrarLugarBuscado, obtenerPopulares, obtenerSugerencias} from '../controllers/lugaresController.js';

const router = express.Router();

router.get('/eventos', obtenerEventos);
router.get('/lugares', registrarLugarBuscado);
router.get('/populares', obtenerPopulares);
router.get('/sugerencias', obtenerSugerencias);

export default router;

