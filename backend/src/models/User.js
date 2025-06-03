import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    isGuest: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

usuarioSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usuarioSchema.statics.comparePassword = async function (password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', usuarioSchema);
