import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller.js';
import { verifyToken, denyGuestAccess } from '../middleware/authJwt.js';

const router = Router();

router.post('/registro', authCtrl.signUp);
router.post('/iniciar', authCtrl.signin);
router.post('/invitado', authCtrl.accessAsGuest);
router.post('/actualizar-invitado', verifyToken, authCtrl.upgradeGuestToUser);


router.get('/modo-ruta', verifyToken, denyGuestAccess, authCtrl.obtenerRutaPrivada);

export default router;
