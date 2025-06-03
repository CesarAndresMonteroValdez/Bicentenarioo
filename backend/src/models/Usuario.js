import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  favoritos: [{
    tipo: { type: String, enum: ['lugar', 'evento', 'historia'], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
  }]
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;