import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export const denyGuestAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (user.isGuest) {
      return res.status(403).json({ message: 'Acceso restringido para usuarios invitados' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error en la validación del usuario' });
  }
};
