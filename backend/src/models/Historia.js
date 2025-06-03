import mongoose from 'mongoose';

const historiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  fecha: { type: Date },
  fuente: { type: String },
}, { timestamps: true });

const Historia = mongoose.model('Historia', historiaSchema);
export default Historia;
