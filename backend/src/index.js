import app from './app.js';
import './database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
