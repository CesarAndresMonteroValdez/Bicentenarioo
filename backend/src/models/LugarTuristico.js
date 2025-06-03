import mongoose from 'mongoose';

const lugarSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  categoria: {
    type: String,
    enum: ['Histórico', 'Religioso', 'Recreativo', 'General', 'Turismo', 'Catedral', 'Parque', 'Museo'],
    default: 'General',
  },
  imagen: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  busquedas: { type: Number, default: 0 },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
}, { timestamps: true,});

lugarSchema.index({ location: '2dsphere' });

const LugarTuristico = mongoose.model('LugarTuristico', lugarSchema);
export default LugarTuristico;
