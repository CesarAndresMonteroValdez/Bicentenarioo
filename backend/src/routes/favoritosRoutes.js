import express from 'express';
import { agregarFavorito, obtenerFavoritos } from '../controllers/favoritosController.js';

const router = express.Router();

router.post('/:userId', agregarFavorito);
router.get('/:userId', obtenerFavoritos);

export default router;

