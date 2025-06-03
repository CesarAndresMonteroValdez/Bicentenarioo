import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/config.js';

export const signUp = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El correo ya está registrado' });

    const newUser = new User({
      nombre,
      email,
      password: await User.encryptPassword(password),
      isGuest: false
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, config.SECRET, { expiresIn: 86400 });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: {
        nombre: newUser.nombre,
        email: newUser.email,
        isGuest: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isValid = await User.comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, config.SECRET, { expiresIn: 86400 });

    res.status(200).json({
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const accessAsGuest = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nombreGenerado = nombre ? `Invitado_${nombre}` : `Invitado_${Math.floor(Math.random() * 10000)}`;

    const guestUser = new User({ nombre: nombreGenerado, isGuest: true });
    await guestUser.save();

    const token = jwt.sign({ id: guestUser._id }, config.SECRET, { expiresIn: 3600 });

    res.status(200).json({
      message: 'Acceso como invitado exitoso',
      token,
      user: {
        nombre: guestUser.nombre,
        isGuest: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error como invitado' });
  }
};

export const upgradeGuestToUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const user = await User.findById(req.userId);

    if (!user || !user.isGuest) {
      return res.status(400).json({ message: 'Este usuario no es un invitado válido' });
    }

    user.nombre = nombre;
    user.email = email;
    user.password = await User.encryptPassword(password);
    user.isGuest = false;

    await user.save();

    const token = jwt.sign({ id: user._id }, config.SECRET, { expiresIn: 86400 });

    res.status(200).json({
      message: 'Cuenta actualizada exitosamente',
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
        isGuest: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario invitado' });
  }
};

// ✅ NUEVA FUNCIÓN para modo ruta protegida
export const obtenerRutaPrivada = (req, res) => {
  res.json({
    message: '¡Bienvenido al modo Ruta!',
    contenido: 'Este contenido solo está disponible para usuarios registrados.'
  });
};