import mongoose from 'mongoose';

const eventoIASchema = new mongoose.Schema({
  termino: { type: String, unique: true },
  titulo: String,
  descripcion: String,
  imagen: String,
  url: String
}, { timestamps: true });

const EventoIA = mongoose.model('EventoIA', eventoIASchema);
export default EventoIA;
