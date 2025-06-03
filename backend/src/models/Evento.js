import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  categoria: { type: String, enum: ['Cultural', 'Musical', 'Patriótico', 'Educativo', 'Otro'], default: 'Otro' },
  imagen: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
}, { timestamps: true,});

eventoSchema.index({ location: '2dsphere' });

const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;
