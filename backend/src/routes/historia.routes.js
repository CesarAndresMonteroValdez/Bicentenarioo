import { Router } from 'express';
import { buscarEnWikipedia, getHistoria,obtenerResumenWikipedia ,getBusquedasWikipedia} from '../controllers/historia.controller.js';

const router = Router();

router.get('/buscar', buscarEnWikipedia);
router.get('/linea-tiempo', getHistoria); 
router.get('/resumen', obtenerResumenWikipedia);
router.get('/linea-tiempo-wikipedia', getBusquedasWikipedia);
export default router;
