import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/auth.routes.js';
import historiaRoutes from './routes/historiaRoutes.js';
import lugaresRoutes from './routes/lugaresRoutes.js';
import guiaRoutes from './routes/guiaRoutes.js';
import favoritosRoutes from './routes/favoritosRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/historia', historiaRoutes);
app.use('/api/lugares', lugaresRoutes);
app.use('/api/guia', guiaRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/eventos', eventoRoutes);

export default app;
